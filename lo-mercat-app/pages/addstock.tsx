import type { NextPage } from 'next'

import AddProductForm from '../src/components/molecules/productStock/AddProductStock';

import { prisma } from '../lib/prisma';

export async function getServerSideProps() {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const product = await prisma.product.findMany();
    console.log(product);
    // Pass data to the page via props
    return { props: { product } }
}

const AddProductStockPage: NextPage = ({product,session}:any) => {
    console.log({session});
    return (
        <div>
            <AddProductForm product={product}/>
        </div>
    );
}

export default AddProductStockPage;