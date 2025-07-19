import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Ensure your .env.local and Vercel have these set!
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Define the shape of the expected request body
interface SaveEmailBody {
  email?: unknown;
}

export async function POST(req: Request) {
  try {
    // Parse and type‑cast the JSON body
    const body = (await req.json()) as SaveEmailBody;
    const email =
      typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

    // Validate
    if (!email) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    // Attempt insert
    const { error } = await supabase.from("Emails").insert({ email });

    if (error) {
      // Unique constraint violation
      if (error.code === "23505") {
        return NextResponse.json({ error: "duplicate" }, { status: 409 });
      }
      // Other Supabase error
      return NextResponse.json(
        { error: "insert failed", details: error.message },
        { status: 500 }
      );
    }

    // Success
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    // Narrow unknown → Error
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("❌ API ERROR:", message);

    return NextResponse.json(
      { error: "unexpected", details: message },
      { status: 500 }
    );
  }
}
