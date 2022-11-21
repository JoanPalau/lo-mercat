import styled from '@emotion/styled';
import Image from 'next/image';
import { useTranslations } from 'next-intl';


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
            headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', }),
            method: 'POST'
        }
    )
    console.log(x);
}

const AddProductForm = ({props}:any) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();

    const isMobile = {props};
    const t = useTranslations("AddProduct");
    const onSubmit: SubmitHandler<Inputs> = data => {
        setStock(data).then(
            (res) => { window.location.href = '/addstock' },
            (res) => { console.log("error") }
        )
    }
    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <MyDiv>
            <form onSubmit={handleSubmit(onSubmit)} className='row g-3'>
                <div className='col-auto'>
                    <label htmlFor="Name1">{t("productname")}</label>
                </div>
                <div className="col-auto">
                    <input className="form-control" placeholder={t("placeholder")} {...register("name", { required: true, pattern: /^[A-Za-z]+$/i })} />
                </div>
                <div className="col-auto">
                    {errors.name && t("productname")}
                </div>
                <input type="submit" value={t("button")} className="btn-primary" />
            </form >
        </MyDiv >
    );
}

export default AddProductForm;