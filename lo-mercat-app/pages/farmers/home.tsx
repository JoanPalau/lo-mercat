import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
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

const Protected: NextPageWithLayout = ({ children } : any,props): JSX.Element => {
  const { status, data: session } = useSession();
  const isMobile = { props };
  const t = useTranslations("Protected");
  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);
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
};


Protected.getLayout = function getLayout(page: ReactElement) {
  return (
      <Layout>
      {page}
      </Layout>
  )
}
export default Protected;