import Link from '@common/Link';
import { ReactElement } from 'react';

import { useTheme } from '@mui/material';
import { useTranslations } from 'next-intl';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


const BaseLayout = (props: { children: ReactElement }) => {
  const theme = useTheme();
  const t = useTranslations("Landing");

  return (
    <Stack>
      <main>
        <picture>
          <Container sx={{
            height: '85vh',
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
        </picture>
      </main>
      <footer>
        <Container sx={{
          position: 'fixed',
          bottom: 0,
          backgroundColor: '#1F211C',
          height: '15vh',
        }}>
          <Stack sx={{
            textAlign: 'center',
            paddingTop: '0.5rem'
          }} spacing={2}>
            <Button fullWidth variant="contained" href="auth/signup">
              {t("SignUp")}
            </Button>
            <Typography sx={{ color: `${theme.palette.common.white}` }}>
              {t("text")}
              <Link href="auth/signin">{t("SignIn")}</Link>
            </Typography>
          </Stack>
        </Container>
      </footer>
    </Stack>
  )
}

export default BaseLayout;