import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import MarketList from '@components/molecules/marketInfo/MarketList';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';

import { prisma } from '../../lib/prisma';

export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const markets = await prisma.market.findMany();
    console.log(markets);
    // Pass data to the page via props
    return {
        props: {
            markets, messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    }
}

const MarketPage: NextPageWithLayout = ({markets,props}:any) => {
    return (
        <div>
            <MarketList markets={markets}{...props} />
        </div>
    );
}

MarketPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
        {page}
        </Layout>
    )
}


export default MarketPage;