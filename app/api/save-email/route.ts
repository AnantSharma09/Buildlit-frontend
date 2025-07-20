import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface SaveEmailBody {
  email?: unknown;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as SaveEmailBody;
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    if (!email || !validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase.from("Emails").insert({ email });

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json({ error: "duplicate" }, { status: 409 });
      }
      return NextResponse.json(
        { error: "insert failed", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ API ERROR:", message);

    return NextResponse.json(
      { error: "unexpected", details: message },
      { status: 500 }
    );
  }
}

// Optional but helpful: basic email format check
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
