import Image from 'next/image'
import arrow from "../public/assets/icons/arrow-right.svg"
import Searchbar from '@/components/SearcheBar'
import HeroCarousel from '@/components/HeroCarosal'
import { getAllProducts } from '@/lib/actions'
import ProductCard from '@/components/ProductCard'

const Home = async()=>{
  const allProducts = await getAllProducts();
  return (
    <>
   <section className='px-16 md:px-20 py-24 border-2 border-red-700'>
        <div className='flex max-xl:flex-col gap-16'>
          <div className='flex flex-col gap-6 justify-center'>
            <p className='small-text'>Smart Shooping starts here
            <Image
               src={arrow}
               alt='arrow'
               height={16}
               width={16}
                />
            </p>
                <h1 className='head-text'>unLeash the power <span className='text-primary'>Price Wise</span></h1>
                <p className="mt-6">
              Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
            </p>
            <Searchbar />
          </div>
           <HeroCarousel /> 
        </div>
   </section>
     <section className="trending-section">
     <h2 className="section-text">Trending</h2>

     <div className="flex flex-wrap gap-x-8 gap-y-16">
       {allProducts?.map((product) => (
         <ProductCard  key={product._id} product={product} />
       ))}
     </div>
   </section> 
   </>
  )
}


export default Home