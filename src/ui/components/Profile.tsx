import { useEffect, useState } from "react";
import { Edit, LogOut, User, LoaderCircle } from "lucide-react";
import { getProfileData, updateProfileData } from "../../features/auth/services/profileService";
import { toast } from "sonner";
import { deleteRecipe, getUserRecipes } from "../../features/cocktails/services/RecipesService";
import sweet from "../../assets/img/sweet.webp";
import sour from "../../assets/img/sour.webp";
import bitter from "../../assets/img/bitter.webp";
import exotic from "../../assets/img/exotic.webp";
import UpdateCocktail from "./Cocktails/UpdateCocktail";

const categories = [
    { id: 1, name: 'dulces', image: sweet.src, value: 'sweet' },
    { id: 2, name: 'acidos', image: sour.src, value: 'sour' },
    { id: 3, name: 'amargos', image: bitter.src, value: 'bitter' },
    { id: 4, name: 'exoticos', image: exotic.src, value: 'exotic' }
];

export default function ProfilePage( { token, user } : { token: string, user: string } ) {
    const [showForm, setShowForm] = useState(false);
    const [editProfile, setEditProfile] = useState({ edit: false, text: "Editar perfil" });
    const [loading, setLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState({} as any);
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

    useEffect(() => {
        getUserCocktails();
    }, [profile]);

    const getUserProfile = async() => {
        const response = await getProfileData({ id: user }, token);
        
        if (response.data && response.data.getUser && response.data.getUser.data) {
            setProfile(response.data.getUser.data);
            setLoading(false);
        }
    }

    const getUserCocktails = async() => {
        const response = await getUserRecipes(user);

        if(response) {
            setUserPosts(response);
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
        
        const updatedProfile = {
            name: profile.name,
            username: profile.username,
            email: profile.email,
            lastname: profile.last_name,
            image: profile.image,
        };

        const response = await updateProfileData({ ...updatedProfile }, token);

        if(response.data && response.data.editProfile && response.data.editProfile.data) {
            toast.success("Perfil actualizado correctamente");
        }
    }

    const handleEditPost = (post: any) => {
        setShowForm(true);
        setCurrentRecipe(post);
    }

    const handleDeletePost = async(id: string) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este cóctel?");
        if (!confirmDelete) return;

        const response = await deleteRecipe(id);

        if(response.data && response.data.deleteRecipe) {
            toast.success("Cóctel eliminado correctamente");
            setUserPosts(userPosts.filter((post: any) => post._id !== id));
            window.location.reload();
            return;
        }
        
        toast.error("No se ha podido eliminar el cóctel");
    }

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-100 flex justify-center items-center">
                <LoaderCircle size={48} className="text-[#eb6b50] animate-spin" /> 
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-white pb-10">
            {currentRecipe._id && <UpdateCocktail 
                token={token} 
                user={user}
                showForm={showForm}
                setShowForm={setShowForm}
                recipe={currentRecipe}
            />}
            {/* Profile Image */}
            <div className="mt-20">
                {profile.image ? (
                    <img
                        src={`data:image/jpeg;base64,${profile.image}`}
                        alt=""
                        className="mx-auto w-32 h-32 rounded-full bg-white border-4 border-white shadow-md object-cover"
                    />
                ) : (
                    <div className="mx-auto w-32 h-32 rounded-full bg-white border-4 border-white shadow-md flex justify-center items-center">
                        <User size={48} className="text-[#eb6b50] m-auto" />
                    </div>
                )}
                {editProfile.edit && (
                    <div className="mt-4 text-center">
                        <label className="cursor-pointer bg-[#eb6b50] text-white px-4 py-2 rounded-full shadow-md">
                            Cambiar foto
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            console.log(reader.result);
                                            if (reader.result) {
                                                const result = reader.result as string;
                                                const editedImage = result.replace(/^data:image\/[a-z]+;base64,/, "");
                                                setProfile({ ...profile, image: editedImage });
                                            }
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                        </label>
                    </div>
                )}
                
            </div>

            {/* Profile Info */}
            <div className="text-center mt-10 px-4">
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
                <h2 className="text-lg font-bold text-[#eb6b50]">Mis Cococteles</h2>
                <div className="mt-4 space-y-4">
                    {userPosts.map((post: any) => (
                        <div
                            key={post._id}
                            className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md"
                        >
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-16 h-16 bg-gray-300 rounded-lg"
                                    style={{
                                        backgroundImage: `url(${categories.find((category) => category.value === post.category)?.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                />
                                <div>
                                    <h3 className="text-md font-bold"><a href={`/cocktails/${post._id}`}>{post.name}</a></h3>
                                    <p className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <p className="text-sm text-gray-700">{post.description}</p>
                            <div className="flex justify-end gap-2">
                                <button
                                    className="border border-[#eb6b50] text-[#eb6b50] px-4 py-2 rounded-full shadow-md"
                                    onClick={() => handleEditPost(post)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md"
                                    onClick={() => handleDeletePost(post._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
