import { ReactElement, useEffect } from 'react';
import { NextPageContext } from 'next';
import { useSession } from "next-auth/react";
import Router from "next/router";

import { isMobile } from '@common/DeviceDetection';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import Layout from '@common/Layout';
import AddProduct from '@components/molecules/addProduct/AddProduct';
import { prisma } from '../../lib/prisma';



export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const product = await prisma.product.findMany();


    return {
        props: {
            product, messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    }
}

const AddProductPage: NextPageWithLayout = ({ props }: any) => {
    const { status, data: session } = useSession();
    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status]);

    if (status === "authenticated")
        return (
            <div>
                <AddProduct props={props} />
            </div>
        );

    return <div>loading</div>;
}

AddProductPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default AddProductPage;