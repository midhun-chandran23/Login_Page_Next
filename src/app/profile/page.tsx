"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("nothing");
    const [userIdLoading, setUserIdLoading] = useState(false);
    const [loggingOut, setLoggingOut] = useState(false);
    const logout = async () => {
        try {
            setLoggingOut(true)
            await axios.get('/api/users/logout')
            router.push('/')
        } catch (error: any) {
            setLoggingOut(false)
        }
    }

    const getUserDetails = async () => {
        try {
            setUserIdLoading(true);
            const res = await axios.get('/api/users/me')
            setData(res.data.data._id)
        } catch (error: any) {
        } finally {
            setUserIdLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl sm:text-6xl text-center font-bold">Profile</h1>

            <hr className="w-2/3 sm:w-1/3 my-8 border-gray-300" />

            {data !== 'nothing' && (
                <h2 className="p-4 mt-2 text-lg rounded bg-green-500">
                    <Link href={`/profile/${data}`} className="font-bold">
                        Go to dynamic ID
                    </Link>
                </h2>
            )}

            <button
                onClick={getUserDetails}
                className="w-5/6 sm:w-1/3 mt-4 bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                disabled={userIdLoading || data !== 'nothing'}
            >
                {userIdLoading ? 'Loading..' : 'Get User ID'}
            </button>

            <button
                onClick={logout}
                className="w-5/6 sm:w-1/3 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                disabled={loggingOut}
            >
                {loggingOut ? 'Logging out..' : 'Logout'}
            </button>
        </div>
    );
}