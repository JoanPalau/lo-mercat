import AddProductForm from '@components/molecules/productStock/AddProductStock';
import ViewProductStock from '@components/molecules/productStock/ViewProductStock';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';

export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const session= await getSession(context);
    const product = await prisma.product.findMany();
    
    const stocks = await prisma.stock.findMany({
        where: {
            farmer: {
                id: session.farmer.id,
            },
        },
        include:{
            product:true
        }
    });
    
    // Pass data to the page via props
    return {
        props: {
            product,stocks, messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req),
        }
    }
}

const AddProductStockPage: NextPageWithLayout = ({ product, stocks,props}: any) => {
    // console.log({ session });
    return (
        <div>
            <AddProductForm product={product}{...props} />
            <ViewProductStock stock={stocks}{...props}/>
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