# fast_api_app.py (FastAPI backend)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError, ConnectionFailure
import os
from dotenv import load_dotenv
import ai_assistant  # your ai_assistant.py

# Load environment variables
load_dotenv()
mongo_uri = os.getenv("MONGO_URI")

# MongoDB client with error handling
chat_collection = None
mongodb_connected = False

try:
    if mongo_uri and mongo_uri != "mongodb://localhost:27017/":
        # Only try to connect if we have a valid URI
        client = MongoClient(
            mongo_uri,
            serverSelectionTimeoutMS=5000,  # 5 second timeout
            connectTimeoutMS=5000
        )
        # Test the connection
        client.admin.command('ping')
        db = client["ai_assistant"]
        chat_collection = db["chat_history"]
        mongodb_connected = True
        print("✅ MongoDB connected successfully for AI service")
    else:
        print("⚠️  No MongoDB URI provided - chat history will not be saved")
except (ServerSelectionTimeoutError, ConnectionFailure) as e:
    print(f"⚠️  MongoDB connection failed: {e}")
    print("   AI service will work without chat history storage")
except Exception as e:
    print(f"⚠️  Unexpected MongoDB error: {e}")
    print("   AI service will work without chat history storage")

# FastAPI app
app = FastAPI()



# Allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://blog-app-frontend-a7th.onrender.com",
        "http://localhost:5173",
        "http://localhost:5174"
    ],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request body model
class Query(BaseModel):
    text: str

# POST /ask → get AI response and save
@app.post("/ask")
def ask_ai(query: Query):
    try:
        ai_response = ai_assistant.get_response(query.text)
        
        # Only save to DB if MongoDB is connected
        if mongodb_connected and chat_collection is not None:
            try:
                chat_collection.insert_one({"user": query.text, "ai": ai_response})
            except Exception as db_error:
                print(f"⚠️  Failed to save to database: {db_error}")
                # Don't fail the request if DB save fails
        
        return {"answer": ai_response}
    except Exception as e:
        print(f"❌ Error in ask_ai: {e}")
        return {
            "answer": "Sorry, I encountered an error processing your request. Please try again.",
            "error": str(e)
        }

# GET /history → fetch all chats
@app.get("/history")
def get_history():
    try:
        if not mongodb_connected or chat_collection is None:
            return {
                "history": [],
                "message": "Chat history not available - MongoDB not connected"
            }
        
        chats = list(chat_collection.find({}, {"_id": 0}))
        return {"history": chats}
    except Exception as e:
        print(f"❌ Error in get_history: {e}")
        return {
            "history": [],
            "error": str(e)
        }
