import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { ChevronDown, ChevronUp, Lock, Newspaper, UserCircle2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import WritePost from "../components/WritePost.jsx";
import API from "../config/api.js";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const { getToken, userId } = useAuth();
  const { width, height } = useWindowSize();

  useEffect(() => {
    fetch(API.url(API.endpoints.posts))
      .then((res) => res.json())
      .then((data) => setPosts(data.posts || []))
      .catch((err) => console.error("Error fetching posts:", err));
  }, []);

  const handlePostSubmit = async (post) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("User is not authenticated.");

      const response = await fetch(API.url(API.endpoints.posts), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) throw new Error("Failed to submit post");

      const savedPost = await response.json();
      setPosts((prevPosts) => [savedPost, ...prevPosts]);

      toast.success("Post published successfully.", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error(`Error: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  const toggleExpand = (postId) => {
    setExpandedPostId((prevId) => (prevId === postId ? null : postId));
  };

  return (
    <div className="min-h-screen py-8">
      {showConfetti && <Confetti width={width} height={height} />}
      <div className="pro-shell space-y-6">
        <div className="pro-surface rounded-2xl px-5 py-5 md:px-7">
          <div className="flex items-center gap-3 pb-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)]/15 text-[var(--accent)]">
              <Newspaper className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-2xl font-bold md:text-3xl">Community Posts</h1>
              <p className="text-sm text-[var(--text-soft)]">
                Read updates from the community or publish your own.
              </p>
            </div>
          </div>
        </div>

        {userId ? (
          <WritePost onSubmit={handlePostSubmit} />
        ) : (
          <div className="pro-surface rounded-2xl p-6 text-center">
            <Lock className="mx-auto h-8 w-8 text-[var(--text-soft)]" />
            <p className="mt-3 text-sm text-[var(--text-soft)]">
              Sign in to write a post.
            </p>
            <button
              disabled
              className="mt-4 cursor-not-allowed rounded-lg bg-slate-500/70 px-4 py-2 text-sm font-semibold text-white opacity-80"
            >
              Publish Disabled
            </button>
          </div>
        )}

        {posts.length === 0 ? (
          <p className="py-4 text-center text-[var(--text-soft)]">
            No posts yet. Be the first to write.
          </p>
        ) : (
          posts.map((post) => {
            const isExpanded = post._id === expandedPostId;
            return (
              <div
                key={post._id}
                onClick={() => toggleExpand(post._id)}
                className="pro-surface cursor-pointer rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)]/45 md:p-6"
              >
                <div className="mb-2 flex items-start justify-between">
                  <h2 className="flex-1 pr-4 text-xl font-bold text-[var(--text)]">
                    {post.title}
                  </h2>

                  <div className="flex flex-col items-end space-y-1">
                    <div className="flex items-center space-x-1 text-sm font-medium text-[var(--text-soft)]">
                      <UserCircle2 className="h-4 w-4" />
                      <span>{post.authorName || "Anonymous"}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-[var(--accent)]" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-[var(--accent)]" />
                    )}
                  </div>
                </div>

                <p
                  className={`mt-2 overflow-hidden leading-relaxed text-[var(--text-soft)] transition-all duration-300 ${
                    isExpanded ? "max-h-full" : "max-h-16 line-clamp-2"
                  }`}
                >
                  {post.content}
                </p>

                {post.createdAt && (
                  <p className="mt-4 border-t border-[var(--border)] pt-3 text-xs text-[var(--text-soft)]">
                    Posted: {new Date(post.createdAt).toLocaleString()}
                  </p>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Posts;
