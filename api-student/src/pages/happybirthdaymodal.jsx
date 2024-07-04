import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { MdClose } from "react-icons/md";
import birthdayImage from "../imgs/birthday.svg";

const HappyBirthDayModal = ({ onClose }) => {
    const [usersBirthDay, setUsersBirthDay] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getUserBirthDay = async () => {
        try {
            const response = await axiosInstance.get("/users/happybirthday");
            if (response.data) {
                setUsersBirthDay(response.data);
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

    useEffect(() => {
        getUserBirthDay();
    }, []);

    return (
        <>
            <div className="relative">
                <button className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-[#ccc]" onClick={onClose}>
                    <MdClose className="text-xl text-dark-grey" />
                </button>
                {isLoading ? (
                    <div className="text-center py-6">There are no users with birthdays today...</div>
                ) : usersBirthDay.length > 0 ? (
                    <>
                        <div>
                            <h1 className="text-center text-[#EFC3C5] text-3xl font-bold">Happy Birthday</h1>
                            <img src={birthdayImage} alt="happy birthday" className="w-[65%] h-[65%] m-auto" />
                        </div>
                        <div className="grid gird-cols-1 md:grid-cols-3 gap-4 md:max-h-[260px] max-h-[500x]  " style={{ overflowY: 'auto' }}>

                            {usersBirthDay.map((user, index) => (

                                <div key={index} className="p-4 bg-[#EFC3C5] shadow-md rounded-md">
                                    <h2 className="text-lg font-semibold">{user.fullName}</h2>
                                    <p className="text-sm text-gray-600">Birthday: {user.birthday}</p>
                                    <p className="text-sm text-gray-600">Major: {user.major}</p>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-6">There are no users with birthdays today...</div>
                )}
            </div>
        </>
    );
};

export default HappyBirthDayModal;
