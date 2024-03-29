import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPublic from '../../Hooks/useAxiosPublic'

const DynamicProductPage = () => {
    const param = useParams().id
    const [product, setProduct] = useState()
    const AxiosPublic = useAxiosPublic()

    useEffect(()=>{
        AxiosPublic(`/products/${param}`)
        .then(res => setProduct(res.data))
    },[])
  return (
    <div>
      {
        product?.sold === "sold" ?
       <div className='h-[100vh] w-full flex flex-col items-center justify-center text-center p-[10px]'> 
          <h1 className='text-2xl font-bold text-red-500 border-4 border-red-500 p-[10px] rounded-md'> This product is not available anymore </h1>
       </div> 
        :
        <div 
    className='p-[10px] flex flex-col md:flex-row gap-3 items-start justify-evenly min-h-[100vh] md:min-h-[100vh] pt-[100px] pb-[100px]'>
      <img
      className='md:w-[40%] md:h-[70vh] object-contain'
      src={product?.imgUrl} alt={product?.Pname} />
      <div className='flex flex-col gap-2 md:w-[45%]'>
        <h1 className='bmiNumber font-bold text-xl'>৳ {product?.Pprice}</h1>
        <h1 className='text-3xl font-bold'>{product?.Pname}</h1>
        <h1 className='font-[600] text-left'>Seller: {product?.sellerName}</h1>
        <h1 className='bmiNumber'>Quantity: {product?.Pquantity}</h1>
        <h1 className='font-[600] text-left'>{product?.Pdescription}</h1>
        <div className='sticky top-0 md:top-auto md:relative flex md:flex-row gap-2'>
            <a 
            className='w-[50%] text-xl text-white p-[10px] border-2 border-secondary bg-secondary rounded-md font-[600] flex flex-col items-center'
            href={`tel:${product?.PPhone}`}>
            <button>Call</button>
            </a>
            <a
            className='w-[50%] text-xl text-secondary p-[10px] border-2 border-secondary rounded-md font-[600] flex flex-col items-center'
            href={`mailto:${product?.PEmail}`}>
            <button >mail</button>
            </a>
        </div>
      </div>
    </div>
      }
    </div>
  )
}

export default DynamicProductPage
