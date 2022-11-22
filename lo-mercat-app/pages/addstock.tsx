import type { NextPage } from 'next'
import styled from '@emotion/styled'

import AddProductForm from '../src/components/molecules/productStock/AddProductStock';
import { PrismaClient } from '@prisma/client';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';


const prisma = new PrismaClient();

export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const product = await prisma.product.findMany();
    console.log(product);
    // Pass data to the page via props
    return {
        props: {
            product, messages: (await import(`../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    }
}

const AddProductStockPage: NextPage = ({ product, session,props}: any) => {
    console.log({ session });
    return (
        <div>
            <AddProductForm product={product}{...props} />
        </div>
    );
}

export default AddProductStockPage;