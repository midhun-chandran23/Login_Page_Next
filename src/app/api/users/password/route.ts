import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";

connect()

export async function GET(request: NextRequest,
    { params }: { params: { token: string, password: string } }
) {
    try {
        const token = request.nextUrl.searchParams.get("token");
        const password = request.nextUrl.searchParams.get("password");
        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });

        if (user) {
            return NextResponse.json({
                message: "Correct Token",
                success: true
            })
        }
        return NextResponse.json({ error: "Invalid token" }, { status: 400 });


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

}


export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        //check if user already exists

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: { $gt: Date.now() }
        });


        if (!user) {
            return NextResponse.json({ error: "Error updating password." }, { status: 400 })
        }


        //update hashed password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        user.password = hashedPassword;
        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password updated successfully.",
            success: true
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}