import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import NavBar from "../components/navbar";
import EmptyCard from "../components/emptycard";
import addUserImg from "../imgs/nodata.png";
import { toast } from "react-toastify";
import { MdAdd } from "react-icons/md";
import Modal from 'react-modal';
import AddEditUser from "./addedituser";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import HappyBirthDayModal from "./happybirthdaymodal";

Modal.setAppElement('#root');

const Home = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null
    });
    const [openHappyBirthDay, setOpenappyBirthDay] = useState({
        isShown: false,
        data: null
    });

    const [isSearch, setIsSearch] = useState(false);

    const getUserInfo = async () => {
        try {
            const response = await axiosInstance.get("/users");
            if (response.data) {
                setUsers(response.data);
            }
        } catch (error) {
            if (error.response && error.response.status === 401) {
                localStorage.clear();
            } else {
                toast.error("Error fetching users");
            }
        } finally {
            setIsLoading(false);
        }
    };

    const deleteUser = async (IdUser) => {
        const id = IdUser;
        console.log("id", id);
        try {
            const response = await axiosInstance.delete(`/users/delete/${id}`);
            if (response.data && !response.data.error) {
                getUserInfo();
                toast.success("Deleted successfully");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    const onSearchNote = async (query) => {
        console.log("query", query);
        try {
            const response = await axiosInstance.get("/users/search", {
                params: { query }
            });
            console.log("users", response.data);

            if (response.data && Array.isArray(response.data)) {
                console.log("users", response.data);
                setIsSearch(true);
                setUsers(response.data);
            } else {
                toast.error("User not found");
            }
        } catch (error) {
            toast.error("An error occurred while searching for users.");
        }
    };

    const handleClearSearch = () => {
        setIsSearch(false);
        setUsers([]);
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <>
            <div className="h-screen w-full overflow-hidden">
                <NavBar onSearchNote={onSearchNote} handleClearSearch={handleClearSearch} />
                <div className="px-5 md:px-10 py-6">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-h-[500px] overflow-y-auto">
                        {isLoading ? (
                            <div className="text-center py-6">Loading...</div>
                        ) : users?.length > 0 ? (
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">ID</th>
                                        <th scope="col" className="px-6 py-3">Full Name</th>
                                        <th scope="col" className="px-6 py-3">Birthday</th>
                                        <th scope="col" className="px-6 py-3">Class Name</th>
                                        <th scope="col" className="px-6 py-3">Major</th>
                                        <th scope="col" className="px-6 py-3">Home Town</th>
                                        <th scope="col" className="px-6 py-3">Gender</th>
                                        <th scope="col" className="px-6 py-3">Average Mark</th>
                                        <th scope="col" className="px-6 py-3">Actions</th>
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
                                            <td className="px-6 py-4">{user.averageMark}</td>
                                            <td className="px-6 py-4 flex space-x-2">
                                                <button
                                                    className="font-medium text-blue-600 dark:text-blue-500 btn-primary"
                                                    onClick={() => {
                                                        setOpenAddEditModal({
                                                            isShown: true,
                                                            type: "edit",
                                                            data: user
                                                        })
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="font-medium text-red-600 dark:text-red-500 btn-red"
                                                    onClick={() => deleteUser(user.id)}
                                                >
                                                    Delete
                                                </button>
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
            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-800 absolute right-10 bottom-10"
                onClick={() => {
                    setOpenAddEditModal({
                        isShown: true,
                        type: "add",
                        data: null
                    })
                }}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>
            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-[#F00784] hover:bg-[#F00784]/80 absolute left-10 bottom-10"
                onClick={() => {
                    setOpenappyBirthDay({
                        isShown: true,
                    })
                }}
            >
                <LiaBirthdayCakeSolid className="text-[32px] text-white" />
            </button>
            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => {
                    setOpenAddEditModal({ isShown: false, type: "add", data: null })
                }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)"
                    }
                }}
                contentLabel=""
                className="w-[95%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-4 p-5"
            >
                <AddEditUser
                    type={openAddEditModal.type}
                    userData={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null })
                    }}
                    getUserInfo={getUserInfo}
                />
            </Modal>
            <Modal
                isOpen={openHappyBirthDay.isShown}
                onRequestClose={() => {
                    setOpenappyBirthDay({ isShown: false, data: null })
                }}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0,0,0,0.2)"
                    }
                }}
                contentLabel=""
                className="w-[95%] md:w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-4 p-5"
            >
                <HappyBirthDayModal onClose={() => {
                    setOpenappyBirthDay({ isShown: false, data: null })
                }}
                />
            </Modal>
        </>
    );
};

export default Home;
