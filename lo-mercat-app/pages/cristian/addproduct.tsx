import type { NextPage } from 'next'
import styled from '@emotion/styled'

import AddProductForm from '../../components/molecules/productStock/AddProductStock';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const product = await prisma.product.findMany();
    console.log(product);
    // Pass data to the page via props
    return { props: { product } }
}

const AddProductPage: NextPage = ({product}:any) => {

    return (
        <div>
            <AddProductForm product={product}/>
        </div>
    );
}

export default AddProductPage;