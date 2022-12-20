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
  if (status === "authenticated" && session.customer != null)
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
        <div>
        <p>
          <Card sx={{
              display: 'block',
              transitionDuration: '0.3s',
          }}>
            <CardActionArea>
              <Link href="/customers/order-history">
                <Image src={"/historial.svg"} alt="" width={280} height={150} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Order
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Take a look at your Order History!!
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
              <Link href="/customers/purchase-history">
                <Image src={"/purchasesHistory.svg"} alt="" width={280} height={150} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Purchases History
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Take a look at your history of purchases!!
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
                  <Image src={"/buyFlow.svg"} alt="" width={265} height={150} />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Current buy
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Come to buy your local Products!!
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
              <Link href="/customers/search">
                <CardContent>
                  <Image src={"/search.svg"} alt="" width={265} height={150} />
                </CardContent>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                  Search
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Want to find something?
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