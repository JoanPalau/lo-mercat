import { NextPageContext } from 'next';
import { useTranslations } from 'next-intl';
import { FormEventHandler, ReactElement, useState } from 'react';


import { Order } from '@prisma/client';
import { prisma } from '../../lib/prisma';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import Autocomplete from '@mui/material/Autocomplete';

import Layout from '@common/Layout';
import { NextPageWithLayout } from '@customTypes/NextPageWithLayout';

import { selectSearchState, setFiltersState, setResultState } from "../../redux/slices/searchSlice";
import { useDispatch, useSelector } from "react-redux";

import getApiUrl from '@common/ApiRouteResolver';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl, { formControlClasses } from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


type Props = {
  messages: object
  products: ParsedProduct[]
}
type MyProduct = {
  product: {
    id: string,
    name: string,
    farmerId: any
  }
}

type ParsedProduct = {
  id: string,
  label: string
}

export async function getServerSideProps(context: NextPageContext) {

  const baseUrl = getApiUrl(context);
  const simplified = true;

  const stands_req = await fetch(`${baseUrl}/api/markets/1/stands/?simplified=${simplified}`);
  const products_req = await fetch(`${baseUrl}/api/markets/1/products/?simplified=${simplified}`);

  const stands = await stands_req.json();
  const products: MyProduct[] = await products_req.json();

  const parsedProducts: ParsedProduct[] = products.map(
    (product: MyProduct) => {
      const result: { id: string | undefined, label: string } = { id: undefined, label: '' };
      result["id"] = product.product.id;
      result["label"] = product.product.name
      return result;
    });

  return {
    props: {
      messages: (await import(`../../messages/${context.locale}.json`)).default,
      products: parsedProducts
    }
  };
}

export const Search: NextPageWithLayout<Props> = (props: Props) => {

  const t = useTranslations('Search');
  const [product, setProduct] = useState("");
  const [typeSearch, setTypeSearch] = useState("product");
  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const searchState = useSelector(selectSearchState);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    let formData = new FormData(e.currentTarget)
    for (let [key, value] of Array.from(formData.entries())) {
      if (key === "typeSearch" && value === "product") {
        searchProduct();
      }
    }
  };

  const searchProduct = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ "productName": product })
    }
    try {
      const req = await fetch('/api/markets/1/search/', options);
      const res = await req.json();
      setItems(res);
    } catch (err) {
      console.log(ErrorEvent)
    }
  }

  const renderItem = (item: { id: string, product: { name: string }, quantity: number, farmerId: number }) => {
    return (
      <ListItem key={item.id}>
        <ListItemText
          primary={item.product.name}
          secondary={t('quantity', { quantity: item.quantity })} />
        <ListItemText
          primary={t('farmer', { id: item.farmerId })} />
      </ListItem>
    );
  }

  return (

    <Stack component="article" sx={{ marginTop: "5rem" }}>
      <Stack component="form" justifyContent="flex-start" onSubmit={handleSubmit}>

        <Stack direction="row" justifyContent="space-evenly" alignItems="center">
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">{t('search-type')}</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={typeSearch}
              name="typeSearch"
            >
              <FormControlLabel value="product" control={<Radio />} label={t("product")} />
              <FormControlLabel value="stand" control={<Radio />} label={t("stand")} />
            </RadioGroup>
          </FormControl>

          <Autocomplete
            disablePortal
            id="search"
            onChange={(event, value: { id: string, label: string }) => {
              setProduct(value.label);
            }}
            options={props.products}
            sx={{ width: 300 }}
            filterOptions={(x) => x}
            renderInput={(params) => <TextField {...params} label={t("products")} />}
          />
        </Stack>

        <Button variant="contained" type='submit'>{t('apply-filter')}</Button>
      </Stack>

      <Stack sx={{ paddingTop: "2rem" }}>

        <Typography
          variant="h6"
          component="h1"
          gutterBottom >

          {t('results')}
        </Typography>

      </Stack>

      <List>
        {
          items.length > 0 ? items.map(
            item => {
              return renderItem(item);
            }
          ) : <Stack justifyContent="center" textAlign="center" sx={{ paddingTop: "2rem" }}>{t('empty')}</Stack>
        }

      </List>








    </Stack>
  )
}

Search.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}

export default Search;