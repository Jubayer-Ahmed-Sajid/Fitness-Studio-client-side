import React, { useContext, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import defImage from "/default-image.jpg"
import Swal from 'sweetalert2'
import { AuthContext } from '../../Authentication/AuthProvider/AuthProviders'
import axios from 'axios'
import useAxiosPublic from '../../Hooks/useAxiosPublic'
import { useLoaderData } from 'react-router-dom'

const UpdateProductForm = () => {
    const loadedData = useLoaderData()
    const {user} = useContext(AuthContext)
    const [PImagePlaceholder, setPImagePlaceholder] = useState(loadedData.data.imgUrl)
    const [Pname, setPname] = useState('')
    const [Pprice, setPprice] = useState('')
    const [Pquantity, setPquantity] = useState('')
    const [Pdescription, setPdescription] = useState('')
    const [Pimage, setPimage] = useState(loadedData.data.imgUrl)
    const [PPhone, setPPhone] = useState('')
    const [PEmail, setPEmail] = useState('')
    const Axios = useAxiosPublic()

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_HOSTING_KEY}`
    const productsSubmit = (e) => {
        e.preventDefault()
        const Pname = e.target.name.value
        const Pprice = e.target.Price.value
        const Pquantity = e.target.Quantity.value
        const Pdescription = e.target.description.value
        const PPhone = e.target.phone.value
        const PEmail = e.target.email.value

        const form = new FormData()
        const image = e.target.productImage.files[0]
        const id = loadedData.data._id
        let imgUrl = ""
        const verify = "notVerified"
        if (Pquantity < 1) {
            Swal.fire({
                title:"Select a resonable quantity",
                icon:"warning"
            })
        }
        else if(image === undefined){
            return Swal.fire({
                title:"please upload an image of your product",
                icon:"warning"
              })
        }
        else{
            const data = new Date().toLocaleDateString()
            const sellerName = user?.displayName
            const sellerEmail = user?.email
            
            form.append('image', image)

            axios.post(imageUploadUrl, form, {
                headers: {
                  "content-type": "multipart/form-data",
                }
              })
              .then(res => {
                if (res?.data?.data?.display_url) {
                    imgUrl = res?.data?.data?.display_url
                    const productData = {Pname, Pprice, Pquantity, Pdescription,imgUrl, data, PPhone, PEmail, sellerName, sellerEmail,  verify}

                    Axios.post(`/updateProduct/${id}`, productData)
                    .then( )
                    Swal.fire({
                        title:"product modified Successfully!",
                        text: "Your product is modified.",
                        icon:"success"
                    })

                    e.target.name.value= ""
                    e.target.Price.value= ""
                    e.target.Quantity.value= ""
                    e.target.description.value= ""
                    e.target.productImage.value= ""
                    e.target.phone.value= ""
                    e.target.email.value= ""
                    setPImagePlaceholder(defImage)

                }
              })
        }
    }

    const fileInput = useRef(null)

    const handelImage = ()=>{
        fileInput.current.click()
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            setPImagePlaceholder(event.target.result);
        };
        setPimage(reader.readAsDataURL(file))
        // reader.readAsDataURL(file);
    };

  return (
    <div className='flex flex-col gap-3 p-[10px]'>
        <Helmet>
            <title>Product form - FitnessStudion</title>
        </Helmet>
      <h1 className='text-left text-3xl font-[600]'>Modify  <span className='specialFont text-primary'> your </span>product</h1>
      <p  className='text-left'>fill out the form and publish your product here. we are here to help you with that.</p>
      <form
      onSubmit={productsSubmit}
      className='flex flex-col gap-2'>
        <div className='flex flex-col md:flex-row gap-2 w-full'>
            <div className='w-full'>
                <label
                className='text-xl font-[600]'
                htmlFor="name">Product Name <span className='text-primary text-xl'>*</span> </label>
                <input
                required
                onChange={(e)=> setPname(e.target.value)}
                className='text-xl p-[10px] w-full border-2 border-primary rounded-md bg-transparent'
                type="text" name="name" placeholder='Product name' id="name" defaultValue={loadedData.data.Pname} />
            </div>
            <div className='w-full'>
                <label
                className='text-xl font-[600]'
                htmlFor='price'>Price <span className='text-primary text-xl'>*</span></label>
                <input
                required
                onChange={(e)=> setPprice(e.target.value)}
                className='text-xl p-[10px] w-full border-2 border-primary rounded-md bmiNumber bg-transparent'
                type="number" name="Price" placeholder='৳ 00' id="price" defaultValue={loadedData.data.Pprice} />
            </div>
            <div className='w-full'>
                <label
                className='text-xl font-[600]'
                htmlFor='Quantity'>Quantity <span className='text-primary text-xl'>*</span></label>
                <input
                required
                // value={Pquantity}
                onChange={(e)=> setPquantity(e.target.value)}
                className='text-xl p-[10px] w-full border-2 border-primary rounded-md bmiNumber bg-transparent'
                type="number" name="Quantity" placeholder='Qualtity'  id="Quantity" defaultValue={loadedData.data.Pquantity} />
            </div>
        </div>
        <label
            className='text-xl font-[600]'
            htmlFor='description'>Description <span className='text-primary text-xl'>*</span></label>
        <textarea
        required
        onChange={(e)=> setPdescription(e.target.value)}
        className='text-xl p-[10px] w-full border-2 border-primary rounded-md h-[250px] max-h-[250px] min-h-[250px] text-left bg-transparent'
        placeholder='Description' id='description' name='description' defaultValue={loadedData.data.Pdescription}
        />
        <div>
            <label 
            className='text-xl font-[600]'
            htmlFor="image">Select product's photo <span className='text-primary text-xl'>*</span></label>
            <div
            className='flex gap-2 justify-center mt-[10px]'
            >
                <input 
                // required
                ref={fileInput}
                className='hidden'
                onChange={handleFileChange}
                // value={loadedData.data.imgUrl}
                accept="image/*"
                type="file" name="productImage" id="image" />
                <img onClick={handelImage} className='w-full  object-contain h-[300px]' src={PImagePlaceholder} alt="" />
            </div>
        </div>
        <div className='flex flex-col md:flex-row gap-2 w-full'>
            <div className='w-full'>
                <label
                className='text-xl font-[600]'
                htmlFor="phone">Your phone number <span className='text-primary text-xl'>*</span> </label>
                <input
                required
                onChange={(e)=> setPPhone(e.target.value)}
                className='text-xl p-[10px] w-full border-2 border-primary rounded-md bmiNumber bg-transparent'
                type="text" name="phone" placeholder='your contact number' id="phone" defaultValue={loadedData.data.PPhone} />
            </div>
            <div className='w-full'>
                <label
                className='text-xl font-[600]'
                htmlFor='email'>Your Email <span className='text-primary text-xl'>*</span></label>
                <input
                required
                onChange={(e)=> setPEmail(e.target.value)}
                className='text-xl p-[10px] w-full border-2 border-primary rounded-md bmiNumber bg-transparent'
                type="email" name="email" placeholder='Your Email' id="email" defaultValue={loadedData.data.PEmail} />
            </div>
        </div>
        <button
        className='bg-secondary text-white text-xl font-bold p-[10px] w-full rounded-b-md'
        >Save & continue</button>
      </form>
    </div>
  )
}

export default UpdateProductForm
