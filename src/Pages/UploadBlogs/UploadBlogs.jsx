import axios from 'axios';
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form';
import useAuth from '../../Hooks/useAuth';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
import { socket } from '../../socketIo/socket';

const UploadBlogs = () => {
    const { user } = useAuth()
    const axiosPublic = useAxiosPublic()
    const dispatch = useDispatch()
    const { user: userDetails } = useSelector(state => state.user)
    const follower = userDetails.followed
    const [tinyData, setTinyData] = useState("what's on your mind?")
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user])
    const imgHostingKey = import.meta.env.VITE_IMG_HOSTING_KEY;
    const imgHostingApi = `https://api.imgbb.com/1/upload?key=${imgHostingKey}`;
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const toastId = toast.loading("Publishing...");
        const image = { image: data?.img[0] };
        try {

            const res = await axios.post(imgHostingApi, image, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            const blogImg = res?.data?.data?.display_url;
            const userEmail = user?.email;
            const userId = userDetails?._id;
            const userName = user?.displayName;
            const userImg = user?.photoURL;
            const blogName = data?.blogname;
            const blogDes = tinyData;
            const time = new Date().getTime();
            const allData = { time, userEmail, userName, userId, userImg, blogImg, blogName, blogDes }
            axiosPublic.post('/post_blog', allData)
                .then(res => {
                    if (res?.data?.insertedId) {
                        reset()
                        toast.success("Published Successfully !", { id: toastId });
                        const notificationInfo = {
                            userName: user?.displayName,
                            senderAvatar: user?.photoURL,
                            senderId: userDetails?._id,
                            receiverName: follower,
                            type: 'blogUpload',
                            time: new Date()

                        }
                        axiosPublic.post('/notifications', notificationInfo)
                            .then((res) => {
                                if (res?.data) {
                                    socket.emit('notifications', notificationInfo)
                                }
                            })

                    }

                })
                .catch((err) => {
                    toast.error(err?.code, { id: toastId });
                });
        }
        catch {
            toast.error('error', { id: toastId });
        }


    }


    const haldelChange = (content, editor) => {
        setTinyData(content)

    }
    return (
        <div className='p-[10px] my-[50px]'>
            <Helmet>
                <title>Upload a blog - FitnessStudio</title>
            </Helmet>
            <div className='flex flex-col items-center gap-[20px]'>
                <h1 className='text-center text-2xl font-bold'>Write a blog</h1>
                <div className='bg-primary w-[60%] md:w-[20%] h-[5px] rounded-box'></div>
                <p className='text-md md:text-xl text-secondary font-[500] text-center'>Ready to inspire others on their fitness journey? Let's make your voice heard</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='border-2 border-secondary my-[50px] flex flex-col gap-3 bg-opacity-70 rounded-xl formStyle'>
                <div className='flex flex-col gap-[20px] items-start w-full'>
                    {/* <label htmlFor='blogName'
                        className='font-bold text-xl'>
                        Blog name:
                    </label> */}
                    <input
                        {...register("blogname", { required: true })}
                        className='border-b-[3px] border-secondary rounded-t-xl outline-none w-full p-[10px] text-black'
                        type="text" name="blogname" placeholder='Blog name' id="blogname" />
                </div>
                <div className='flex flex-col gap-[20px] items-start w-full'>
                    {/* <label htmlFor='blogName'
                        className='font-bold text-xl'>
                        Blog Image:
                    </label> */}
                    <input
                        {...register("img", { required: true })}
                        className='border-b-[3px] border-secondary outline-none w-full p-[10px]'
                        type="file" name="img" placeholder='blog name' id="img" />
                </div>

                <div className='flex flex-col gap-[20px] items-start w-full'>
                    {/* <label htmlFor='blogName'
                        className='font-bold text-xl'>
                        Blog:
                    </label> */}
                    {/* <textarea
                        {...register("blog", { required: true })}
                        required
                        className=' outline-none w-full p-[10px] min-h-[250px] h-[250px] max-h-[250px]'
                        type="text" name="blog" placeholder='Whats on your mind?' id="blog" /> */}

                    <Editor
                        apiKey='ffaw0tilo4m0ex1q5nmpaa5fblipi8p51r8bnqbq3wbyf8vi'
                        init={{
                            height: 500,
                            max_height: "500",
                            width: '100%',
                            border: "0px",
                            //    menubar: false,
                            toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                            tinycomments_mode: 'embedded',
                            tinycomments_author: 'Author name',
                            // mergetags_list: [
                            //   { value: 'First.Name', title: 'First Name' },
                            //   { value: 'Email', title: 'Email' },
                            // ],
                            ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                        }}
                        value={tinyData}
                        onEditorChange={haldelChange} />
                </div>
                <button
                    className='bg-secondary text-white font-[600] p-[10px] text-xl rounded-md'
                    type='submit'>
                    Publish
                </button>


            </form>
        </div>
    )
}

export default UploadBlogs
