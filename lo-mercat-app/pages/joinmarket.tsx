import type { NextPage } from 'next'
import styled from '@emotion/styled'

import { PrismaClient } from '@prisma/client';
import JoinMarket from '../components/molecules/joinMarket/JoinMarket';
import ViewJoinMarket from '../components/molecules/joinMarket/ListMarket';

const prisma = new PrismaClient();

export async function getServerSideProps() {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const market = await prisma.market.findMany();
    const join = await prisma.stand.findMany({
        where: {
            farmer: {
                id: 'cla9ub43w000inxerc0mtq95b',
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
        <div>
            <JoinMarket market={market} />
            <ViewJoinMarket join={join} />
        </div>
    );
}

export default joinMarketPage;