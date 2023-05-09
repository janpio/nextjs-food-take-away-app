import { TSFoodMenuItem } from '@/ts/interfaces'
import Image from 'next/image'

export const CartItem = ({
  id,
  image,
  name,
  category,
  price,
  quantity,
  itemTotal,
}: TSFoodMenuItem) => {
  return (
    <article className="w-full text-base">
      <div className="flex flex-row justify-between items-center my-1 bg-primaryPink">
        <div className="relative min-h-[3rem] min-w-[3rem] w-3/12 ">
          <Image
            src={`/foodImages/${image}`}
            fill
            style={{ objectFit: 'cover' }}
            alt={name}
            quality={30}
            sizes="(max-width: 600px) 50px, 100px"
          />
        </div>

        <p className="text-white w-5/12 break-words m-1 pl-2">{name}</p>
        <p className="text-white w-2/12 m-1 text-center">{quantity}</p>
        <p className="text-white w-2/12 m-1">{itemTotal?.toFixed(2)}</p>
      </div>
    </article>
  )
}
