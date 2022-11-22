import { ReactElement } from 'react'

import { GetStaticPropsContext } from 'next';

import Layout from '@common/Layout';
import type { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

const DataProtection: NextPageWithLayout = () => {
  return (
    <div>
      Hello World Data Protection!
    </div>
  )
}

DataProtection.getLayout = function getLayout(page: ReactElement) {
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

export default DataProtection;