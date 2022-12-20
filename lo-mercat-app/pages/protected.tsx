import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
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
      //messages: (await import(`../messages/${context.locale}.json`)).default,
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

  if (session != undefined && session.farmer != null) {
    Router.replace("/farmers/home")
  }
  if (session != undefined && session.farmer != null) {

    return (
      <Layout>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <p>Hello, {session.user.name} we are going to redirect you!!</p>
          <p><CircularProgress /></p>
        </div>
      </Layout>
    );
    
  }
  else if(status === "authenticated" && session != undefined && session.customer != null){
    Router.replace("/customers/home");
    return(
      <Layout>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <p>Hello, {session.user.name} we are going to redirect you!!</p>
          <p><CircularProgress /></p>
        </div>
      </Layout>
    );
  } else {
    return <Layout>
            <p><CircularProgress /></p>
        </Layout>
  }
};


Protected.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
      {page}
      </Layout>
  )
}
export default Protected;



