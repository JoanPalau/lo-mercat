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
    let farmerId = farmer_id as string;
    let marketId = market_id as string;
    let stand = null;
    console.log('XXXXXXXXXXX');
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'PUT':
            
            console.log('HOLAAAAAAAAAAAAAAAAAAAAAAAAAAA');
            // Update or create data in your database
            stand = await updateOrCreate({
                schema: prisma.stand,
                where: {
                    farmerId,
                    marketId,
                },
                update: {
                },
                create: {
                    farmerId,
                    marketId
                },
            }
            );

            res.status(200).json({ stand })
            break
        case 'DELETE':
            console.log('adeuuuuuuuuuuuuuuuuuuuuuuuuu');
            // Update or create data in your database
            let findstand = await prisma.stand.findFirst({
                where: {
                    farmerId,
                    marketId,
                },
            }
            );
            if(findstand!=null){
                stand = await prisma.stand.delete({
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