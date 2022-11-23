import { ReactElement } from 'react'
import { GetStaticPropsContext } from 'next';
import {useTranslations} from 'next-intl';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Layout from '@common/Layout';
import Link from '@common/Link';

import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

type Props = {
    messages: {
        navigation: object
    }
}

const CustomerHome: NextPageWithLayout<Props> = () => {

  const t = useTranslations("CustomerHome");

  return (
      <Container maxWidth="lg">
        <Stack spacing={2}>
            <Link href="/customers/order-history">{t("navigation.orderHistory")}</Link>
            <Link href="/customers/purchase-history">{t("navigation.purchaseHistory")}</Link>
            <Link href="/customers/purchase">{t("navigation.buyFlow")}</Link>
            <Link href="/customers/search">{t("navigation.searchFlow")}</Link>
        </Stack>
      </Container>
  );
}

CustomerHome.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
    return {
      props: {
        messages: (await import(`../../messages/${locale}.json`)).default
      }
    };
}

export default CustomerHome;