import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { updateOrCreate } from '../api_utils';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { farmer_id, market_id },
        method,
    } = req

    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'DELETE':
            let farmerId = farmer_id as string;
            let marketId = market_id as string;
    
            // Update or create data in your database
            let findstand = await prisma.stand.findFirst({
                where: {
                    farmerId,
                    marketId,
                },
            }
            );
            let stand
            if(findstand!=null){
                stand= await prisma.stand.delete({
                    where: {
                        id:findstand.id,
                    },
                }
                );
    
            }
            console.log("REMOVE");
            res.status(200).json({ stand })
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}