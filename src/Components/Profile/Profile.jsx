import { useEffect, useState } from 'react';
import useAuth from '../../Hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSingleUser } from '../../Redux/SingleUserSlice/singleUserSlice';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { updateProfile } from '@firebase/auth';
import auth from '../../firebase/firebase.config';
import ProfileMain from './ProfileMain';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import pageBg from '../../assets/images/dumbbells-floor-gym-ai-generative.jpg';
import Loading from '../Loading';
import { FaPen, FaRegPenToSquare } from "react-icons/fa6";
const Profile = () => {
    const dispatch = useDispatch()
    const [showMenu, setShowMenu] = useState(false)
    const { user, changeRefetch, setChangeRefetch } = useAuth()
    const axiosPublic = useAxiosSecure()
    const { user: userDetails, isLoading } = useSelector(state => state.user)
    const [edit, setEdit] = useState(false)
    const [ageErr, setAgeErr] = useState('')
    const [myPersonalInfo, setMyPersonalInfo] = useState({})
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    // style Variable start

    const inputFieldStyle = ` ${edit ? 'input input-accent border-[1.4px] bg-white' : 'border-[1px] cursor-not-allowed bg-white/70'}  w-full  p-3  border-primary rounded font-semibold  text-black`
    const selectFieldFieldStyle = ` ${edit ? 'border-[1.4px] bg-white' : 'border-[1px] cursor-not-allowed bg-white/70'}   w-full   h-[50px]  border-primary rounded font-semibold  text-black`
    const buttonStyle = 'btn transition-all duration-500 font-bold text-white rounded border-[3px]  '

    // style Variable end
    useEffect(() => {
        dispatch(fetchSingleUser(user?.email))
    }, [dispatch, user, edit])
    useEffect(() => {
        const myBMI = (userDetails.weight / Math.pow(userDetails.height / 39.37, 2)).toFixed(2)
        const age = userDetails.birthDay && Math.floor((new Date() - new Date(userDetails.birthDay)) / 31556952000)

        const bmrForMale = 88.362 + (13.397 * userDetails.weight) + (4.799 * (userDetails?.height * 2.54)) - (5.677 * parseInt(age))
        const bmrForFemale = 447.593 + ((9.247 * userDetails?.weight) + (3.098 * (userDetails?.height * 2.54))) - (4.330 * parseInt(age))

        const myBMR = (userDetails?.gender === 'Male' ? bmrForMale : bmrForFemale).toFixed(2)
        setMyPersonalInfo({ myBMI, age, myBMR })
    }, [userDetails])

    if (isLoading) {
        return <Loading></Loading>
    }
    const { age, myBMI, myBMR } = myPersonalInfo;

    const handleCancel = () => {
        reset()
        setEdit(false)
    }
    const onSubmit = (data) => {
        setAgeErr('')
        const name = data?.name;
        const birthDay = data?.birthDay;
        const weight = parseFloat(data?.weight);
        const feet = data?.feet;
        const inch = data?.inch;
        const gender = data?.gender;
        const bio = data?.bio
        const height = feet * 12 + parseFloat(inch);
        const isPerfectAge = new Date() - new Date(birthDay);
        const ageInYears = Math.floor(isPerfectAge / 31556952000);

        if (ageInYears < 5) {
            setAgeErr('Make sure Your age is more than 5')
            return
        }
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(res => {
                const personalData = {
                    name,
                    birthDay,
                    weight,
                    height,
                    gender,
                    bio
                }
                axiosPublic.put(`/update_user_data/${user?.email}`, personalData)
                    .then(res => {
                        if (res?.data.modifiedCount > 0) {
                            Swal.fire({
                                icon: "success",
                                title: "Updated data successfully",
                                timer: 1500
                            });
                            setEdit(false)
                            setChangeRefetch(changeRefetch + 1)
                        }
                    })
                    .catch(err => {
                        console.log(err?.message);
                    })
            })
            .catch(err => {
                console.log(err);
            })
    }



    return (
        <div  className='p-5 lg:p-10 '
        // style={{ background: `url(${pageBg})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}
        >
            <div className={`${!edit ? 'block' : 'hidden'} my-5 relative `}>
                <ProfileMain age={age} myBMI={myBMI} myBMR={myBMR} userDetails={userDetails} showMenu={showMenu} setShowMenu={setShowMenu} edit={edit} setEdit={setEdit}></ProfileMain>
                <div className={`${edit && 'hidden'} absolute top-4 right-4`}>
                        <button
                            onClick={() => setEdit(true)}
                            className=' border-[1.5px] border-primary py-[5px] px-2 font-bold  transition-all rounded hover:rounded-md bg-white/90  hover:bg-primary/90 hover:text-white duration-300 active:scale-90 active:rounded-xl hidden sm:flex justify-center items-center gap-1 text-sm'><span className='text-sm font-bold'><FaRegPenToSquare /></span>Edit Profile</button>
                    </div>
            </div>
            <div className={`${edit ? 'block' : 'hidden'}`}>
                <div className='w-full max-w-7xl  bg-gray-200  mx-auto p-5 pt-12 rounded relative shadow-lg  '>

                    <form onSubmit={handleSubmit(onSubmit)} className=' grid grid-cols-1 sm:grid-cols-2 gap-3  p-5 '>
                        <p className='text-2xl font-bold mb-2 sm:col-span-2'>Personal Information</p>
                        {/* name  */}
                        <div>
                            <label className='font-bold flex gap-0'>Name <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("name")}
                                className={`${inputFieldStyle}`} defaultValue={userDetails?.name} />
                        </div>
                        {/* date of birth  */}
                        <div>
                            <label className='font-bold flex gap-0'>Date of Birth <span className='text-primary text-lg'>*</span></label>
                            <input
                                required
                                disabled={!edit}
                                {...register("birthDay")}
                                type={edit ? 'date' : 'text'}
                                className={`${inputFieldStyle} `} placeholder='Date of Birth' defaultValue={userDetails?.birthDay || 'Not Given'} />
                            <span className="text-sm font-bold text-red-500">{ageErr}</span>
                        </div>
                        {/* weight  */}
                        <div>
                            <label className='font-bold flex gap-0'>Weight <span className='text-primary text-lg'>*</span></label>
                            <label className='font-bold text-sm'>KG</label>
                            <input
                                required
                                disabled={!edit}
                                {...register("weight", {
                                    required: true, min: { value: 7, message: "weight must be minimum 7 kg" }
                                })}
                                type={edit ? 'number' : 'text'}
                                className={`${inputFieldStyle}`} placeholder='Your weight' defaultValue={userDetails?.weight ? userDetails?.weight : 'Not Given'} />
                        </div>
                        {/* height  */}
                        <div>
                            <label className='font-bold flex gap-0'>Height <span className='text-primary text-lg'>*</span></label>
                            <div className='grid grid-cols-2 gap-3'>
                                <div>
                                    <label className='font-bold text-sm'>Feet</label>
                                    <input
                                        disabled={!edit}
                                        required
                                        type={edit ? 'number' : 'text'}
                                        {...register("feet", {
                                            required: true, min: { value: 2, message: "Feet must be minimum 2" },
                                            max: { value: 7, message: "Feet Maximum be  maximum 7 feet " }
                                        })}
                                        className={`${inputFieldStyle}`} placeholder='Feet' defaultValue={Math.floor(userDetails?.height / 12) || 'Not Given'} />
                                    {errors.feet && <span className="text-sm font-bold text-red-500">{errors.feet.message}</span>}
                                </div>
                                <div>
                                    <label className='font-bold text-sm'>Inch</label>
                                    <input
                                        disabled={!edit}
                                        required
                                        type={edit ? 'number' : 'text'}
                                        {...register("inch", {
                                            required: true,
                                            max: { value: 11, message: "Inch must be Maximum 11 inch " }
                                        })}
                                        className={`${inputFieldStyle}`} placeholder='Inch' defaultValue={userDetails?.height ? (userDetails?.height % 12) : 'Not Given'} />
                                    {errors.inch && <span className="text-sm font-bold text-red-500">{errors.inch.message}</span>}
                                </div>
                            </div>
                        </div>
                        {/* gender  */}
                        <div className='relative '>
                            <label className='font-bold flex gap-0'>Gender <span className='text-primary text-lg'>*</span></label>
                            <select
                                required
                                disabled={!edit}
                                {...register("gender")}
                                className={`${selectFieldFieldStyle}`} placeholder='Your gender' defaultValue={userDetails?.gender}>
                                <option value={''} disabled selected>
                                    Select Gender
                                </option>
                                <option >
                                    Male
                                </option>
                                <option >
                                    Female
                                </option>
                            </select>

                        </div>
                        {/* bio  */}
                        <div className='sm:col-span-2'>
                            <label className='font-bold flex gap-0'>Bio <span className='text-primary text-lg'>*</span></label>
                            <textarea
                                // required
                                disabled={!edit}
                                {...register("bio")}
                                type='text'
                                className={`${inputFieldStyle} h-[150px] md:h-[130px]`} placeholder='Your bio' defaultValue={userDetails?.bio ? userDetails?.bio : 'Not Given'} ></textarea>
                        </div>
                        {/* action  */}
                        <div className={`${!edit && 'hidden'} flex gap-5 sm:col-span-2`}>
                            <button className={`${buttonStyle} active:bg-primary/70  bg-primary/80 hover:bg-primary  border-transparent hover:border-primary`}>Update</button>
                            <p onClick={handleCancel} className={`${buttonStyle} active:bg-red-800  bg-red-500 hover:bg-red-700  border-transparent hover:border-red-700`}>Cancel</p>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
    )

}


export default Profile;