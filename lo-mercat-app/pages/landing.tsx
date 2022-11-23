import { NextPage, NextPageContext } from 'next';
import {useTranslations} from 'next-intl';
import { ReactElement } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { isMobile } from '@common/DeviceDetection';
import BaseLayout from '@components/layouts/BaseLayout';

export async function getServerSideProps(context: NextPageContext) {
    return {
        props: {
            messages: (await import(`../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    };
}

export default function Landing(props: NextPage) {

  const isMobile = {props};
  const t = useTranslations("Landing");

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
            {t("motivation")}
          </Typography>          
        </Box>
      </Container>
  );
}

Landing.getLayout = function getLayout(page: ReactElement) {
  return (
    <BaseLayout>
      {page}
    </BaseLayout>
  )
}