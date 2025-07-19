"use client";

import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("⏳ Submitting...");

    try {
      const res = await fetch("/api/save-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("✅ Thank you! You're on the waitlist.");
        setEmail("");
      } else if (data.error === "duplicate") {
        setMessage("⚠️ This email is already subscribed.");
      } else {
        setMessage("❌ Failed to save your email.");
      }
    } catch (err: unknown) {
      setMessage("❌ Something went wrong. Please try again.");
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        console.error(err);
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white text-black rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Join the Waitlist</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="p-3 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-black"
        />
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
        >
          Notify Me
        </button>
      </form>
      {message && <p className="text-sm text-center mt-4">{message}</p>}
    </div>
  );
}
