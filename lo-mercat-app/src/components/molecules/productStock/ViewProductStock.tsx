import styled from '@emotion/styled';
import Image from 'next/image';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';


import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';



async function removeStock(data: any, session: any) {
    console.log(data);
    let x = await fetch(
        '/api/stock/',
        {
            body: JSON.stringify({
                "farmer_id": session.farmer.id,
                "product_id": data.product.id
            }),
            headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', }),
            method: 'DELETE'
        }
    )
    //console.log(x);
}


const ViewProductStock = ({ stock, props }: any) => {
    const results: any = []
    const { status, data: session } = useSession();
    const rem: any = (data: any) => {
        removeStock(data, session).then(
            (res) => { window.location.href = '/addstock' },
            (res) => { console.log("error") }
        )
    }

    console.log(stock);
    stock.forEach((stock: any) => {
        results.push(
            <li className="list-group-item" >
                <Grid
                    container
                    spacing={0}
                >
                    {stock.product.name} {stock.quantity}kg {stock.cost}€/kg
                    <Box sx={{ mx: 'auto', width: 4 }} />
                    <Button variant="contained" color='error' onClick={(data) => rem(stock)}>
                        remove
                    </Button>
                </Grid>
                <Box sx={{ mx: 'auto', height: 10 }} />
            </li>
        );

    });


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h2>Active Stock:</h2>
            <ul className="list-group">{results} </ul>
        </div>
    );
}

export default ViewProductStock;