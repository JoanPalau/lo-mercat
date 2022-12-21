import { useTranslations } from 'next-intl';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useSession } from 'next-auth/react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

async function orderDone(data: any, session: any) {
    let res = true;
    if (data.order.completed == true) {
        res = false;
    }
    let x = await fetch(
        '/api/orders/',
        {
            body: JSON.stringify({
                "myid": data.order.id,
                "completed": res,
            }),
            headers: new Headers({ 'Content-Type': 'application/json', Accept: 'application/json', }),
            method: 'PATCH'
        }
    )
    //console.log(x);
}


const ListOrder = ({ farmerOrder, props }: any) => {
    const isMobile = { props };
    const t = useTranslations("ListMarket");
    const results: any = []
    const { status, data: session } = useSession();

    const done: any = (data: any, button: any) => {

        MySwal.fire({
            title: <p>Order: {data.order.id.length >= 19 ? data.order.id.slice(0, 15) + "..." : data.order.id} </p>,
            icon: "info",
            html:
                ' <p>Order Done: <b>' + data.order.completed + '</b><p> ' +
                ' <p>Product: ' + data.stock.product.name + '<p>' +
                ' <p>Quantity: ' + data.quantity + '/' + data.stock.quantity + ' kg<p>' +
                ' <p>Profit: ' + data.cost + '€<p>' +
                ' <p>Costumer: ' + data.order.purchase.customer.name + '<p>',
            showCancelButton: true,
            confirmButtonColor: 'primary',
            confirmButtonText: button,
            cancelButtonText: "Go Back",
            reverseButtons: true,
        }).then((dialog) => {
            if (dialog.isConfirmed) {
                orderDone(data, session).then(
                    (res) => {
                        console.log("success")
                        window.location.href = '/farmers/orderlines'
                    },
                    (res) => { console.log("error") }
                )
            }
        })
    }
    farmerOrder.forEach((farmerOrder: any) => {
        var button = "Order Not Compleated";
        if (farmerOrder.order.completed == false) {
            button = "Order Compleated";
        }
        results.push(
            <li className="list-group-item" >
                <Grid
                    container
                    spacing={0}
                >
                    <p>
                        <b>ID: {farmerOrder.order.id.length >= 10 ? "..." + farmerOrder.order.id.slice(-6) : farmerOrder.order.id}</b>
                    </p>
                    <p>
                        <Box sx={{ mx: 'auto', width: 4 }} />
                        Order {farmerOrder.order.completed == true ? "Done" : "Attending"}
                    </p>
                    <p>
                        <Button variant="contained" color='info' onClick={(data) => done(farmerOrder, button)}>
                            More Info
                        </Button>
                    </p>
                </Grid>
                <Box sx={{ mx: 'auto', height: 10 }} />
            </li>
        );

    });

    return (
        /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
        <div>
            <h2>{farmerOrder.length == 0 ? "NO ORDERS YET :(" : "Order number"}</h2>
            <ul className="list-group">{results} </ul>
        </div>
    );
}

export default ListOrder;