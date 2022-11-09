import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "./_app";

import AddProduct from '../components/molecules/addProduct/AddProduct';
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

const AddProductPage: NextPage = () => {
    const { status, data: session } = useSession();
    const context = useContext(UserContext);
    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status]);

    if (status === "authenticated")
        return (
            <div>
                <AddProduct />
            </div>
        );

    return <div>loading</div>
}

export default AddProductPage;