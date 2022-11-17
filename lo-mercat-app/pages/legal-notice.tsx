import { ReactElement } from 'react'

import { GetStaticPropsContext } from 'next';

import { NextPageWithLayout } from '../src/types/NextPageWithLayout';

const LegalNotice: NextPageWithLayout = () => {
  return (
    <div>
      Hello World LegalNotice
    </div>
  )
}

export default LegalNotice;

LegalNotice.getLayout = function getLayout(page: ReactElement) {
  return (
    <div>
      Encapuslated page
      {page}
    </div>
  )
}

export async function getStaticProps({locale}: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../messages/${locale}.json`)).default
    }
  };
}