import styled from '@emotion/styled';
import Image from 'next/image';
import {Routes, Route, useNavigate} from 'react-router-dom';


import { useForm, SubmitHandler } from "react-hook-form";
import { redirect } from 'next/dist/server/api-utils';
import Link from 'next/link';

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

async function setStock(data: any) {
    console.log(data);
    let currentFarmer = "cla9ub43w000inxerc0mtq95b";
    let x = await fetch(
        '/api/stock/create?product_id=' + data.productSelected + '&farmer_id=' + currentFarmer + '&quantity=' + data.quantity + '&cost=' + data.cost,
        {
            method: 'PUT'
        }
    )
    //console.log(x);
}

const AddProductForm = ({ product }: any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data =>{
    setStock(data).then(
    (res) =>{window.location.href = '/protected'},
    (res) =>{console.log("error")}
    )
    }
    const results: any = []
    product.forEach((product: any) => {
        results.push(
            <option value={product.id}>{product.name}</option>
        );
    });

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <MyDiv>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='row g-3 mt-0'>
                    <div className='col-auto col-sm-4'>
                        <label htmlFor="Quantity1">Quantity</label>
                    </div>
                    <div className='col-auto col-sm-4'>
                        <input placeholder='Enter Quantity' className="form-control" {...register("quantity", { required: true, pattern: /^[0-9]+$/i })} />
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.quantity && "Invalid value, This field is required"}
                    </div>
                </div>
                <div className='row g-3 mt-0'>
                    <div className='col-auto col-sm-4'>
                        <label htmlFor="Cost1">Cost</label>
                    </div>
                    <div className='col-auto col-sm-4'>
                        <input className="form-control" placeholder='Enter Cost'{...register("cost", { required: true, pattern: /^[0-9]+$/i })} />
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.cost && "Invalid value, This field is required"}
                    </div>
                </div>
                <div className='row g-3 mt-0'>
                    <div className='col-auto col-sm-4'>
                        <label htmlFor="exampleFormControlSelect1">Select Product</label>
                    </div>
                    <div className='col-auto'>
                        <select className="form-control" {...register("productSelected", { required: true })}>{results}</select>
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.productSelected && "Invalid value, This field is required"}
                        <Link href="/addproduct">Add A new Product</Link>
                    </div>
                    <input type="submit" className="btn-primary" />
                </div>
            </form>
        </MyDiv >
    );
}

export default AddProductForm;