import React, { useEffect, useState } from 'react'
import {BsSearch, BsCart3} from 'react-icons/bs';
import {FiChevronDown} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useSearchContext } from '../context/context';
import lunr from 'lunr';

const Navbar = (props) => {
  const {searchTerm, setSearchTerm} = useSearchContext();
  const {isHamMenuActive, setIsHamMenuActive, toggleCategories, setToggleCategories, categories, data} = props;
  const [isSearching, setIsSearching] = useState(false);
  const [searchedItems, setSearchedItems] = useState([]);

  console.log(searchTerm)
   // client side searching use lunr.js...
   let idx = lunr(function () {
    const documents = data;
    this.ref('id');
    this.field('title');

    documents.forEach(doc => {
      this.add(doc);
    }, this)
  });

  const searchedOutput = idx.search(`${searchTerm} ${searchTerm}* ${searchTerm}~1`);
  console.log(searchedOutput);

  function listSearchItems(e) {
    const { value } = e.target;
    setIsSearching(true);
    setSearchTerm(value);
    console.log(data, searchTerm);
  }

  // this section needs to be done...
  useEffect(() => {
    const timer = setTimeout(() => {
    const filteredData = data.filter(d => searchedOutput.some(s => s.ref == d.id));
    
    /** imperative way **/
    // let filteredData = [];
    // for (let i = 0; i < searchedOutput.length; i ++) {
    //   for (let j = 0; j < data.length; j ++) {
    //     if (searchedOutput[i].ref == data[j].id ) {
    //       filteredData.push(data[j]);
    //       break;
    //     }
    //   }
    // }
    setSearchedItems(filteredData);
    }, 300)

    return () => clearTimeout(timer);
  }, [searchTerm]);

  console.log(searchedItems)

  function hideSearchResults() {
    // setting set time out so that Link actually works before closing the search results container...
    setTimeout(() => {
      setIsSearching(false);
    },250)
  }

  const searchedResults = searchedItems.map(si => {

    return (
      <Link to={`/products/${si.id}`} key={si.id} className='z-50'>
        <li key={si.id} className='cursor-pointer hover:bg-secondary p-5'>
            {si.title}
        </li>
      </Link>
    )
  })
  return (
    <header className='w-full py-5 px-5 md:px-10 bg-accent text-primary '>
        {/* space-x-3 for horizontal space between the flex-box items of 3units and 10units for the medium and large screen sizes... */}
        <div className='flex items-center justify-between max-w-screen-xl mx-auto space-x-3 md:space-x-10 '> 
          <Link to={'/'} className="logo text-bold text-xl md:text-2xl z-20">Online <span className='text-secondary'>Store</span></Link>

          <form action="" className="search-form relative text-base w-200 flex-1 z-20">
            <input 
              type="text" 
              className='text-accent py-2 px-3 rounded w-full outline-none bg-primary'
              placeholder='Search here...'
              onClick={(e) => e.preventDefault()}
              onChange={(e) => listSearchItems(e)}
              onBlur={hideSearchResults}
              value={searchTerm}
            />
            <button type="submit" className='absolute top-3 right-3 text-accent '>
              <BsSearch/>
            </button>
            {/* search result box */}
            {isSearching && <div className='bg-primary w-screen md:w-full h-auto absolute z-40 text-accent rounded my-1 max-h-[360px] overflow-y-auto'>
              {
              searchedItems.length === 0 ? <h3 className='text-center py-5'>No results...</h3>
              :
              <ul>
                {searchedResults}
              </ul>
              }
            </div>}
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
                <Link to={'/all-products'} className='hover:text-secondary duration-200' onClick={() => setIsHamMenuActive(false)}>Products</Link>
              </li>
            </ul>
            <Link to={'/cart'} className='fixed bottom-5 right-5  p-3 shadow-xl rounded-full bg-accent md:static md:text-primary md:p-0 z-30'><BsCart3 /></Link>
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