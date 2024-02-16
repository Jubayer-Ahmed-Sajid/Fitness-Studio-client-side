/* eslint-disable react/prop-types */
// import React from 'react';
import { useEffect, useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { backendUrl } from "../../BackendUrl/backendUrl";
import { io } from "socket.io-client";
import { useNavigate } from "react-router";
const MessageBox = ({ userData, friendData, messages, refetch, scrollToTop }) => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const chatContainerRef = useRef(null);
    const socket = io(backendUrl)
    useEffect(() => {
        socket.on('refetch', (message) => {
            refetch()
        })

        return () => {
            socket.disconnect();
        }
    }, [])
    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToTop]);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    const handleChange = (e) => {

        e.preventDefault();

        setMessage(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const sender = userData?._id;
        const receiver = friendData?._id;
        const time = new Date().getTime();
        const seen = false
        const messageData = {
            sender,
            receiver,
            time,
            message,
            seen
        }

        // ?sender=${userData?._id}&receiver=${friendData?._id}
        console.log(messageData);
        axiosPublic.post(`/send_message`, messageData)
            .then(res => {
                console.log(res.data);
                if (res?.data?.insertedId) {
                    setMessage('')
                    socket.emit('refetch', {
                        message,
                        time: new Date()
                    })
                    refetch()
                }
            })
            .catch(err => {
                console.log(err);
            })

    }
    const makeTime = (date) => {
        const time = new Date(date);
        const formattedTime = time.toLocaleTimeString("en-US", {
            hour: '2-digit',
            minute: '2-digit'
        });
        const formattedDate = time.toLocaleDateString("en-US", { year: 'numeric', month: 'numeric', day: 'numeric' });
        return `${formattedTime.split(' ')[0]} ${formattedDate.split('/')[1]}.${formattedDate.split('/')[0]}.${`${formattedDate.split('/')[2].split('')[2]}${formattedDate.split('/')[2].split('')[3]}`}`
    }
    const handleBack = () => {
        navigate(-1)
    }
    const handleProfile = () => {
        navigate(`/blogs/blogs/${friendData?.email}`)
    }
    return (
        <div className="p-5 h-[80vh] md:h-screen flex justify-center items-center">
            <div className="w-full max-w-[450px] min-h-[75vh] max-h-[75vh] mx-auto  border-[1.5px] border-primary rounded-md shadow-xl relative overflow-hidden overflow-y-scroll bg-white" ref={chatContainerRef}>
                <div className="w-full h-10 border-b-[1.4px] border-primary sticky top-0 z-10 bg-white">
                    <div className="flex gap-2   px-2 items-center h-10 justify-between">


                        <div className="flex gap-2    items-center">
                            <img title={`Go to ${friendData?.name}'s profile`} onClick={handleProfile} className="w-8 h-8 rounded-full object-cover  border border-black cursor-pointer" src={friendData?.image} alt="" />
                            <span className="text-sm font-bold">{friendData?.name?.split(' ')[0]}</span>
                        </div>
                        <div>
                            <button onClick={handleBack} className="text-sm font-bold  hover:text-black active:scale-90 transition-all duration-500 mr-2">Back</button>
                        </div>
                    </div>
                </div>
                <div className={`p-2 space-y-2`} style={{ minHeight: `calc(75vh - 90px)` }}>
                    {
                        messages?.map(sms => <p key={sms?._id} className={`w-full flex flex-col   ${sms?.sender !== userData?._id ? 'chat chat-start' : 'chat chat-end'}`}>
                            <span className={`text-xs bmiNumber  ${sms?.sender == userData?._id ? 'ml-auto pr-3' : 'mr-auto pl-3'}`}>
                                {makeTime(sms?.time)}
                            </span>
                            <span className={`flex  items-end  gap-2 ${sms?.sender == userData?._id ? 'ml-auto flex-row-reverse chat-end' : 'mr-auto '} chat `}>
                                <img className="w-8 h-8 object-cover rounded-full" src={sms?.sender == userData?._id ? userData?.image : friendData?.image} alt="" />
                                <span className={`chat-bubble ${sms?.sender == userData?._id ? 'chat-bubble-info' : 'chat-bubble-error bg-primary/50'}  `}>
                                    {sms.message}
                                </span>
                            </span>
                        </p>)
                    }
                </div>
                <div className="sticky bottom-0 w-full bg-white">
                    <form onSubmit={handleSubmit} className="w-full relative">
                        <textarea value={message} onChange={handleChange} type="text"
                            placeholder="Message..."
                            className="input  w-full h-10 border-primary rounded-none border-b-0 border-r-0 border-l-0 text-sm font-medium" ></textarea>
                        <button disabled={!message} className={`${!message && 'cursor-not-allowed text-gray-400'} absolute  right-3 top-[10px] text-xl active:scale-90 duration-200 transition-all hover:text-black`}><IoSendSharp></IoSendSharp></button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MessageBox;