import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { updateOrCreate } from '../api_utils';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    let farmerId = req.body.farmer_id as string;
    let marketId = req.body.market_id as string;
    let stand = null;
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'PUT':
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
            // Update or create data in your database
            let findstand = await prisma.stand.findFirst({
                where: {
                    farmerId,
                    marketId,
                },
            }
            );
            if (findstand != null) {
                stand = await prisma.stand.delete({
                    where: {
                        id: findstand.id,
                    },
                }
                );

            }
            console.log("REMOVE");
            res.status(200).json({ stand })
            break
        case 'GET':
            // Get Stands
            let findstands = await prisma.stand.findMany();
            
            console.log("GET");
            res.status(200).json({ findstands })
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}