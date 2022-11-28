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
import RegisterForm from '../../src/components/molecules/register/RegisterForm';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';


export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    };
}

const RegisterFormPage: NextPageWithLayout = ({props}:any) => {
    
    const isMobile = {props};
    const t = useTranslations("Signup");
    
    const { status, data: session } = useSession();
    const context = useContext(UserContext);
    return (
        <div>
            <RegisterForm />
        </div>
    );

    return <div> {t("loading")}</div>
}

RegisterFormPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default RegisterFormPage;
