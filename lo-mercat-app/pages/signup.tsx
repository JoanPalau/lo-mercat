import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "./_app";
import {useTranslations} from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import { PrismaClient } from '@prisma/client';
import RegisterForm from '../src/components/molecules/register/RegisterForm';

const prisma = new PrismaClient();

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            messages: (await import(`../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    };
}

export default function SignupPage(props: NextPage) {
    
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