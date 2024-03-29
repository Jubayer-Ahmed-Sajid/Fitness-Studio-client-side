import React from 'react'
import { Link } from 'react-router-dom'

const ProductsCards = ({products}) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-2 mt-[25px] p-[10px]'>
      {
        products.map(product=>
            
            <div 
            className='border-2 border-secondary flex flex-col justify-between'
            key={product._id}>
                <img 
                className='h-[250px] object-cover'
                src={product.imgUrl}/>
                <div className='p-[10px]'>
                    <Link to={product._id}>
                        <h1 className='text-xl font-[600]'>{product.Pname}</h1>
                    </Link>
                    <h1 className='text-xl font-[600] bmiNumber mt-[10px] flex items-center'>৳ {product.Pprice} &nbsp;
                    <span className={`${product.sold && 'text-sm text-secondary font-[600] bmiNumber rounded-md p-[3px] border-2 border-secondary w-fit'}`}>{product.sold}</span>
                    </h1>
                </div>
            </div>
            
            )
      }
    </div>
  )
}

export default ProductsCards
