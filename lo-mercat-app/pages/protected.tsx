import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea, CircularProgress } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';
import Image from 'next/image';
import Loader from "react-loader-spinner";

import Router from "next/router";

import { useTranslations } from 'next-intl';
import { isMobile } from "@common/DeviceDetection";
import { NextPageContext } from "next/types";
import { color } from "@mui/system";

interface Props {
  children: React.ReactNode;
}


export async function getServerSideProps(context: NextPageContext) {
  return {
    props: {
      messages: (await import(`../messages/${context.locale}.json`)).default,
      isMobile: isMobile(context.req)
    }
  };
}

const Protected: NextPageWithLayout = ({ children } : any,props): JSX.Element => {
  const { status, data: session } = useSession();
  const isMobile = { props };
  const t = useTranslations("Protected");
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
  if (status === "authenticated" && session.farmer)
    Router.replace("/farmers/home");
 
  Router.replace("/customers/home");
};


Protected.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
      {page}
      </Layout>
  )
}
export default Protected;



