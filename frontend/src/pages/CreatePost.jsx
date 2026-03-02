import { SignInButton, SignedOut, useAuth } from "@clerk/clerk-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Lock } from "lucide-react";
import API from "../config/api.js";

const CreatePost = () => {
  const { getToken, userId } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tag: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      await axios.post(API.url(API.endpoints.posts), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Post created successfully.", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
      });

      setTimeout(() => navigate("/posts"), 1500);
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="pro-shell">
        <section className="pro-surface relative rounded-2xl p-6 md:p-8">
          <SignedOut>
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-slate-950/65 px-4 text-center text-white backdrop-blur-sm">
              <Lock className="h-10 w-10" />
              <h3 className="mt-3 text-xl font-bold">Sign in to Create a Post</h3>
              <p className="mt-2 text-sm text-slate-200">
                Join the community to publish and share ideas.
              </p>
              <SignInButton mode="modal">
                <button className="mt-5 rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white hover:bg-[var(--accent-strong)]">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </SignedOut>

          <h1 className="text-2xl font-bold text-[var(--text)] md:text-3xl">Create a New Post</h1>
          <p className="mt-2 text-sm text-[var(--text-soft)]">
            Share your thoughts with a clear title and high-quality content.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label htmlFor="title" className="mb-1.5 block text-sm font-medium text-[var(--text-soft)]">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter a headline"
                value={formData.title}
                onChange={handleChange}
                required
                className="pro-input"
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="mb-1.5 block text-sm font-medium text-[var(--text-soft)]"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                placeholder="Write your post content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={10}
                className="pro-input min-h-56 resize-y"
              />
            </div>

            <div>
              <label htmlFor="tag" className="mb-1.5 block text-sm font-medium text-[var(--text-soft)]">
                Tag (optional)
              </label>
              <input
                id="tag"
                type="text"
                name="tag"
                placeholder="Example: technology"
                value={formData.tag}
                onChange={handleChange}
                className="pro-input"
              />
            </div>

            {userId ? (
              <button
                type="submit"
                className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)]"
              >
                Submit Post
              </button>
            ) : (
              <button
                type="button"
                disabled
                className="cursor-not-allowed rounded-lg bg-slate-500/70 px-5 py-2.5 text-sm font-semibold text-white opacity-85"
              >
                Submit Post
              </button>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default CreatePost;
