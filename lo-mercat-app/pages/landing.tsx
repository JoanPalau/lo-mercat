import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '../src/common/Link';

import {useTranslations} from 'next-intl';
import { NextPage } from 'next';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';


export async function getServerSideProps(context: NextPageContext) {

    return {
        props: {
            isMobile: isMobile(context.req)
        }
    };
}

export default function Landing(props: NextPage) {

  const isMobile = {props};
  console.log(isMobile);

  const t = useTranslations("Home");

  return (
      <Container maxWidth="lg">
        <Box
          sx={{
            my: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'normal',
            alignItems: 'normal'
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            {t("hello")}
          </Typography>


          <Typography variant="h4" component="h1" gutterBottom>
            Live data
          </Typography>


          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          
        </Box>
      </Container>
  );
}