import { NextPageContext } from 'next';
import { useTranslations } from 'next-intl';
import { ReactElement, useState } from 'react';


// import { Purchase } from '@prisma/client';
// import { prisma } from '../../lib/prisma';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';

import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

type CustomPurchase = {
  id: number,
  created_at: string,
  orders: CustomOrder[]
  total: {
    amount: number,
    currency: string
  }
}

type CustomOrder = {
  id: number,
  stand: number,
  total: {
    amount: number,
    currency: string
  }
}

type Props = {
  messages: object,
  purchases: CustomPurchase[]
}

export async function getServerSideProps(context: NextPageContext) {

  // TODO: cannot be serialized!
  //const purchases = await prisma.purchase.findMany();
  const purchases = [
    {
      id: 1,
      created_at: '23/11/2022',
      orders: [
        {
          id: 1,
          stand: 5,
          total: {
            amount: 15.99,
            currency: '€'
          }
        }
      ],
      total: {
        amount: 15.99,
        currency: '€'
      }
    },
    {
      id: 2,
      customer_id: 1,
      created_at: '23/11/2022',
      orders: [
        {
          id: 2,
          stand: 12,
          total: {
            amount: 12.99,
            currency: '€'
          }
        },
        {
          id: 3,
          stand: 10,
          total: {
            amount: 9.99,
            currency: '€'
          }
        }
      ],
      total: {
        amount: 22.98,
        currency: '€'
      }
    }
  ]


  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
      purchases
    }
  };
}

export const PurchaseHistory: NextPageWithLayout<Props> = (props: Props) => {

  const [open, setOpen] = useState(new Set<number>());

  const handleOpenClose = (id: number) => {
    const openCopy = new Set(open);
    open.has(id) ? openCopy.delete(id) : openCopy.add(id);
    setOpen(openCopy);
  }

  const t = useTranslations('PurchaseHistory');

  const { purchases } = props;

  const renderItem = (purchase: CustomPurchase) => {
    return (
      <>
        <ListItemButton key={purchase.id + '_1'} divider onClick={() => handleOpenClose(purchase.id)}>
          <ListItemIcon>
            {open.has(purchase.id) ? <ExpandMore /> : <ExpandLess /> }
          </ListItemIcon>
          <ListItemText
            primary={t('title', { id: purchase.id })}
            secondary={purchase.created_at} />
          <ListItemSecondaryAction>
            <ListItemText primary={t('total', { amount: purchase.total.amount, currency: purchase.total.currency })} />
          </ListItemSecondaryAction>
        </ListItemButton>
        <Collapse key={purchase.id + '_2'} in={open.has(purchase.id)} timeout="auto" unmountOnExit>
          <List component="div" dense disablePadding >
            {
              purchase.orders.map((order: CustomOrder) => {
                return (
                  <ListItem key={order.id} secondaryAction={
                    <ListItemText primary={t('subtotal', { amount: order.total.amount, currency: order.total.currency })} />
                  }>
                     <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText 
                      primary={t('stand', {stand_id: order.stand})} 
                      secondary={t('order', {order_id: order.id})} />
                  </ListItem>
                )
              })
            }
          </List>
          <Divider />
        </Collapse>
      </>
    );
  }

  return (
    <Stack component="article">
      <Typography variant="h6" component="h1" gutterBottom>{t('header')}</Typography>
      <List>
        {
          purchases.map((purchase: CustomPurchase) => {
            return renderItem(purchase);
          })
        }
      </List>
    </Stack>
  )
}

PurchaseHistory.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default PurchaseHistory;