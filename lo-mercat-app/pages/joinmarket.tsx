import type { NextPage } from 'next'
import styled from '@emotion/styled'

import { PrismaClient } from '@prisma/client';
import JoinMarket from '../src/components/molecules/joinMarket/JoinMarket';
import ViewJoinMarket from '../src/components/molecules/joinMarket/ListMarket';
import {useTranslations} from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';

const prisma = new PrismaClient();

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

    console.log(join);
    // Pass data to the page via props
    return { props: { market, join,messages: (await import(`../messages/${context.locale}.json`)).default,
    isMobile: isMobile(context.req) }  }
}

const joinMarketPage: NextPage = ({ props,market,join }: any) => {
    return (
        <div>
            <JoinMarket market={market}{...props} />
            <ViewJoinMarket join={join}{...props} />
        </div>
    );
}

export default joinMarketPage;