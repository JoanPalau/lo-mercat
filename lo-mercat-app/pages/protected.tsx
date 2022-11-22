import { Grid, Link } from "@mui/material";
import { useSession } from "next-auth/react";
// import Link from "next/link";
import Router from "next/router";
import React, { FC, useContext, useEffect } from "react";
import { UserContext } from "./_app";
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


interface Props {
  children: React.ReactNode;
}

const Protected: FC<Props> = ({ children}): any => {
  const { status, data:session } = useSession();
  const context = useContext(UserContext);
  console.log(context);

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/auth/signin");
  }, [status]);

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
        Hola {session.user?.name}
        <p>
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
        </p>
        <p>
          <Card sx={{
              display: 'block',
              transitionDuration: '0.3s',
          }}>
            <CardActionArea>
              <Link href="/addstock">
                <Image src={"/farmer-info.svg"} alt="" width={280} height={150} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Join to a Market
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
        </Grid>
      </Layout>
    );
  return <div>loading</div>
};

export default Protected;