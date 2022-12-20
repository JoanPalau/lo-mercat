import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';
import Image from 'next/image';

import Router from "next/router";

import { useTranslations } from 'next-intl';
import { isMobile } from "@common/DeviceDetection";
import { NextPageContext } from "next/types";

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
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState(null)
  const [registration, setRegistration] = useState(null)

  const { status, data: session } = useSession();
  const isMobile = { props };
  const t = useTranslations("Protected");
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
  const sessionDefined = session == undefined;
  useEffect(() => {
    if (session == undefined || session.farmer == null) {
      return;
    }
    if (typeof window !== 'undefined') {
      let _window:any = window;
      if ('serviceWorker' in navigator && _window.workbox !== undefined) {
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
    } 
  }, [sessionDefined])
  
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);


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
      console.log('AAAAAAAAAAAAAA')
    }
    if (registration != null && !isSubscribed) {
      subscribe();
    }
  }







  if (status === "authenticated" && session.farmer)
    return (
      <Layout>
          <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
          <Box sx={{ mx: 'auto', height: 20 }}/>
          Hello Again, {session.user.name}
        <Card sx={{
            display: 'block',
            transitionDuration: '0.3s',
        }}>
          <CardActionArea>
            <Link href="/farmers/addstock">
              <Image src={"/add-product.svg"} alt="" width={270} height={150} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Add Stock
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Acces to a page to add stock of a product
                </Typography>
              </CardContent>
            </Link>
          </CardActionArea>
        </Card>
      <div>
      {
        /*
        {t("txtrole")} {session.user?.role}
        <p>
          <Link href="/addstock">{t("farmermanager")}</Link></p>
        <p>
          <Link href="/joinmarket">{t("joinmarket")}</Link></p>
        <p>
          <Link href="/marketselector">{t("startshopping")}</Link>
        </p>
        */
      }
      <p>
          <Card sx={{
              display: 'block',
              transitionDuration: '0.3s',
          }}>
            <CardActionArea>
              <Link href="/farmers/joinmarket">
                <Image src={"/farmer-info.svg"} alt="" width={280} height={150} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Manage Account
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Farmer, come join to one of our market!!
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </p>
        <p>
          <Card sx={{
              display: 'block',
              transitionDuration: '0.3s',
          }}>
            <CardActionArea>
              <Link href="/market/marketinfo">
                <CardContent>
                  <Image src={"/green-market-list.svg"} alt="" width={265} height={150} />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Market List
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Take a look to our markets
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
        </p>
        <p>
          <Card sx={{
              display: 'block',
              transitionDuration: '0.3s',
          }}>
            <CardActionArea>
              <Link href="/farmers/orderlines">
                <CardContent>
                  <Image src={"/graphics.svg"} alt="" width={265} height={150} />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Control Area
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Take a look to your Market Information
                  </Typography>
                </CardContent>
              </Link>
            </CardActionArea>
          </Card>
          </p>
        </div>
        </Grid>
      </Layout>
    );
};


Protected.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
      {page}
      </Layout>
  )
}
export default Protected;