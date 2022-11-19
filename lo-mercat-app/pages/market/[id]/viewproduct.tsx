import type { NextPage } from 'next'
import styled from '@emotion/styled'

import ViewProduct from '../../../src/components/molecules/viewProduct/ViewProduct';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getServerSideProps(context :any) {
  const {id}= context.query;
    const res = await fetch("http://localhost:3000/api/markets/"+ id+"/product")
    const market = await prisma.market.findFirst({
      where: {id: id}
    });
    const data = await res.json()
  
    console.log(data);
  
    if (!data) {
      return {
        notFound: true,
      }
    }
    return {
      props: { data ,market}, // will be passed to the page component as props
    }
  }


const ViewproductmarketPage: NextPage = ({ data, market}: any) => {

    console.log(data);
    return (
        <div>
            <ViewProduct product={data} market={market} />
        </div>
    );
}

export default ViewproductmarketPage;