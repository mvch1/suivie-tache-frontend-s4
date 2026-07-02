import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const userId = formData.get("userId") as string;
    console.log(userId)
    if (!file || !userId) {
      return NextResponse.json({ error: "Missing file or userId" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, `${userId}.jpg`);
    await writeFile(filePath, buffer);

    return NextResponse.json({ url: `/uploads/${userId}.jpg` });
  } catch (e) {
    console.error("Upload error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
