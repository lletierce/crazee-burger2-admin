import { useState } from 'react';
import PageLayout from '../layouts/PageLayout';
import Card from '../reusable-ui/card/Card';
import {DEFAULT_GENERATED_MENU} from '../../enums/menu'

type ProductType2 = {
        id: string;
        imageSource: string;
        title: string;
        price: number;
        quantity: number;
        isAvailable: boolean;
        isPublicised: boolean;
}


export default function ProductsPage() {
  
  const [menu, setMenu] = useState<ProductType2[]>(DEFAULT_GENERATED_MENU)

  // TODO: manage when menu is empty
  
  // affichage
  return (
    <PageLayout>
      <div className='
          my-6
          grid 
          grid-cols-[repeat(auto-fit,minmax(180px,1fr))]
          gap-6
          md:grid-cols-[repeat(auto-fit,minmax(300px,1fr))] 
          md:gap-12
         justify-items-center
         overflow-y-clip
          '>
        {menu.map(({title})=>{
          return (
            <Card title={title}/>
          )
        })}
      </div>
    </PageLayout>
  )


}
