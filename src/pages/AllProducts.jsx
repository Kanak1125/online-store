import React from 'react'
import Card from '../components/Card';
import CardSkeletonLoader from '../components/CardSkeletonLoader';

const AllProducts = (props) => {
  const {data, isLoading, error} = props;

  if (error) return <h1 className='text-center'>Error: {error}</h1>
  return (
    <>
      <main className='max-w-screen-xl mx-auto px-10 py-10 min-h-screen'>
        <h2 className='text-2xl font-bold'>All Products</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10 py-8'>
          {
            isLoading ? 
            Array(11).fill(0).map((el, i) => (
              <CardSkeletonLoader key={i}/>
            ))
            :
            data.map(item => {
              const {id, image, title, price} = item;
              return (
                <Card
                  key={id}
                  id={id}
                  imgUrl={image}
                  title={title}
                  price={price}
              />)
          })}
        </div>
      </main>
    </>
  )
}

export default AllProducts