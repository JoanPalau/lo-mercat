import { NextPageContext } from 'next';
import { useTranslations } from 'next-intl';
import { FormEventHandler, ReactElement, useState } from 'react';

import Router from 'next/router';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import DeleteIcon from '@mui/icons-material/Delete';

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

import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';

import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

import { useDispatch, useSelector } from "react-redux";

import getApiUrl from '@common/ApiRouteResolver';
import { Dialog, DialogTitle } from '@mui/material';

type CustomPurchase = {
  id: number,
  created_at: string,
  orders: CustomOrder[]
  total: {
    amount: number,
    amounttax:number,
    currency: string
  }
}

type CustomOrder = {
  id: number,
  stand: number,
  total: {
    amount: number,
    amounttax:number,
    currency: string
  },
  orderLines: CustomOrderLine[]
}

type CustomOrderLine = {
  id: number,
  quantity: number,
  product: {
    id: number,
    name: string
  },
  total: {
    amount: number,
    amounttax:number,
    currency: string
  },
}

type Props = {
  messages: object
  purchase: CustomPurchase
}
var cupon;

export async function getServerSideProps(context: NextPageContext) {

  const baseUrl = getApiUrl(context);
  const purchase = {
    total: {
      amount: 28.00,
      amounttax:33.60,
      currency: "€"
    },
    orders: [
      {
        id: 0,
        completed: false,
        total: {
          amount: 18.00,
          amounttax:21.60,
          currency: "€"
        },
        orderLines: [
          {
            id: 0,
            quantity: '3',
            product: {
              id: '3',
              name: 'Potatoe'
            },
            total: {
              amount: 15.00,
              amounttax:18.00,
              currency: "€"
            }
          },
          {
            id: 1,
            quantity: '1',
            product: {
              id: '2',
              name: 'Apple'
            },
            total: {
              amount: 3.00,
              amounttax:3.60,
              currency: "€"
            }
          }
        ],
        stand: '1'
      },
      {
        id: 1,
        completed: false,
        total: {
          amount: 10.00,
          amounttax:12.00,
          currency: "€"
        },
        orderLines: [
          {
            id: 3,
            quantity: '2',
            product: {
              id: '1',
              name: 'Kiwi'
            },
            total: {
              amount: 10.00,
              amounttax:12.00,
              currency: "€"
            }
          }
        ],
        stand: '2'
      }
    ]
  }

  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
      purchase: purchase
    }
  };
}

export const Purchase: NextPageWithLayout<Props> = (props: Props) => {

  const t = useTranslations('Purchase');

  const steps = [
    t('checkout'),
    'Payment Method',
    t('pay'),
    t('summary')
  ]

  const dispatch = useDispatch();

  const [purchase, setPurchase] = useState(props.purchase);
  const [activeStep, setActiveStep] = useState(0);
  const [open, setOpen] = useState(new Set<number>());

  const [showDialog, setShowDialog] = useState(false);

  const [selectedOrderLine, setSelectedOrderLine] = useState([]); // order.id, orderLine.id

  const sendPurchaseOrder = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      const res = await fetch('/api/notification', options);
    } catch(err) {
      console.log(ErrorEvent)
    }
  }

  const sendPushNotification = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      const res = await fetch('/api/notification', options);
    } catch(err) {
      console.log(ErrorEvent)
    }
  }

  const handleOpenClose = (id: number) => {
    const openCopy = new Set(open);
    open.has(id) ? openCopy.delete(id) : openCopy.add(id);
    setOpen(openCopy);
  }
  const [coupon, setCoupon] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(event.target.value);
  };

  const handleNext = () => {
    if (activeStep == steps.length - 2) {
      sendPushNotification();
    }
    if (activeStep == steps.length - 1) {
      Router.push('/customers/home');
      

    }
    setOpen(new Set());
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlePrevious = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  }

  const openDialog = (orderId: number, lineId: number) => {
    setSelectedOrderLine([orderId, lineId]);
    handleDialogDisplay();
  }

  const handleDialogDisplay = () => {
    setShowDialog(!showDialog);
  }

  const renderDialog = () => {
    return (
      <Dialog open={showDialog} onClose={handleDialogDisplay} >
        <DialogTitle>{t('confirmation-dialog')}</DialogTitle>
        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
          <Button color="secondary" onClick={handleDialogDisplay}>{t('cancel')}</Button>
          <Button color="error" onClick={() => removeOrderLine(selectedOrderLine[0], selectedOrderLine[1])}>{t('confirm')}</Button>
        </Stack>
      </Dialog>
    );
  } 

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleNext();
  };

  const removeOrderLine = (orderId: number, lineId: number) => {
    const updatedPurchase = Object.assign({}, purchase);
    updatedPurchase.orders.map(order => {
      if (order.id === orderId) {
        const orderLines = order.orderLines.filter(orderLine => orderLine.id !== lineId);
        order.orderLines = orderLines;
        order.total.amount = orderLines.reduce((acc, line) => acc + line.total.amount, 0);
      }
      return order;
    });

    updatedPurchase.orders = updatedPurchase.orders.filter(order => order.total.amount > 0);

    updatedPurchase.total.amount = props.purchase.orders.reduce((acc, order) => acc + order.total.amount, 0);
    setPurchase(updatedPurchase);
    handleDialogDisplay();
  }

  const renderPaymentMethod = () => {
    return (
      <Stack component="form" direction="column" onSubmit={handleSubmit}
      justifyContent="center"
      alignItems="center" spacing={2} sx={{ marginTop: "1.5rem", width: "inherit", marginBottom: "4.5rem" }}>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">{t("payment-method")}</FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            defaultValue="Visa"
          >
            <FormControlLabel value="Visa" control={<Radio />} label="Visa" />
            <FormControlLabel value="MasterCard" control={<Radio />} label="MasterCard" />
            <FormControlLabel value="AmericanExpress" control={<Radio />} label="AmericanExpress" />
            <FormControlLabel value="PayPal" control={<Radio />} label="PayPal" />
          </RadioGroup>
        </FormControl>
        <Stack sx={{ position: "fixed", bottom: "200px", width: "40%", marginBottom: "4rem !important" }}>
        <Typography
            variant="h6"
            component="h1"
            gutterBottom>
              By clicking this button you agree to pay the bill directly at the market stand:
          </Typography>
            <Button variant="contained" onClick={() => {handleNext(); handleNext()}}>
              {'Pay Directly with cash'}
            </Button>
        </Stack>
        <Stack sx={{ position: "fixed", bottom: "0px", width: "90%", marginBottom: "4rem !important" }}>
          <Stack direction="row-reverse"
            justifyContent="flex-start" sx={{ width: "inherit", maxWidth: "90%" }}>
            <Button variant="contained" onClick={handleNext}>
              {'Siguiente'}
            </Button>
            <Button color="secondary" onClick={handlePrevious}>
              {'Cancel'}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    )
  }

  const renderPayment = () => {
    return (
      <Stack component="form" direction="column" onSubmit={handleSubmit}
        justifyContent="center"
        alignItems="center" spacing={2} sx={{ marginTop: "1.5rem", width: "inherit", marginBottom: "4.5rem" }}>
        <TextField
          required
          id="outlined-required"
          label="Card Number"
        />
        <TextField
          required
          id="outlined-required"
          label="CVV"
        />
        <TextField
          required
          id="outlined-required"
          label="Card Owner"
        />
        <Stack sx={{ position: "fixed", bottom: "0px", width: "85%", marginBottom: "4rem !important" }}>
          <Stack direction="row-reverse"
            justifyContent="flex-start" sx={{ width: "inherit", maxWidth: "90%" }}>
            <Button variant="contained" type='submit' >
              {'Pay'}
            </Button>
            <Button color="secondary" onClick={handlePrevious}>
              {'Cancel'}
            </Button>
          </Stack>
        </Stack>
      </Stack >
    );
  }

  const renderList = () => {
    return (
      <>
        <List>
          {
            purchase.orders.map((order: CustomOrder) => {
              return renderItem(order);
            })
          }
        </List>
        <Stack direction="row"
          justifyContent="flex-end"
          alignItems="center">
          <Typography
            variant="h6"
            component="h1"
            gutterBottom>
            {t('total', { amount: purchase.total.amount, currency: purchase.total.currency })}
          </Typography>
        </Stack>
        <Stack direction="row"
          justifyContent="flex-end"
          alignItems="center">
          <Typography
            variant="h6"
            component="h1"
            gutterBottom>
              {t('totaltax', { amount: purchase.total.amounttax, currency: purchase.total.currency })}
          </Typography>
        </Stack>
        <TextField
          label="Coupon"
          value={coupon}
          onChange={handleChange}
        />
        
      </>
    )
    
  }

  const renderItem = (order: CustomOrder) => {
    return (
      <>
        <ListItemButton key={order.id + '_1'} divider onClick={() => handleOpenClose(order.id)}>
          <ListItemIcon>
            {open.has(order.id) ? <ExpandMore /> : <ExpandLess />}
          </ListItemIcon>
          <ListItemText
            primary={t('title', { id: order.id })}
            secondary={order.stand} />
          <ListItemSecondaryAction>
            <ListItemText primary={t('subTotal', { amount: order.total.amount, currency: order.total.currency })} />
          </ListItemSecondaryAction>
        </ListItemButton>
        <Collapse key={order.id + '_2'} in={open.has(order.id)} timeout="auto" unmountOnExit>
          <List component="div" dense disablePadding >
            {
              order.orderLines.map((orderLine: CustomOrderLine) => {
                return (
                  <ListItem key={orderLine.id} 
                    secondaryAction={
                      <ListItemText primary={t('lineTotal', { amount: orderLine.total.amount, currency: orderLine.total.currency })} />
                    }
                  >
                    {
                      activeStep === 0 ?
                        <ListItemButton sx={{width: "56px", marginRight:"1"}} onClick={() => openDialog(order.id, orderLine.id)}>
                          <ListItemIcon>
                            <DeleteIcon sx={{ "&:hover": { color: "red" } }} />
                          </ListItemIcon>
                        </ListItemButton>
                        :
                        <ListItemIcon />
                    }
                    <ListItemText
                      primary={orderLine.product.name}
                      secondary={t('quantity', {quantity: orderLine.quantity})} />
                    <ListItemText />
                    <ListItemText />
                    <ListItemText />
                  </ListItem>
                )
              })
            }
          </List>
          <Divider />
        </Collapse>
      </>
    )
  };

  return (
    <>
      {renderDialog()}
      <Stack component="article" sx={{ marginTop: "5rem" }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {
          activeStep === 1 ? renderPaymentMethod() :
            activeStep === 2 ? renderPayment() : renderList()
        }
      </Stack>
      <Stack sx={{ position: "fixed", bottom: "0px", marginBottom: "4rem", width: "inherit", maxWidth: "inherit" }}>
        <Stack direction="row" flexDirection="row-reverse" sx={{ width: "inherit", maxWidth: "90%" }} >
          {
            activeStep !== 2 && activeStep !== 1 && activeStep < steps.length ?
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? t('finish') : t('next')}
              </Button> :
              null
          }
        </Stack>
      </Stack>
    </>
  )
}

Purchase.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Purchase;