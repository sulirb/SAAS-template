import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const connection = await pool.getConnection();
    await connection.query("DELETE FROM grocery_lists WHERE id = ?", [id]);
    connection.release();
    return NextResponse.json({ message: "List deleted successfully" });
  } catch (error) {
    console.error("Error deleting list:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
