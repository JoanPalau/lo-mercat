import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)



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
        
        console.log("REM");
        MySwal.fire({
            title: <p>Are you sure?</p>,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel please!",
            reverseButtons: true,
          }).then((dialog) => {
            if (dialog.isConfirmed){
                removeStock(data, session).then(
                    (res) => { window.location.href = '/farmers/addstock' },
                    (res) => { console.log("error") }
                )
            }
          })
    }

    console.log(stock);
    stock.forEach((stock: any) => {
        results.push(
            <li className="list-group-item" >
                <Box sx={{ mx: 'auto', height: 10 }} />
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
            </li>
        );

    });


    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div style={{ paddingRight: '10%', paddingLeft: '10%' }}>
            <h2>{stock.length == 0 ? "No current stock!":  "Active Stock:"}</h2>
            <ul className="list-group">{results} </ul>
        </div>
    );
}

export default ViewProductStock;