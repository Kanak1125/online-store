import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import useBreadcrumbs from 'use-react-router-breadcrumbs';
// import Breadcrumbs from '../components/Breadcrumbs';
import Card from '../components/Card';
import CardSkeletonLoader from '../components/CardSkeletonLoader';

const Category = () => {
  const {categoryName} = useParams();
  console.log(categoryName);

  // const breadcrumbs = useBreadcrumbs();

  const {isLoading, error, isFetching, data} = useQuery({
    queryKey: [`categories-${categoryName}`],
    queryFn: async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        return response.data;
      } catch (err) {
        throw new Error("Failed to fetch category data");
      }
    },
    staleTime: 1000 * 60 * 10    // the data will refetch only after 5 mins even if the page changes...
  })

  if (error) return <h1 className='text-center'>Error: {error}</h1>
  
  return (
    <>
      {/* <Breadcrumbs/> */}
      <main className='max-w-screen-xl mx-auto px-10 py-10 z-20 min-h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
          {
            isLoading || isFetching ? 
              Array(11).fill(0).map((el, i) => (
                <CardSkeletonLoader key={i}/>
              ))
            :
            data.map(catData => {
              const {id, image, title, price} = catData;
              return (
                <Card
                  key={id}
                  id={id}
                  imgUrl={image}
                  title={title}
                  price={price}
              />)
            })
          }
        </div>
      </main>
    </>
  )
}

export default Category