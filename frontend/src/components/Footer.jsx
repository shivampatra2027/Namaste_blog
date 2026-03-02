import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="mt-16 px-4 pb-8 md:px-6">
      <div className="pro-shell pro-surface rounded-2xl p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-base font-semibold text-[var(--text)]">Blog Space</p>
            <p className="mt-2 max-w-md text-sm text-[var(--text-soft)]">
              A modern writing platform for sharing ideas, publishing stories, and
              following what matters.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm md:grid-cols-4 md:gap-6">
            <Link className="text-[var(--text-soft)] hover:text-[var(--text)]" to="/">
              Home
            </Link>
            <Link className="text-[var(--text-soft)] hover:text-[var(--text)]" to="/posts">
              Posts
            </Link>
            <Link className="text-[var(--text-soft)] hover:text-[var(--text)]" to="/profile">
              Profile
            </Link>
            <Link
              className="text-[var(--text-soft)] hover:text-[var(--text)]"
              to="/create-post"
            >
              Create
            </Link>
          </div>
        </div>
        <div className="mt-6 border-t border-[var(--border)] pt-4 text-xs text-[var(--text-soft)]">
          © {new Date().getFullYear()} Blog Space. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
