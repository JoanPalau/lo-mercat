import type { NextPage } from 'next'
import styled from '@emotion/styled'

import MarketList from '../../components/molecules/marketInfo/MarketList';
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




const Marketinfo = ({ markets }: any) => {
    let name = markets[0].id;
    const results: any = []
    markets.forEach((markets: any) => {
        results.push(
            <div key={markets.id}>
                name: {markets.name}
                location: {markets.location}
                schedule: {markets.schedule}
                <hr />
            </div>,
        );
    });

    return (
        <div>
            {results}
        </div>
    );
}

export default Marketinfo;