import { ReactElement } from "react";

import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import RegisterForm from '../../src/components/molecules/register/RegisterForm';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { useSession } from "next-auth/react";
import Router from "next/router";
import CircularProgress from "@mui/material/CircularProgress";


export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    };
}

const RegisterFormPage: NextPageWithLayout = ({props}:any) => {
    const { status, data: session } = useSession();
    if (session != null) {
        Router.replace("/protected");
        return(
        <Layout>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <p>Hello, {session.user.name} we are going to redirect you!!</p>
            <p><CircularProgress /></p>
            </div>
        </Layout>
        );
    }
    return (
        <div>
            <RegisterForm />
        </div>
    );
}

RegisterFormPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default RegisterFormPage;
