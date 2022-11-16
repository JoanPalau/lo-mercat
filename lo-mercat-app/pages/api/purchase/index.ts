import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient} from '@prisma/client';
import { updateOrCreate } from '../api_utils';
const prisma = new PrismaClient();

export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    let created_at = req.body.created_at as string;
    let customerId = req.body.customerId as string;
    let purchase = null;
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'POST':
            let val : any = {
                created_at,
                customerId,
            }; 
            // Update or create data in your database
            purchase = await prisma.purchase.create({
                data: val
            }
            );

            res.status(200).json(purchase)
            break
        
        case 'GET':
            // Get Stands
            let findpurchase = await prisma.purchase.findMany();
            
            console.log("GET");
            res.status(200).json(findpurchase)
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}