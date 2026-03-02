import React, { useState } from "react";

function WritePost({ onSubmit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && content.trim()) {
      onSubmit({ title, content });
      setTitle("");
      setContent("");
    } else {
      alert("Please fill in both the title and content.");
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="pro-surface rounded-2xl p-5 md:p-7">
        <div className="mb-6 flex flex-col gap-4 border-b border-[var(--border)] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-bold text-[var(--text)] md:text-3xl">
            Write a New Post
          </h2>
          <button
            type="submit"
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)] focus:outline-none focus:ring-4 focus:ring-[var(--ring)]">
            Publish
          </button>
        </div>

        <div className="space-y-4">
          <label htmlFor="post-title" className="text-sm font-medium text-[var(--text-soft)]">
            Title
          </label>
          <input
            id="post-title"
            type="text"
            placeholder="A clear, compelling title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="pro-input text-2xl font-semibold tracking-tight md:text-3xl"
          />

          <label htmlFor="post-content" className="text-sm font-medium text-[var(--text-soft)]">
            Content
          </label>
          <textarea
            id="post-content"
            placeholder="Write your story here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="pro-input min-h-60 resize-y text-base leading-7"
          />
        </div>
      </form>
    </div>
  );
}

export default WritePost;
