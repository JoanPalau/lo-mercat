import { NextPageContext } from 'next';
import { useTranslations } from 'next-intl';
import { ReactElement } from 'react';


import { Order } from '@prisma/client';
import { prisma } from '../../lib/prisma';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';


type Props = {
  messages: object,
  orders: Order[]
}

export async function getServerSideProps(context: NextPageContext) {

  // TODO: review what we are returning from Prisma, insuficient data
  const orders = await prisma.order.findMany();

  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
      orders
    }
  };
}

export const OrderHistory: NextPageWithLayout<Props> = (props: Props) => {

  const t = useTranslations('OrderHistory');

  const { orders } = props;

  const renderItem = (order: Order) => {
    return (
      <ListItem divider key={order.id} secondaryAction= {
        <ListItemText primary={t('total', {amount: '15.99', currency: '€'})} />
      }>
        <ListItemText 
          primary={t('title', {number: order.id})} 
          secondary={t('status.text', {status: order.completed ? t('status.completed') : t('status.pending')})} />
      </ListItem>
    );
  }

  return (
    <Stack component="article" style={{ paddingTop: '50px', paddingLeft: '10%', paddingRight: '10%' }}>
      <Typography variant="h6" component="h1" gutterBottom>{t('header')}</Typography>
      <List>
        {
          orders.map( (order: Order) => {
            return renderItem(order);
          })
        }
      </List>
    </Stack>
  )
}

OrderHistory.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default OrderHistory;