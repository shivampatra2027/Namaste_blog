"use client";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";
import DarkModeToggle from "./DarkModeToggle";
import { Menu, X, PenSquare } from "lucide-react";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "Posts", link: "/posts" },
    { name: "Profile", link: "/profile" },
    { name: "Create", link: "/create-post" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 md:px-6">
      <nav className="pro-shell pro-surface rounded-2xl px-4 py-3 md:px-6">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
              <PenSquare className="h-4 w-4" />
            </span>
            Blog Space
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text-soft)] hover:bg-white/60 dark:hover:bg-white/8 hover:text-[var(--text)]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <DarkModeToggle />
            <SignedOut>
              <SignInButton mode="modal" redirectUrl="/create-post">
                <button className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)] transition-colors hover:bg-white/60 dark:hover:bg-white/8">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal" redirectUrl="/create-post">
                <button className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-strong)]">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-[var(--border)] text-[var(--text)] md:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 space-y-3 border-t border-[var(--border)] pt-4 md:hidden">
            {navItems.map((item) => (
              <NavLink
                key={item.link}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--accent)] text-white"
                      : "text-[var(--text-soft)] hover:bg-white/60 dark:hover:bg-white/8 hover:text-[var(--text)]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
            <div className="flex items-center justify-between rounded-lg border border-[var(--border)] p-3">
              <span className="text-sm text-[var(--text-soft)]">Theme</span>
              <DarkModeToggle />
            </div>
            <SignedOut>
              <div className="grid grid-cols-2 gap-2">
                <SignInButton mode="modal" redirectUrl="/create-post">
                  <button className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-semibold text-[var(--text)]">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal" redirectUrl="/create-post">
                  <button className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white">
                    Sign Up
                  </button>
                </SignUpButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex justify-center pt-2">
                <UserButton afterSignOutUrl="/" />
              </div>
            </SignedIn>
          </div>
        )}
      </nav>
    </header>
  );
}

export default NavbarDemo;
