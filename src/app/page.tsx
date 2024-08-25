import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl sm:text-6xl text-center font-bold">App Name</h1>
      <div className="w-5/6 sm:w-1/3 mt-8">
        <Link
          className="w-full mt-4 p-4 rounded-lg bg-green-500 hover:bg-green-600 text-white focus:outline-none flex items-center justify-center mb-4"
          href="/signup"
        >
          <span className="font-bold">Sign Up</span>
        </Link>
        <Link
          className="w-full p-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white focus:outline-none flex items-center justify-center"
          href="/login"
        >
          <span className="font-bold">Log In</span>
        </Link>
      </div>
    </div>
  );
}