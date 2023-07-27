import React from 'react'
import { useParams } from 'react-router-dom'

const Category = () => {
  const {categoryName} = useParams();
  console.log(categoryName);

  return (
    <div>Category {categoryName}</div>
  )
}

export default Category