import type { NextPage } from 'next'
import styled from '@emotion/styled'

import { PrismaClient } from '@prisma/client';
import JoinMarket from '../src/components/molecules/joinMarket/JoinMarket';
import ViewJoinMarket from '../src/components/molecules/joinMarket/ListMarket';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';

const prisma = new PrismaClient();

export async function getServerSideProps() {
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

    console.log(join);
    // Pass data to the page via props
    return { props: { market, join } }
}

const joinMarketPage: NextPage = ({ market, join }: any) => {
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
            <JoinMarket market={market} />
            <ViewJoinMarket join={join} />
        </Grid>
    );
}

export default joinMarketPage;