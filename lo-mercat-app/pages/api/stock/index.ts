import type { NextApiRequest, NextApiResponse } from 'next'
import { updateOrCreate } from '../api_utils';

import { prisma } from '../../../lib/prisma';


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req
    let productId = req.body.product_id as string;
    let farmerId = req.body.farmer_id as string;
    let unitSelected = req.body.unitSelected as string;
    let Quantity: number = + (req.body.quantity as string);
    let Cost: number = + (req.body.cost as string);
    let stock = null;
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'GET':
            // Get Stands
            stock = await prisma.stock.findMany();

            console.log("GET");
            res.status(200).json(stock);
            break
        case 'POST':
        case 'PATCH':
            // Update or create data in your database
            stock = await updateOrCreate({
                schema: prisma.stock,
                where: {
                    farmerId,
                    productId,
                },
                update: {
                    quantity: Quantity,
                    cost: Cost,
                    stockType: unitSelected,
                },
                create: {
                    quantity: Quantity,
                    cost: Cost,
                    farmerId,
                    productId,
                    stockType: unitSelected,
                },
            }
            );
            res.status(200).json(stock);
            break
        case 'DELETE':
            // Update or create data in your database
            let findstock = await prisma.stock.findFirst({
                where: {
                    farmerId,
                    productId,
                },
            }
            );
            if (findstock != null) {
                stock = await prisma.stock.delete({
                    where: {
                        id: findstock.id,
                    },
                }
                );

            }
            console.log("REMOVE");
            res.status(204).json({});
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}