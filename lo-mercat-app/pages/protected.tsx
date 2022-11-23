import { Box, Grid, Link } from "@mui/material";
import { useSession } from "next-auth/react";
// import Link from "next/link";
import React, { FC, useContext, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import marketstock from '/Marketplace-bro.png';
import Image from 'next/image';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';

import Router, { useRouter } from "next/router";

import { UserContext } from "./_app";
import { useTranslations } from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';

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
  const context = useContext(UserContext);
  const router = useRouter();
  const isMobile = { props };
  const t = useTranslations("Protected");
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
  console.log(status);
  if (status === "authenticated")
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
        { t("txtrole")} {session.user?.name}
        <Card sx={{
            display: 'block',
            transitionDuration: '0.3s',
        }}>
          <CardActionArea>
            <Link href="/addstock">
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
              <Link href="/joinmarket">
                <Image src={"/farmer-info.svg"} alt="" width={280} height={150} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  {t("farmermanager")}
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
              <Link href="/cristian/marketinfo">
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
              <Link href="https://http.cat/203">
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
  return <div>{t("loading")}</div>
};


Protected.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
      {page}
      </Layout>
  )
}
export default Protected;



