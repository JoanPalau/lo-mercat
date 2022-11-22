import { ReactElement } from 'react'

import { GetStaticPropsContext } from 'next';

import { Typography } from '@mui/material';
import Layout from '@common/Layout';
import type { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

type Props = {
  messages: {
    TermsOfService: {
      sections: [
        {
          title: string,
          content: [string]
        }
      ]
    }
  }
  ,
  context: {}
}

const TermsOfService: NextPageWithLayout<Props> = (props) => {

  const { messages } = props;
  const t = messages["TermsOfService"];

  return (
    <>
    {
        t["sections"].map(
          (section: { title: string, content: [string] }, index: number) => {
            return (
              <section key={index}>
                <Typography variant="h5" component="h2" gutterBottom={true}>
                  {section.title}
                </Typography>
                {
                  section.content.map(
                    (element, index) => <Typography key={index} align='justify' gutterBottom={true} paragraph={true} variant="body1">{element}</Typography>
                  )
                }
              </section>
            );
          }
        )
      }
    </>
  )
}

TermsOfService.getLayout = function getLayout(page: ReactElement) {
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

export default TermsOfService