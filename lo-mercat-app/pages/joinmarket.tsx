import type { NextPage } from 'next'

import JoinMarket from '../src/components/molecules/joinMarket/JoinMarket';
import ViewJoinMarket from '../src/components/molecules/joinMarket/ListMarket';

import { prisma } from '../lib/prisma';

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
        <div>
            <JoinMarket market={market} />
            <ViewJoinMarket join={join} />
        </div>
    );
}

export default joinMarketPage;