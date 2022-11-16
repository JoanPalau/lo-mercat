import styled from '@emotion/styled';
import Image from 'next/image';

import { useForm, SubmitHandler } from "react-hook-form";

const MyDiv = styled.div`

margin: auto;
margin-top: 20px;
width: 50%;
padding: 10px;

`;

type Inputs = {
    name: string,
};

async function setStock(data: any) {
    console.log(data);
    let currentFarmer = "1";
    let x = await fetch(
        '/api/products/',
        {        
            body: JSON.stringify({
                name: data.name,
                farmerId: currentFarmer,
            }),
            headers:new Headers({ 'Content-Type': 'application/json', Accept: 'application/json',}),
            method: 'POST'
        }
    )
    console.log(x);
}

const AddProductForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = data => {
        setStock(data).then(
        (res) =>{window.location.href = '/addstock'},
        (res) =>{console.log("error")}
        )
        }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <MyDiv>
            <form onSubmit={handleSubmit(onSubmit)} className='row g-3'>
                <div className='col-auto'>
                    <label htmlFor="Name1">Product Name</label>
                </div>
                <div className="col-auto">
                    <input className="form-control" placeholder='Enter Product Name' {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })} />
                </div>
                <div className="col-auto">
                    {errors.name && "Invalid value, This field is required"}
                </div>
                <input type="submit" className="btn-primary" />
            </form >
        </MyDiv >
    );
}

export default AddProductForm;