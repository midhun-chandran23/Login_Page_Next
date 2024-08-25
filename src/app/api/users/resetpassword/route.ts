import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json()
        const { email } = reqBody

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User Not Found" }, { status: 400 })
        }


        //send reset password email

        await sendEmail({ email, emailType: "RESET", userId: user._id })

        return NextResponse.json({
            message: "Reset password email initiated",
            success: true,
            user
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

}