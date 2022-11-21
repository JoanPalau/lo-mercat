import type { NextPage } from 'next'
import styled from '@emotion/styled'
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import MarketList from '../../src/components/molecules/marketInfo/MarketList';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const markets = await prisma.market.findMany();
    console.log(markets);
    // Pass data to the page via props
    return {
        props: {
            markets, messages: (await import(`../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    }
}

const MarketPage: NextPage = ({ markets,props }: any) => {

    return (
        <div>
            <MarketList markets={markets}{...props} />
        </div>
    );
}

export default MarketPage;