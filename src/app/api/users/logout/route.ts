import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        })
        cookies().delete("token");
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

