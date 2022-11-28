import type { NextPage } from 'next'
import styled from '@emotion/styled'

import MarketList from '@components/molecules/marketInfo/MarketList';
import { PrismaClient } from '@prisma/client';
import { useTranslations } from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import { UserContext } from "../pages/_app";

const prisma = new PrismaClient();
const Myh1 = styled.h1`
text-align:center;
`;

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

const MarketSelector: NextPage = ({ markets,props }: any) => {

    const isMobile = {props};
    const t = useTranslations("MarketSelector");
    return (
        <div>
            <Myh1>{t("select")}</Myh1>
            <MarketList markets={markets}{...props} />
        </div>
    );
}

export default MarketSelector;