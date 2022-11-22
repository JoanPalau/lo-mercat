import styled from '@emotion/styled';
import { useTranslations } from 'next-intl';
import { useForm, SubmitHandler } from "react-hook-form";
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
    let currentFarmer = "1";
    let x = await fetch(
        '/api/stock/',
        {
            body: JSON.stringify({
                product_id: data.productSelected,
                farmer_id: currentFarmer,
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
    const onSubmit: SubmitHandler<Inputs> = data => {
        setStock(data).then(
            (res) => { window.location.href = '/protected' },
            (res) => { console.log("error") }
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
                        <label htmlFor="Quantity1">{t("labquantity")}</label>
                    </div>
                    <div className='col-auto col-sm-4'>
                        <input placeholder={t("placeholderquantity")} className="form-control" {...register("quantity", { required: true, pattern: /^[0-9]+$/i })} />
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.quantity && t("err")}
                    </div>
                </div>
                <div className='row g-3 mt-0'>
                    <div className='col-auto col-sm-4'>
                        <label htmlFor="Cost1">{t("labcost")}</label>
                    </div>
                    <div className='col-auto col-sm-4'>
                        <input className="form-control" placeholder={t("placeholdercost")}{...register("cost", { required: true, pattern: /^[0-9]+$/i })} />
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.cost && t("err")}
                    </div>
                </div>
                <div className='row g-3 mt-0'>
                    <div className='col-auto col-sm-4'>
                        <label htmlFor="exampleFormControlSelect1">{t("selector")}</label>
                    </div>
                    <div className='col-auto'>
                        <select className="form-control" {...register("productSelected", { required: true })}>{results}</select>
                    </div>
                    <div className='col-auto col-sm-4'>
                        {errors.productSelected && t("err")}
                        <Link href="/addproduct">{t("addprod")}</Link>
                    </div>
                    <input type="submit" value={t("button")} className="btn-primary" />
                </div>
            </form>
        </MyDiv >
    );
}

export default AddProductForm;