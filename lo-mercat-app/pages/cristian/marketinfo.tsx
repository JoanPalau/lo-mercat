import type { NextPage } from 'next'
import styled from '@emotion/styled'

import MarketList from '../../src/components/deprecated/marketInfo/MarketList';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps() {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const markets = await prisma.market.findMany();
    console.log(markets);
    // Pass data to the page via props
    return { props: { markets } }
}

const MarketPage: NextPage = ({markets}:any) => {

    return (
        <div>
            <MarketList markets={markets} />
        </div>
    );
}

export default MarketPage;