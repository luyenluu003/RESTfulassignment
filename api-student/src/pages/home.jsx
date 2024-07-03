import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import NavBar from "../components/navbar";
import EmptyCard from "../components/emptycard";
import addUserImg from "../imgs/nodata.png";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    })

    const [isSearch, setIsSearch] = useState(false)
    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/users");
            if (response.data) {
                setUsers(response.data);
                console.log("users", response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
            } else {
                console.error("Error fetching users", error);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUser = async (IdUser) => {
        const id = IdUser;
        console.log("id",id)
        try{
            const reponse = await axiosInstance.get("/users/delete/" +id);
            if(reponse.data && !reponse.data.error){
                getUserInfo();
                toast.success("Deleted successfully")
            }
        }catch(error){
            toast.error("An unexpected error occurred. Please try again.")
        }

    };

    const onSearchNote = async (query) => {
        console.log("query",query)
        try{
            const reponse = await axiosInstance.get("/users/search",{
                params:{query}
            })
            console.log("users",reponse.data)

            if(reponse.data && Array.isArray(reponse.data)){
                console.log("users",reponse.data)
                setIsSearch(true)
                setUsers(reponse.data)
            }else{
                toast.error("User not found")
            }
        }catch(error){
            toast.error("An error occurred while searching for users.");
        }
    }

    const handleClearSearch = () =>{
        setIsSearch(false)
        setUsers()
    }


    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
        <div className="h-screen  w-full">
            <NavBar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
            <div className="px-5 md:px-10 py-6 ">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {isLoading ? (
                        <div className="text-center py-6">Loading...</div>
                    ) : users.length > 0 ? (
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr >
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Full Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Birth day
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        class Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Major
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Home Town
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Gender
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="odd:bg-white even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            {user.id}
                                        </td>
                                        <td className="px-6 py-4">{user.fullName}</td>
                                        <td className="px-6 py-4">{user.birthday}</td>
                                        <td className="px-6 py-4">{user.className}</td>
                                        <td className="px-6 py-4">{user.major}</td>
                                        <td className="px-6 py-4">{user.homeTown}</td>
                                        <td className="px-6 py-4">{user.gender}</td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 btn-primary"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 dark:text-blue-500 btn-red "
                                                onClick={()=> deleteUser(user.id)}
                                            >
                                                Delete
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <EmptyCard
                            imgSrc={addUserImg}
                            message={`Start creating new users! Click the 'Add' button to add users to your data!`}
                        />
                    )}
                </div>
            </div>
        </div>
        <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-800 absolute right-10 bottom-10" onClick={() => {
            setOpenAddEditModal({
                isShown: true,
                type: "add",
                data: null
            })
        }}>
            <MdAdd className="text-[32px] text-white" />
        </button>
        </>
    );
};

export default Home;
