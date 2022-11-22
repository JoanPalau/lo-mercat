import type { NextPage } from 'next'
import styled from '@emotion/styled'

import AddProductForm from '../src/components/molecules/productStock/AddProductStock';
import { PrismaClient } from '@prisma/client';
import { Grid } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';

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

const AddProductStockPage: NextPageWithLayout = ({product,session}:any) => {
    console.log({session});
    return (
            <AddProductForm product={product}/>
    );
}

AddProductStockPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default AddProductStockPage;