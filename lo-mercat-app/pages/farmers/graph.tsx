import type { NextPage } from 'next'

import ViewOrder from '../../src/components/molecules/viewFarmerOrder/ViewOrder';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid, ToggleButtonGroup, ToggleButton } from '@mui/material';
import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';
import { ReactElement } from 'react';

import { useTranslations } from 'next-intl';
import { isMobile } from '@common/DeviceDetection';
import { NextPageContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { prisma } from '../../lib/prisma';
import { Quantico } from '@next/font/google';
import { faker } from '@faker-js/faker';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
import React from 'react';


  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );


  

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
                },
            },
            quantity: true,
            cost: true,
            created_at: true,
            market: {
                select: {
                    name: true
                }
            },
        },
    })



    // Pass data to the page via props
    return {
        props: {
            farmerOrder: JSON.stringify(farmerOrder),
            messages: (await import(`../../messages/${context.locale}.json`)).default,
            isMobile: isMobile(context.req)
        }
    }
}

const GraphPage: NextPageWithLayout = ({ props, farmerOrder }: any) => {
    farmerOrder = JSON.parse(farmerOrder);
    let markets:Set<string> = new Set();
    const [byMarket, setbyMarket] = React.useState(true);
    const [alignment, setAlignment] = React.useState('Market');

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
      ) => {
        setbyMarket(newAlignment == "Market");
        setAlignment(newAlignment);
      };
    
    for(let i = 0; i < farmerOrder.length; i++){
        let line = farmerOrder[i];
        if (byMarket) { 
            markets.add(line.market.name);
        } else {
            markets.add(line.stock.product.name);
        }
    }
    let marketsL = Array.from(markets);
    let title = byMarket ? 'Ingresos por año y mercado' : 'Ingresos por año y producto';
      
    const options = {
    indexAxis: 'y' as const,
    maintainAspectRatio: false,
    plugins: {
        title: {
        display: true,
        text: title,
        },
    },
    responsive: true,
    scales: {
        x: {
        stacked: true,
        },
        y: {
        stacked: true,
        },
    },
    };
    
    // const labels = [ "January", "February", "March", "April", "May", "June",
    // "July", "August", "September", "October", "November", "December" ];
    //const labels = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    //"Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];
    const labels = [ "2011", "2012", "2013", "2014", "2015", "2016",
    "2017", "2018", "2019", "2020", "2021", "2022"]

    let colors = [
        'rgb(255, 99, 132)',
        'rgb(75, 192, 192)',
        'rgb(53, 162, 235)',
        'rgb(221,160,221)',
    ]
    let datasets = [];

    for(let i = 0; i < marketsL.length; i++) {
        let value = [];
        for(let j = 0; j < labels.length; j++){
            value.push(0);
        }
        for(let j = 0; j < farmerOrder.length; j++){
            let line = farmerOrder[j];
            let compareLine = "";
            if (byMarket) { 
                compareLine = line.market.name;
            } else {
                compareLine = line.stock.product.name;
            }
            if (compareLine == marketsL[i]) {
                let monthId = (new Date(line.created_at)).getMonth();
                value[monthId] += line.cost;
            }
        }
        datasets.push(
            {
                label: marketsL[i],
                data: value,
                backgroundColor: colors[i % colors.length],
            }
        )
    }
    
    const data = {
        labels,
        datasets: datasets,
      };
    

    console.log(datasets);
    return (
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh', maxHeight: '550px' }}
        >
            <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
            >
            {    
            /*<ToggleButton value="Market">Mercado</ToggleButton>
            <ToggleButton value="Product">Producto</ToggleButton>*/
            }
            </ToggleButtonGroup>
            <Bar options={options} data={data} height={550} width={380} />
        </Grid>
    );
}

GraphPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}

export default GraphPage;