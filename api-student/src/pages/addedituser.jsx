import { useState } from "react";
import { MdClose } from "react-icons/md";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";

const AddEditUser = ({ noteData, type, getUserInfo, onClose }) => {
    const [fullName, setFullName] = useState(noteData?.fullName || "");
    const [birthday, setBirthday] = useState(noteData?.birthday || "");
    const [major, setMajor] = useState(noteData?.major || "");
    const [homeTown, setHomeTown] = useState(noteData?.homeTown || "");
    const [gender, setGender] = useState(noteData?.gender || "Nam");
    const [className, setClassName] = useState(noteData?.className || "");
    const [averageMark, setAverageMark] = useState(noteData?.averageMark || "");

    const addNewUser = async () => {
        try {
            const userData = { fullName, birthday, major, className, homeTown, gender, averageMark };
            const response = await axiosInstance.post("/users/addnewuser", userData, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            });
            if (response.data && !response.data.error) {
                getUserInfo();
                onClose();
                toast.success("Added successfully");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    const editUser = async () => {
        const id = noteData?.id;
        if (!id) {
            toast.error("User ID is missing.");
            return;
        }

        try {
            const userData = { fullName, birthday, major, className, homeTown, gender, averageMark };
            const response = await axiosInstance.put(`/users/edit/${id}`, userData, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            });
            if (response.data && !response.data.error) {
                getUserInfo();
                onClose();
                toast.success("Updated successfully");
            }
        } catch (error) {
            toast.error("An unexpected error occurred. Please try again.");
        }
    };

    const handleAddNote = () => {
        if (!fullName || !birthday || !major || !className || !homeTown || !gender || !averageMark) {
            toast.error("Please fill in all fields.");
            return;
        }

        if (type === "edit") {
            editUser();
        } else {
            addNewUser();
        }
    };

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    return (
        <>
            <div className="relative">
                <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-[#ccc]" onClick={onClose}>
                    <MdClose className="text-xl text-dark-grey" />
                </button>
                <h1 className="input-h1">{type === "edit" ? "EDIT USER" : "ADD USER"}</h1>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="input-label">Full Name</label>
                    <input
                        type="text"
                        className="text-xl p-2 text-black outline-none border-dark-grey border-2 rounded-md"
                        placeholder="Please enter a full name"
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="input-label">Birth Day</label>
                    <input
                        type="date"
                        className="text-xl p-2 text-black outline-none border-dark-grey border-2 rounded-md"
                        placeholder="Please enter a birth day"
                        value={birthday}
                        onChange={({ target }) => setBirthday(target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="input-label">Major</label>
                    <input
                        type="text"
                        className="text-xl p-2 text-black outline-none border-dark-grey border-2 rounded-md"
                        placeholder="Please enter a major"
                        value={major}
                        onChange={({ target }) => setMajor(target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="input-label">Class Name</label>
                    <input
                        type="text"
                        className="text-xl p-2 text-black outline-none border-dark-grey border-2 rounded-md"
                        placeholder="Please enter a class name"
                        value={className}
                        onChange={({ target }) => setClassName(target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="input-label">Home Town</label>
                    <input
                        type="text"
                        className="text-xl p-2 text-black outline-none border-dark-grey border-2 rounded-md"
                        placeholder="Please enter a home town"
                        value={homeTown}
                        onChange={({ target }) => setHomeTown(target.value)}
                    />
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="input-label">Gender</label>
                    <div className="flex space-x-4">
                        <label className="relative inline-flex items-center cursor-pointer ml-1">
                            <input
                                type="radio"
                                value="Nam"
                                checked={gender === 'Nam'}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <span className={`w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center ${gender === 'Nam' ? 'bg-primary' : ''}`}>
                                {gender === 'Nam' && (
                                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                                )}
                            </span>
                            <span className="ml-2 text-gray-800">Nam</span>
                        </label>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="radio"
                                value="Nữ"
                                checked={gender === 'Nữ'}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <span className={`w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center ${gender === 'Nữ' ? 'bg-primary' : ''}`}>
                                {gender === 'Nữ' && (
                                    <span className="w-3 h-3 bg-primary rounded-full"></span>
                                )}
                            </span>
                            <span className="ml-2 text-gray-800">Nữ</span>
                        </label>
                    </div>
                </div>
                <div className="flex flex-col gap-2 mt-2">
                    <label className="input-label">Average Mark</label>
                    <input
                        type="text"
                        className="text-xl p-2 text-black outline-none border-dark-grey border-2 rounded-md"
                        placeholder="Please enter an average mark"
                        value={averageMark}
                        onChange={({ target }) => setAverageMark(target.value)}
                    />
                </div>
                <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
                    {type === "edit" ? "UPDATE" : "ADD"}
                </button>
            </div>
        </>
    );
};

export default AddEditUser;
