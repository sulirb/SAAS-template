import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM grocery_lists");
    connection.release();
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching lists:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      "INSERT INTO grocery_lists (name, items, completed) VALUES (?, 0, 0)",
      [name]
    );
    connection.release();
    return NextResponse.json({
      id: result.insertId,
      name,
      items: 0,
      completed: 0,
    });
  } catch (error) {
    console.error("Error creating list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
