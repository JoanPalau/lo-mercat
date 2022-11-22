import { ReactElement } from 'react'

import { GetStaticPropsContext } from 'next';

import { Typography } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

type Props = {
  messages: {
    CookiesPolicy: {
      title: string,
      intro: string,
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

const CookiesPolicy: NextPageWithLayout<Props> = (props) => {

  const { messages } = props;
  const t = messages["CookiesPolicy"];

  return (
    <>
    <section>
      <Typography align='justify' gutterBottom={true} paragraph={true} variant="body1">{t["intro"]}</Typography>
    </section>
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

CookiesPolicy.getLayout = function getLayout(page: ReactElement) {
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

export default CookiesPolicy