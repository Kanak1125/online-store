// import Swiper core and required modules
import { Navigation, Pagination, Autoplay} from 'swiper/modules';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

const imgArr = [
  "https://images.unsplash.com/photo-1510114054347-3b2610d5e362?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1600364971552-381b40141177?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
  "https://images.unsplash.com/photo-1559563458-527698bf5295?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
  "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80",
  "https://images.unsplash.com/photo-1659535880591-78ed91b35158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
]

const categoriesImgArr = [
  "https://images.unsplash.com/photo-1553143820-6bb68bc34679?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=748&q=80",
  "https://w0.peakpx.com/wallpaper/333/823/HD-wallpaper-chanel-nice-entertainment-brands-jewelery.jpg",
  "https://images.unsplash.com/photo-1620783770629-122b7f187703?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=420&q=80"
]

const swiperSlides = imgArr.map((img, index) => {
  return (
    <SwiperSlide key={index} className='h-[400px]'>
      <img src={img} alt="" className='h-full w-full object-cover object-center '/>
    </SwiperSlide>
  )
})

const Home = (props) => {
  const {categories} = props;

  const categoryCards = categories.map((c, i) => {
    return (
      <Link to={`/category/${c}`} key={i} className='rounded-md overflow-hidden '>
        <div className='h-[400px] overflow-hidden relative hover:scale-110 transition-all duration-200'>
          <div className='absolute h-full w-full bg-accent/20 hover:bg-accent/40 transition-all duration-200'></div>
          <img src={categoriesImgArr[i]} alt="" className='object-cover object-top w-full h-full'/>
          {/* hover scale not working */}
        </div>
      </Link>
    )
  })

  return (
    <>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        loop={true}
        autoplay={{
          delay: 3500, 
          disableOnInteraction: false
        }}
        pagination={{ clickable: true }}
      >
        {swiperSlides}
      </Swiper>
      <main className='max-w-screen-xl mx-auto px-10 md:px-40 py-20 z-20 relative shadow-outer-lg min-h-screen'>
        <h2 className='text-2xl font-bold'>Unveiling Our Finest Collections: Explore Top Categories</h2>
        <div className='grid gap-11 grid-cols-1 md:grid-cols-3 my-10'>
          {categoryCards}
        </div>
      </main>
    </>
  )
}

export default Home