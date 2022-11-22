
import { useEffect } from 'react';
import { useRouter } from 'next/router'
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';

import StorefrontIcon from '@mui/icons-material/Storefront';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

export default function Index() {

  const router = useRouter();
  const t = useTranslations("Index");

  const theme = useTheme();

  // Load landing page dynamically on the background
  useEffect(() => {
    router.prefetch('/landing');
  })

  // Automatic redirect to the landing page
  useEffect(() => {
    setTimeout(() => {
      router.push('/landing');
    }, 1000);
  });

  return (
    <Container maxWidth={false} sx={
      {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexFlow: 'column nowrap',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'primary.main'
       }
    }>
      <StorefrontIcon htmlColor={`${theme.palette.background.default}`} titleAccess={t("app")} fontSize='large'/>
      <Typography variant="h5" component="h1" color={`${theme.palette.background.default}`} gutterBottom>
          {t("app")}
        </Typography>
    </Container>
  );
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}
