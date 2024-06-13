import { Product } from '../../../interfaces/Product'
import AddToCartBtn from '../Buttons/AddToCartBtn'

interface ProductCardProps {
    product:Product
}
const ProductCard = ({product}:ProductCardProps) => {
    const {title,price,image,rating,category} = product
  return (
    <>
      <div className="mb-5 block rounded-lg border border-gray-200 shadow-md overflow-hidden">
        <div className='w-full h-[65%]'>
          <img
            src={image}
            alt={title}
            className="rounded shadow w-full h-full object-fit"
          />
        </div>
        <div className="flex flex-col justify-center items-start p-5 ">
          <div className='h-[3rem] overflow-hidden mb-2'>
            <h2 className="text-lg text-blue-800 font-semibold whitespace-pre-line">{title}</h2>
          </div>
          <p className="text-lg mb-2">{category}</p>
         
          <p className='flex gap-1 text-lg text-amber-400'>
            <img src='/star.svg' alt='rate' className='w-[1.5rem] h-[1.5rem]'/>
            {rating.rate}</p>
            <div className='w-full flex justify-between items-center'>
            <p className='basis-3/4 text-lg text-black-400 font-[600]'>${price}</p>
            <AddToCartBtn product={product} />
            </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard