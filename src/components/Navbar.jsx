import React from 'react'
import {BsSearch, BsCart3} from 'react-icons/bs';
import {FiChevronDown} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const {isHamMenuActive, setIsHamMenuActive, toggleCategories, setToggleCategories, categories} = props;
  return (
    <header className='w-full py-5 px-5 md:px-10 bg-accent text-primary '>
        {/* space-x-3 for horizontal space between the flex-box items of 3units and 10units for the medium and large screen sizes... */}
        <div className='flex items-center justify-between max-w-screen-xl mx-auto space-x-3 md:space-x-10 '> 
          <Link to={'/'} className="logo text-bold text-xl md:text-2xl z-20">Online <span className='text-secondary'>Store</span></Link>

          <form action="" className="search-form relative text-base w-200 flex-1 z-20">
            <input 
              type="text" 
              className='text-accent py-2 px-3 rounded w-full outline-none'
              placeholder='Search here...'
              onClick={(e) => e.preventDefault()}
            />
            <BsSearch className='absolute top-3 right-3 text-accent align-cnter'/>
          </form>
          <nav className=' text-xl flex items-center gap-10'>
            <ul className={`w-full absolute bg-accent left-0 py-10 px-5 transition-all duration-500 z-[2] md:z-10 md:flex md:items-center md:static md:p-0 space-y-5 md:space-y-0 ${isHamMenuActive ? 'opacity-100 top-20' : 'opacity-0 md:opacity-100 top-[-200px]'}`}>
              <li className='mx-5 '>
                <Link to={'/'} className='hover:text-secondary duration-200' onClick={() => setIsHamMenuActive(false)}>Home</Link>
              </li>
              <li className='mx-5 relative'>
                <span 
                className='hover:text-secondary duration-200 cursor-pointer'
                onClick={() => setToggleCategories(prevState => !prevState)}
                >Categories 
                  <FiChevronDown  className={`inline align-center ml-1 transition-all duration-200 ${toggleCategories ? 'rotate-180' : ''}`}/>
                </span>
                <div className={`md:absolute leading-10 ml-8 py-3 transition-all duration-200 bg-accent w-max md:ml-0 md:py-4 md:px-10 md:rounded ${toggleCategories ? '' : 'hidden'}`}>
                  {
                    categories.map(c => (
                      <Link 
                      to={`/category/${c}`} 
                      key={c} 
                      className='transition-all hover:ml-2 hover:text-secondary cursor-pointer block'
                      onClick={() => {setIsHamMenuActive(false); setToggleCategories(false)}}
                      >{c}</Link>
                    ))
                  }
                </div>
              </li>
              <li className='mx-5'>
                <Link to={'/products'} className='hover:text-secondary duration-200' onClick={() => setIsHamMenuActive(false)}>Products</Link>
              </li>
            </ul>
            <Link to={'/cart'} className='fixed bottom-5 right-5  p-3 shadow-xl rounded-full bg-accent md:static md:text-primary md:p-0'><BsCart3 /></Link>
          </nav>
          {/* burger menu */}
          <div className={'cursor-pointer md:hidden z-20'} onClick={() => setIsHamMenuActive(prevState => !prevState)}>
            <div className={`w-8 h-0.5 my-1.5 bg-primary rounded-full transition-all origin-center ${isHamMenuActive ? 'rotate-45 mb-[-10px]' : ''}`}></div>
            <div className={`w-8 h-0.5 my-1.5 bg-primary rounded-full transition-all ${isHamMenuActive ? 'opacity-0' : ''}`}></div>
            <div className={`w-8 h-0.5 my-1.5 bg-primary rounded-full transition-all origin-center ${isHamMenuActive ? 'rotate-[-45deg] mt-[-6px]' : ''}`}></div>
          </div>
        </div>
      </header>
  )
}

export default Navbar