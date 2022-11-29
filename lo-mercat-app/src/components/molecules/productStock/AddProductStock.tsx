import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from 'next/dist/server/api-utils';
// import Link from 'next/link';
import { Typography, Link, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import React from 'react';
import { useSession } from 'next-auth/react';

const MyDiv = styled.div`

margin: auto;
width: 50%;
padding: 10px;

`;

type Inputs = {
    quantity: number,
    cost: number,
    productSelected: string,
};

async function setStock(data: any, session: any) {
    console.log(data);
    let x = await fetch(
        '/api/stock/',
        {
            body: JSON.stringify({
                product_id: data.productSelected,
                farmer_id: session.farmer.id,
                quantity: data.quantity,
                cost: data.cost,
            }),
            headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', }),
            method: 'POST'
        }
    )
    //console.log(x);
}

const AddProductForm = ({ product, props }: any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const isMobile = { props };
    const t = useTranslations("AddStock");
    const { status, data:session } = useSession();
    const onSubmit: SubmitHandler<Inputs> = data => {
        setStock(data, session).then(
            (res) => { window.location.href = '/addstock' },
            (res) => { console.log("error") }
        )
    }
    const results: any = [];
    let def:string = '';

    product.forEach((product: any) => {
        results.push(
            <MenuItem value={product.id}>{product.name}</MenuItem>
        );
        if (def == ''){
            def = product.id;
        }
    });
    console.log(def)

    const [sel, setSel] = React.useState(def);


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
        >
            <Typography variant="h3">Set Stock</Typography>
            <Box sx={{ mx: 'auto', height: 20 }}/>
            <Typography variant="h5">{t("labquantity")}</Typography>
            <div className='col-auto col-sm-4'>
                <TextField variant="filled" placeholder={t("placeholderquantity")} className="form-control" {...register("quantity", { required: true, pattern: /^[0-9]+$/i })} />
            </div>
            <Box sx={{ mx: 'auto', height: 20 }}/>
            <div className='col-auto col-sm-4'>
                {errors.quantity && t("err")}
            </div>
            <Typography variant="h5">{t("labcost")}</Typography>
                <div className='col-auto col-sm-4'>
                    <TextField variant="filled" className="form-control" placeholder={t("placeholdercost")} {...register("cost", { required: true, pattern: /^[0-9]+$/i })} />
                </div>
                <div className='col-auto col-sm-4'>
                    {errors.cost && t("err")}
                </div>
            <Box sx={{ mx: 'auto', height: 20 }}/>
            <Typography variant="h5">Select Product</Typography>
            <Select
 {...register("productSelected", { required: true })} label={t("selector")} >{results}</Select>
            <Box sx={{ mx: 'auto', height: 40 }}/>
            <div className='row g-3 mt-0'>
                <Grid container spacing={2}>
                    <Button type="submit" variant="outlined">
                        {errors.productSelected && t("err")}
                        <Link href="/addproduct">{t("addprod")}</Link>
                    </Button>
                    <Box sx={{ mx: 'auto', width: 20 }}/>
                    <Button type="submit" variant="contained">
                        {t("button")}
                    </Button>
                </Grid>
            </div>
        </Grid>
        </form>
    );
}

export default AddProductForm;