import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { FC, ReactElement, useContext, useEffect } from "react";
import { UserContext } from "../_app";

import AddProduct from '../../src/components/molecules/addProduct/AddProduct';
import {useTranslations} from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import { PrismaClient } from '@prisma/client';
import RegisterForm from '../../src/components/molecules/register/RegisterForm';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

const prisma = new PrismaClient();

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    };
}

const AddProductPage: NextPageWithLayout = ({props}:any) => {
    
    const isMobile = {props};
    const t = useTranslations("Signup");
    
    const { status, data: session } = useSession();
    const context = useContext(UserContext);
    useEffect(() => {
        if (status === "unauthenticated") Router.replace("/auth/signin");
    }, [status]);

    if (status === "authenticated")
        return (
            <div>
                <RegisterForm />
            </div>
        );

    return <div> {t("loading")}</div>
}

AddProductPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default AddProductPage;
