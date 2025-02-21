import { useState } from "react";
import { Edit, LogOut } from "lucide-react";

export default function ProfilePage() {
    const [user] = useState({
        name: "John Doe",
        username: "@johndoe",
        bio: "Cocktail enthusiast & mixologist | Sharing my best recipes 🍹",
        profileImage: "https://source.unsplash.com/100x100/?portrait",
        coverImage: "https://source.unsplash.com/600x200/?bar,drinks",
        followers: 1240,
        following: 200,
    });

    const examplePosts = [
        { id: 1, title: "Classic Mojito", image: "https://source.unsplash.com/100x100/?mojito", author: "John Doe" },
        { id: 2, title: "Whiskey Sour", image: "https://source.unsplash.com/100x100/?whiskey", author: "John Doe" },
        { id: 3, title: "Piña Colada", image: "https://source.unsplash.com/100x100/?pina-colada", author: "John Doe" },
    ];

    const handleLogout = () => {
        console.log("Logging out...");
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 pb-10">
            {/* Cover Image */}
            <div
                className="w-full h-40 bg-gray-300 relative"
                style={{
                    backgroundImage: `url(${user.coverImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Profile Image */}
                <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
                    <img
                        src={user.profileImage}
                        alt=""
                        className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md"
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mt-16 px-4">
                <h1 className="text-2xl font-bold mt-10">{user.name}</h1>
                <p className="text-gray-500">{user.username}</p>
                <p className="mt-2 text-sm text-gray-700">{user.bio}</p>

                {/* Stats */}
                {/* <div className="flex justify-center gap-10 mt-3">
                    <div className="text-center">
                        <p className="text-lg font-bold">{user.followers}</p>
                        <p className="text-sm text-gray-500">Followers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg font-bold">{user.following}</p>
                        <p className="text-sm text-gray-500">Following</p>
                    </div>
                </div> */}

                {/* Edit & Logout Buttons */}
                <div className="flex justify-center gap-4 my-10">
                    <button className="flex items-center gap-2 bg-[#eb6b50] text-white px-4 py-2 rounded-full shadow-md">
                        <Edit size={16} /> Edit Profile
                    </button>
                    <button 
                        className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full shadow-md text-gray-700"
                        onClick={handleLogout}
                    >
                        <LogOut size={16} /> Log Out
                    </button>
                </div>
            </div>

            {/* User's Posts */}
            <div className="mt-8 px-4 mb-20">
                <h2 className="text-lg font-bold text-[#eb6b50]">My Posts</h2>
                <div className="mt-4 space-y-4">
                    {examplePosts.map((post) => (
                        <a
                            key={post.id}
                            href={`/blog/${post.id}`}
                            className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-md"
                        >
                            <div
                                className="w-16 h-16 bg-gray-300 rounded-lg"
                                style={{
                                    backgroundImage: `url(${post.image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            <div>
                                <h3 className="text-md font-bold">{post.title}</h3>
                                <p className="text-xs text-gray-500">By {post.author}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
}
