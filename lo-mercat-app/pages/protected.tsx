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

const base64ToUint8Array = (base64:string) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const Protected: NextPageWithLayout = ({ children } : any,props): JSX.Element => {
  const { status, data: session } = useSession();
  const isMobile = { props };
  const t = useTranslations("Protected");
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
  const sessionDefined = session == undefined;
  useEffect(() => {
    if (session == undefined || session.farmer == null) {
      return;
    }
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // run only in browser
      navigator.serviceWorker.ready.then(reg => {
        reg.pushManager.getSubscription().then(sub => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)
      })
    }
  }, [sessionDefined])

  if (session != undefined && session.farmer != null) {
    const subscribe = async () => {
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
      })

      setSubscription(sub)
      setIsSubscribed(true)
      console.log('web push subscribed!')
      console.log(sub)
      
      await fetch('/api/farmers/' + session.farmer.id + '/register_notification', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          subscription: sub
        })
      })
      Router.replace("/farmers/home")
    }
    if (registration != null && !isSubscribed) {
      subscribe();
    }
  }
  if (status === "authenticated")

    return (
      <Layout>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <p>Hello, {session.user.name} we are going to redirect you!!</p>
          <p><CircularProgress /></p>
        </div>
      </Layout>
    );
    
  }
  else if(status === "authenticated" && session.customer){
    Router.replace("/customers/home");
    return(
      <Layout>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
          <p>Hello, {session.user.name} we are going to redirect you!!</p>
          <p><CircularProgress /></p>
        </div>
      </Layout>
    );
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



