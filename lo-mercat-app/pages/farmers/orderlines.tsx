import type { NextPage } from 'next'

import ViewOrder from '../../src/components/molecules/viewFarmerOrder/ViewOrder';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';

import { useTranslations } from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';
import { Quantico } from '@next/font/google';

export async function getServerSideProps(context: NextPageContext) {
    // Fetch data from external API
    //const res = await fetch('http://localhost:3000/api/hello')
    // const data = {};
    const session = await getSession(context);
    const farmerOrder = await prisma.orderLine.findMany({
        where: {
            stock: {
                farmer: {
                    id: session.farmer.id,
                }
            },
        },
        select: {
            stock: {
                select: {
                    product: true,
                    quantity:true,
                },
            },
            quantity: true,
            cost: true,
            order: {
                select: {
                    id:true,
                    completed: true,
                    purchase: {
                        select: {
                            id:true,
                            customer: {
                                select: {
                                    name: true,
                                }
                            }
                        }
                    }
                }
            }

        },
    })



    // Pass data to the page via props
    return {
        props: {
            farmerOrder, messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    }
}

const farmerOrderPage: NextPageWithLayout = ({ props, farmerOrder }: any) => {

    console.log("cristian")
    console.log(farmerOrder)
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '100vh' }}
        >
            <ViewOrder farmerOrder={farmerOrder}{...props} />
        </Grid>
    );
}

farmerOrderPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default farmerOrderPage;