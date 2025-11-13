"use client";
import { useEffect, useState } from "react";

function decodeJwtPayload(token) {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonStr = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonStr);
  } catch {
    return null;
  }
}

export default function HomePage() {
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    try {
      let token = null;

      // Try localStorage 'token'
      const lsToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (lsToken && lsToken !== "undefined" && lsToken !== "null") token = lsToken;

      // Fallback: cookie 'token'
      if (!token && typeof document !== "undefined") {
        const m = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
        if (m) token = decodeURIComponent(m[1]);
      }

      // Fallback: 'user'.token
      if (!token && typeof window !== "undefined") {
        const rawUser = localStorage.getItem("user");
        if (rawUser && rawUser !== "undefined") {
          try {
            const u = JSON.parse(rawUser);
            if (u && typeof u.token === "string") token = u.token;
          } catch {}
        }
      }

      const p = token ? decodeJwtPayload(token) : null;
      setPayload(p || { error: "No valid token found" });
    } catch {
      setPayload({ error: "Failed to read token" });
    }
  }, []);

  return (
    <div className="min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4">Token payload</h1>
      <pre className="bg-black-100 p-4 rounded">
        {JSON.stringify(payload, null, 2)}
      </pre>
    </div>
  );
}
