import type { NextPage } from 'next'
import { isMobile } from '@common/DeviceDetection';
import ViewProduct from '../../../src/components/molecules/viewProduct/ViewProduct';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getServerSideProps(context:any) {
  const { id } = context.query;
  const res = await fetch("/api/markets/" + id + "/product")
  const market = await prisma.market.findFirst({
    where: { id: id }
  });
  const data = await res.json()

  console.log(data);

  if (!data) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      data, market, messages: (await import(`../../../messages/${context.locale}.json`)).default,
      isMobile: isMobile(context.req)
    }, // will be passed to the page component as props
  }
}


const ViewproductmarketPage: NextPage = ({ data, market, props }: any) => {

  console.log(data);
  return (
    <div>
      <ViewProduct product={data} market={market}{...props} />
    </div>
  );
}

export default ViewproductmarketPage;