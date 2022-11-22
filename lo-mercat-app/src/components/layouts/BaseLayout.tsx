import { ReactElement } from 'react';
import { useTranslations } from 'next-intl';

import Link from '@common/Link';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const BaseLayout = (props: { children: ReactElement }) => {
  const t = useTranslations("Landing");

  return (
    <Stack>
      <Container component="main" sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {props.children}
        <img src="/landing-ilustration.png" alt="logo" />
      </Container>
      <Container component="footer" sx={{
        position: 'fixed',
        bottom: 0,
        backgroundColor: '#1F211C',
        height: '20vh',
      }}>
        <Stack sx={{
          textAlign: 'center',
          paddingTop: '1.5rem'
        }} spacing={2}>
          <Button fullWidth variant="contained" size='large' href="auth/signUp">
            {t("SignUp")}
          </Button>
          <Typography color="whitesmoke">
            {t("text")}
            <Link href="auth/signIn">{t("SignIn")}</Link>
          </Typography>
        </Stack>
      </Container>
    </Stack>
  )
}

export default BaseLayout;