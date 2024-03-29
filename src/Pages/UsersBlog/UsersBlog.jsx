import { useEffect, useState } from "react"
import useAxiosPublic from "../../Hooks/useAxiosPublic"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import Swal from "sweetalert2"
import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react"
import { fetchSingleUser } from "../../Redux/SingleUserSlice/singleUserSlice"
import { AuthContext } from "../../Authentication/AuthProvider/AuthProviders"
import { BiMessageDetail } from "react-icons/bi";
import { socket } from "../../socketIo/socket"

const UsersBlog = () => {
  const axiosPublic = useAxiosPublic()
  const { user } = useContext(AuthContext)
  // const { user } = useAuth()
  const [blogs, setblogs] = useState([])
  const [write, setWriter] = useState([])
  const [followings, setfollowings] = useState([])
  const [followed, setFollowed] = useState([])
  const [checking, setchecking] = useState()
  const [isFollower, setIsFollower] = useState([])
  const [staatus, setStatus] = useState()
  const [loading, setloading] = useState(false)
  const dispatch = useDispatch()
  const { user: userDetails } = useSelector(state => state.user)
  const param = useParams().email
  const paramid = useParams().id
  const navigate = useNavigate()
  useEffect(() => {
    axiosPublic(`/my_blogs/${param}`)
      .then(res => setblogs(res.data))
  }, [])
  useEffect(() => {
    axiosPublic(`/user?email=${param}`)
      .then(res => setWriter(res.data))
  }, [param, loading]);

  useEffect(() => {
    dispatch(fetchSingleUser(user?.email))

  }, [dispatch, user, loading])

  useEffect(() => {
    setfollowings(userDetails.following)
    setFollowed(userDetails.followed)
  }, [userDetails])

  useEffect(() => {
    setchecking(followings?.find(id => write?._id === id))
    setIsFollower(followed?.find(id => write?._id === id))
  }, [followings])

  const handleFollow = () => {
    axiosPublic.put(`/following/${userDetails?._id}`, write)
      .then(res => {
        if (res.data.followingResult.matchedCount > 0) {
          setloading(!loading)
          Swal.fire({
            title: "Followed successfully",
            icon: "success"
          })
          const notificationInfo = {
            userName: user?.displayName,
            senderAvatar: user?.photoURL,
            senderId: userDetails?._id,
            receiverName: [write?._id],
            type: 'followed',
            senderMail: user?.email,
            time: new Date()

          }
          axiosPublic.post('/notifications', notificationInfo)
          if(res?.data){
            socket.emit('notifications', notificationInfo)
        }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  const unfollow = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to unfollow this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Unfollow"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.put(`/unfollowing/${userDetails?._id}`, write)
          .then(res => {
            setloading(!loading)
            Swal.fire({
              title: "Unfollow!",
              text: "unfollowed successfully",
              icon: "success"
            });
          })
          .catch(err => {
            console.log(err);
          })
      }
    });
  }
  const handleChat = () => {
    navigate(`/dashboard/message?userId1=${userDetails?._id}&userId2=${write?._id}`)
  }
  const age = userDetails.birthDay && Math.floor((new Date() - new Date(userDetails.birthDay)) / 31556952000)
  return (
    <div className="p-[10px]">
      <Helmet>
        <title> Blog collection</title>
      </Helmet>
      <div className="flex gap-2 bg-secondary bg-opacity-40 my-[50px] p-[10px] text-wrap">
        {
          write === undefined ? <h1>Not found</h1> :
            <div
              className="w-full md:w-fit flex flex-col md:flex-row justify-around items-center gap-4 bmiNumber text-primary">
              <div className="flex flex-col items-center gap-3 text-wrap ">
                <img className="h-[200px] rounded-full object
                 -cover" src={write.image} />
                <div className="flex flex-wrap justify-center items-center gap-3">
                  {
                    user?.email === param ? <span className="text-lg font-bold">It's You</span> : (isFollower ?
                      <button disabled className="bg-primary p-[10px] text-xl text-white rounded-md">
                        Follower
                      </button>
                      :
                      (<>
                        <button onClick={checking ? unfollow : handleFollow} className="bg-primary p-[10px] text-xl text-white rounded-md">
                          {checking ? "Unfollow" : "Follow"}
                        </button>

                      </>))
                  }

                  {
                    isFollower && <button onClick={handleChat} className="bg-primary p-[10px] px-4 text-2xl text-white rounded-md">
                      <BiMessageDetail />
                    </button>
                  }
                  {
                    checking && <button onClick={handleChat} className="bg-primary p-[10px] px-4 text-2xl text-white rounded-md">
                      <BiMessageDetail />
                    </button>
                  }
                </div>
                {/* <button 
                  className={`${checking && checking.length > 0 ? 'hidden' : 'bg-primary p-[10px] text-xl text-white rounded-md'}`}>Follow</button>
                  <button 
                  className={`${checking && checking.length === 0 ? 'hidden' :"bg-primary p-[10px] text-xl text-white rounded-md"}`}>Unfollow</button> */}
              </div>
              <div className="break-all">
                <h1 className="text-2xl font-[600]">{write.name}</h1>
                <h1 className="text-base font-[600]">Email: {write.email}</h1>
                <h1 className="text-base font-[600]">Age: {age}</h1>
                {/* <h1 className="text-base font-[600]">Status: {writer.Status}</h1> */}
                <h1 className="text-base font-[600]">Following: {write?.following === undefined ? 0 : write?.following?.length}</h1>
                <h1 className="text-base font-[600]">Followed: {write?.followed === undefined ? 0 : write?.followed?.length}</h1>
                <h1 className="text-base font-[600]">Total posts: {blogs?.length}</h1>
              </div>
            </div>
        }

      </div>
      <div className="flex flex-col md:flex-row flex-wrap justify-evenly gap-2">
        {
          blogs.map(blog =>
            <div
              className="lg:w-[30%] shadow-xl rounded-md flex flex-col justify-between overflow-hidden"
              key={blog._id}>
              <img className="h-[260px] w-full object-cover" src={blog.blogImg} />
              <div className="p-[10px] flex flex-col gap-2">
                <Link to={`/blogs/${paramid}/${param}/${blog._id}`}>
                  <h1 className="text-2xl font-[600]">{blog.blogName}</h1>
                </Link>
                <p>published at: <span className="bmiNumber">{(new Date(blog?.time)).toLocaleDateString().split('/').reverse().join('-')}</span></p>
                <div dangerouslySetInnerHTML={{ __html: `${blog.blogDes.slice(0 - 350)}` }} />
              </div>
            </div>)
        }
      </div>
    </div>
  )
}

export default UsersBlog
