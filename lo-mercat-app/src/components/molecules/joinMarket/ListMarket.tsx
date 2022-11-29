import styled from '@emotion/styled';
import Image from 'next/image';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useTranslations } from 'next-intl';


import { useForm, SubmitHandler } from "react-hook-form";
import { Box, Button, Grid } from '@mui/material';
import { useSession } from 'next-auth/react';


type Inputs = {
    marketSelected: string,
};

async function removeMarket(data: any, session: any) {
    console.log(data);
    let x = await fetch(
        '/api/stand/',
        {
            body: JSON.stringify({
                "farmer_id": session.farmer.id,
                "market_id": data.market.id
            }),
            headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', }),
            method: 'DELETE'
        }
    )
    //console.log(x);
}


const ListMarket = ({ join, props }: any) => {
    const isMobile = { props };
    const t = useTranslations("ListMarket");
    const results: any = []
    const { status, data:session } = useSession();
    const rem: any = (data: any) => {
        removeMarket(data, session).then(
            (res) => { window.location.href = '/farmers/joinmarket' },
            (res) => { console.log("error") }
        )
    }
    join.forEach((join: any) => {
        results.push(
            <li className="list-group-item" >
                <Grid
                container
                spacing={0}
                >
                    {join.market.name} {join.location==null ? "": "Stand:"+join.location }
                    <Box sx={{ mx: 'auto', width: 4 }}/>
                    <Button variant="contained" color='error' onClick={(data) => rem(join)}>
                        {t("remove")}
                    </Button>
                </Grid>
                <Box sx={{ mx: 'auto', height: 10 }}/>
            </li>
        );

    });


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h2>{t("tablename")}</h2>
            <ul className="list-group">{results} </ul>
        </div>
    );
}

export default ListMarket;