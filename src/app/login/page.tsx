"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [buttonText, setButtonText] = React.useState("Login");

    const onLogin = async () => {
        try {
            setLoading(true);
            setButtonText("Authenticating..")
            const response = await axios.post("/api/users/login", user);
            setButtonText("Login success");
            setTimeout(() => {
                router.push("/profile");
            }, 100);
        } catch (error: any) {
            setButtonText("Login");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl sm:text-6xl text-center font-bold">Login</h1>
            <hr className="w-2/3 sm:w-1/3 my-8 border-gray-300" />

            <div className="w-5/6 sm:w-1/2">
                <input
                    className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
                    id="email"
                    type="text"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                />
                <input
                    className="w-full p-4 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-gray-600 text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Password"
                />
                <div className="flex flex-col sm:flex-row justify-between mb-4">
                    <Link href="/resetpassword" className="text-white-500 hover:underline">
                        Forgot password?
                    </Link>
                    <Link href="/signup" className="text-white-500 hover:underline">
                        {"Don't have an account? Sign up"}
                    </Link>
                </div>
                <button
                    onClick={onLogin}
                    className="w-full font-bold rounded-lg bg-green-500 hover:bg-green-600 text-white py-4 transition-colors duration-300"
                    disabled={buttonDisabled || loading}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );

}