import AddProductForm from '../src/components/molecules/productStock/AddProductStock';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';


import { prisma } from '../lib/prisma';

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
            isMobile: isMobile(context.req),
        }
    }
}

const AddProductStockPage: NextPageWithLayout = ({ product, session,props}: any) => {
    // console.log({ session });
    return (
        <div>
            <AddProductForm product={product}{...props} />
        </div>
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