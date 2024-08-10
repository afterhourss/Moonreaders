import { useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import NoAuthError from "./error/NoAuthError";
import FileButtonUploader from "../components/FileButtonUploader";
import { useEffect, useState } from "react";
import { Toaster, toast} from 'sonner'
import { defaultProfile } from "../utils/utils";
import axios from "axios";



function Profilepage() {
    const navigate = useNavigate()
    const [addCart, cart, removeCartItem, addQty, minQty, userData, isAuth, apiHost, apiPort] = useOutletContext();

    const [username, setUsername] = useState('')
    const [file, setFile] = useState(null)
    

    const removeProfile = async () => {
        const promise = fetch(`${apiHost}:${apiPort}/user/profile/remove/${userData.id_user}`, {
            method: 'PUT'
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to remove profile');
            }
            return res.json();
        })
        .catch(error => {
            console.error(error);
            throw error;
        })
    
        toast.promise(promise, {
            loading: 'Removing profile...',
            success: 'Profile successfully removed',
            error: 'Error when removing profile'
        });
    };

    const handleImageUpload = async() => {
        const formData = new FormData()
        const appendFormData = formData.append('avatar', file)
        try {
            const res = await axios.post(`${apiHost}:${apiPort}/user/profile/upload`, appendFormData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
        } catch (error) {
            console.log(error)
        }
    }

    console.log(userData)
    if(!isAuth) return <NoAuthError/>

  return (
    <>
    <Toaster/>
    <div className="pt-20">
        <div className="flex px-[400px]">
            <div className="flex flex-col">
                <div className="font-bold text-4xl">{userData.username}</div>
                <div>This is my kinda description</div>
            </div>
        </div>

        <div className="px-[400px] pt-20 flex gap-36">
            <div className="flex gap-7 flex-col text-lg font-medium border-r-2 border-gray-200 px-20">
                <div>Account</div>
                <div>Wishlist</div>
                <div>Settings</div>
            </div>
            <div className="space-y-10">
                <div className="text-3xl font-bold">Account</div>
                <div>
                    <div>Avatar</div>
                    <div className="flex items-center gap-5">
                        <img src={userData.profile} alt="" className="w-32 rounded-full"/>
                        <FileButtonUploader handleImageUpload={handleImageUpload} setFile={setFile}/> 
                        {userData.profile !== defaultProfile &&
                        <button className="px-4 py-2 border rounded-md" onClick={removeProfile}>Remove</button>
                        }
                    </div>
                </div>
                <div>
                    <div className="flex gap-40">
                        <div className="font-medium">Display name</div>
                        <div className="text-gray-400">Visible to other members</div>
                    </div>
                    <input type="name" className=" rounded-lg py-2 px-4 w-[500px] border bg-gray-50" placeholder={userData.username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div>
                    <div className="font-medium">Change password</div>
                    <input type="name" className=" rounded-lg py-2 px-4 w-[500px] border bg-gray-50"/>
                </div>
                <div className="flex">
                    <div>
                        <div className="font-medium">Delete account</div>
                        <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore velit earum doloribus exercitationem?</div>
                    </div>
                    <div className="text-gray-400">Delete account</div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Profilepage