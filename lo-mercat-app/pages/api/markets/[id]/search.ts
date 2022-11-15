import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req

    let productName = req.body.productName as string;
    
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    
    switch (method) {
        case 'GET':
            // let stock = prisma.stock.findMany({
            //     where: {
            //         product: {
            //             name: productName
            //         }
            //     }
            // })

            let stock2 = prisma.stock.findMany();
            res.status(200).json(stock2);
            break
            default:  
                res.setHeader('Allow', ['GET'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    }