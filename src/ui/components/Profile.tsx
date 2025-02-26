import { useEffect, useState } from "react";
import { Edit, LogOut } from "lucide-react";
import { getProfileData, updateProfileData } from "../../features/auth/services/profileService";
import { toast } from "sonner";

export default function ProfilePage( { token, user } : { token: string, user: string } ) {
    const [editProfile, setEditProfile] = useState({ edit: false, text: "Editar perfil" });
    const [profile, setProfile] = useState({
        name: "",
        username: "",
        image: "",
        phone: "",
        email: "",
        last_name: "",
    } as User);

    useEffect(() => {
        getUserProfile();
    }, []);

    const examplePosts = [
        { id: 1, title: "Classic Mojito", image: "https://source.unsplash.com/100x100/?mojito", author: "John Doe" },
        { id: 2, title: "Whiskey Sour", image: "https://source.unsplash.com/100x100/?whiskey", author: "John Doe" },
        { id: 3, title: "Piña Colada", image: "https://source.unsplash.com/100x100/?pina-colada", author: "John Doe" },
    ];

    const getUserProfile = async() => {
        const response = await getProfileData({ id: user, token });
        
        if (response.data && response.data.getUser && response.data.getUser.data) {
            setProfile(response.data.getUser.data);
        }
    }

    const handleLogout = () => {
        document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    }

    const handleEditProfile = () => {
        setEditProfile({ edit: !editProfile.edit, text: editProfile.edit ? "Editar perfil" : "Guardar cambios" });
    }

    const handleSaveProfile = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(editProfile.edit) return;
        console.log("Saving profile...");

        const updatedProfile = {
            name: profile.name,
            username: profile.username,
            email: profile.email,
            lastname: profile.last_name,
        };

        const response = await updateProfileData({ ...updatedProfile, token });
        console.log(response);
        if(response.data && response.data.editProfile && response.data.editProfile.data) {
            toast.success("Perfil actualizado correctamente");
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 pb-10">
            {/* Cover Image */}
            <div
            className="w-full h-40 bg-gray-300 relative"
            style={{
                backgroundImage: `url(${profile.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
            >
            {/* Profile Image */}
            <div className="absolute left-1/2 -translate-x-1/2 -bottom-12">
                <img
                src={profile.image}
                alt=""
                className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md"
                />
            </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mt-16 px-4">
                <form onSubmit={handleSaveProfile}>
                    {editProfile.edit ? (
                    <>
                        <h1 className="text-2xl font-bold mt-10">
                            <input
                                type="text"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="bg-transparent focus:outline-none focus:border-[#eb6b50] text-center w-full border border-gray-400 rounded-md p-2"
                            />
                        </h1>
                        <p className="text-gray-500">
                            <input
                                type="text"
                                value={profile.username}
                                onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                className="text-center bg-transparent focus:outline-none focus:border-[#eb6b50] w-full border border-gray-400 rounded-md p-2 mt-2"
                            />
                        </p>
                        <p className="mt-2 text-sm text-gray-700">
                            <input
                                type="text"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="bg-transparent focus:outline-none focus:border-[#eb6b50] w-full text-center border border-gray-400 rounded-md p-2"
                            />
                        </p>
                    </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mt-10 p-2">{profile.name}</h1>
                            <p className="text-gray-500 p-2 mt-2">{profile.username}</p>
                            <p className="mt-2 text-sm text-gray-700 p-2">{profile.email}</p>
                        </>
                    )}
                    <div className="flex justify-center gap-4 my-10">
                        <button
                            className="flex items-center gap-2 bg-[#eb6b50] text-white px-4 py-2 rounded-full shadow-md"
                            onClick={handleEditProfile}
                            type="submit"
                        >
                            <Edit size={16} /> {editProfile.text}
                        </button>
                        <button
                            className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded-full shadow-md text-gray-700"
                            onClick={handleLogout}
                            type="button"
                        >
                            <LogOut size={16} /> Log Out
                        </button>
                    </div>
                </form>
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
