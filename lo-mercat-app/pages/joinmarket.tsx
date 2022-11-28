import type { NextPage } from 'next'

import JoinMarket from '../src/components/molecules/joinMarket/JoinMarket';
import ViewJoinMarket from '../src/components/molecules/joinMarket/ListMarket';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';

import {useTranslations} from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';

import { prisma } from '../lib/prisma';

export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const market = await prisma.market.findMany();
    const join = await prisma.stand.findMany({
        where: {
            farmer: {
                id: '1',
            },
        },
        include:{
            market: true,

        }
    });
    // Pass data to the page via props
    return { props: { market, join,messages: (await import(`../messages/${context.locale}.json`)).default,
    isMobile: isMobile(context.req) }  }
}

const joinMarketPage: NextPageWithLayout = ({ props, market, join }: any) => {
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
            <JoinMarket market={market}{...props} />
            <ViewJoinMarket join={join}{...props} />
        </Grid>
    );
}

joinMarketPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}

export default joinMarketPage;