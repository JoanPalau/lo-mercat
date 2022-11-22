import { ReactElement } from 'react'

import { GetStaticPropsContext } from 'next';

import { Typography } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';


type Props = {
  messages: {
    LegalNotice: {
      intro: [string],
      sections: [
        {
          title: string,
          content: [string]
        }
      ]
      title: string,
      content: [string]
    }
  }
  ,
  context: {}
}

const LegalNotice: NextPageWithLayout<Props> = (props) => {

  const { messages } = props;
  const t = messages["LegalNotice"];

  return (
    <>
      <section>
        {
          t["intro"].map(
            (text: string, index: number) => <Typography key={index} align='justify' gutterBottom={true} paragraph={true} variant="body1">{text}</Typography>
          )
        }
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

LegalNotice.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../messages/${locale}.json`)).default
    }
  };
}

export default LegalNotice;