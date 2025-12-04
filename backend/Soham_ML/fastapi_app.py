# fast_api_app.py (FastAPI backend)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from pymongo import MongoClient
import os
from dotenv import load_dotenv
import ai_assistant  # your ai_assistant.py

# Load environment variables
load_dotenv()
mongo_uri = os.getenv("MONGO_URI")

# MongoDB client
client = MongoClient(mongo_uri)
db = client["ai_assistant"]
chat_collection = db["chat_history"]

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
    ai_response = ai_assistant.get_response(query.text)
    chat_collection.insert_one({"user": query.text, "ai": ai_response})
    return {"answer": ai_response}

# GET /history → fetch all chats
@app.get("/history")
def get_history():
    chats = list(chat_collection.find({}, {"_id": 0}))
    return {"history": chats}
