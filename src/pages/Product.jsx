import React from 'react'
import { useParams } from 'react-router-dom'

const Product = () => {
  const { productID } = useParams();

  return (
    <div className='min-h-screen'>Product {productID}</div>
  )
}

export default Product