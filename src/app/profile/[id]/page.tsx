export default function UserProfile({ params }: any) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl sm:text-6xl text-center font-bold">Profile</h1>
            <hr className="w-2/3 sm:w-1/3 my-8 border-gray-300" />

            <p className="text-3xl sm:text-4xl">
                <span
                    className="p-2 ml-2 rounded bg-green-500 text-black break-all flex justify-center items-center"
                    style={{ wordBreak: "break-all" }}
                >
                    {params.id}
                </span>
            </p>
        </div>
    );
}