import type { NextPage } from 'next'
import { useSession } from "next-auth/react";
import Router from "next/router";
import  { useEffect } from "react";

import AddProduct from '../src/components/molecules/addProduct/AddProduct';

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

const AddProductPage: NextPage = () => {
    const { status, data: session } = useSession();
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