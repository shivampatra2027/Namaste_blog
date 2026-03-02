import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { CalendarDays, Mail } from "lucide-react";
import API from "../config/api.js";

function Profile() {
  const { user } = useUser();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (user) {
      fetch(API.url(API.endpoints.posts))
        .then((res) => res.json())
        .then((data) => {
          const filtered = data.posts.filter((post) => post.author === user.id);
          setUserPosts(filtered);
        })
        .catch((error) => console.error("Error fetching user posts:", error));
    }
  }, [user]);

  return (
    <div className="min-h-screen py-8">
      <div className="pro-shell space-y-6">
        {user ? (
          <section className="pro-surface rounded-2xl p-6 md:p-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="h-20 w-20 rounded-full border-2 border-[var(--border)] object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-[var(--text)] md:text-3xl">
                  {user.fullName}
                </h1>
                <p className="mt-2 inline-flex items-center gap-2 text-sm text-[var(--text-soft)]">
                  <Mail className="h-4 w-4" />
                  {user.emailAddresses[0].emailAddress}
                </p>
              </div>
            </div>
          </section>
        ) : (
          <section className="pro-surface rounded-2xl p-6 text-center text-[var(--text-soft)]">
            Sign in to view your profile.
          </section>
        )}

        <section className="pro-surface rounded-2xl p-6 md:p-8">
          <h2 className="text-xl font-bold text-[var(--text)] md:text-2xl">Your Posts</h2>
          {userPosts.length === 0 ? (
            <p className="mt-3 text-sm text-[var(--text-soft)]">
              You have not written any posts yet.
            </p>
          ) : (
            <div className="mt-5 space-y-4">
              {userPosts.map((post) => (
                <article
                  key={post._id}
                  className="rounded-xl border border-[var(--border)] bg-white/70 p-4 dark:bg-white/5"
                >
                  <h3 className="text-lg font-semibold text-[var(--text)]">{post.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-soft)]">
                    {post.content}
                  </p>
                  {post.createdAt && (
                    <p className="mt-3 inline-flex items-center gap-2 text-xs text-[var(--text-soft)]">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Profile;
