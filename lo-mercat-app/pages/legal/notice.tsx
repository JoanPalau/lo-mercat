import { ReactElement } from 'react'

import { GetStaticPropsContext } from 'next';

import Layout from '@common/Layout';
import type { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

const LegalNotice: NextPageWithLayout = () => {
  return (
    <div>
      Hello World LegalNotice
    </div>
  )
}

LegalNotice.getLayout = function getLayout(page: ReactElement) {
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

export default LegalNotice;