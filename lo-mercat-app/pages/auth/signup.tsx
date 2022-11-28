import { ReactElement } from "react";

import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import RegisterForm from '../../src/components/molecules/register/RegisterForm';
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
