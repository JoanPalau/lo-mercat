import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "./_app";
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';

import AddProduct from '../src/components/molecules/addProduct/AddProduct';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const product = await prisma.product.findMany();
    
    
    return { props: { product,messages: (await import(`../messages/${context.locale}.json`)).default,
    isMobile: isMobile(context.req) } }
}

const AddProductPage: NextPage = ({props}:any) => {
    const { status, data: session } = useSession();
    const context = useContext(UserContext);
    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status]);

    if (status === "authenticated")
        return (
            <div>
                <AddProduct props={props}/>
            </div>
        );

    return <div>loading</div>;
}

export default AddProductPage;