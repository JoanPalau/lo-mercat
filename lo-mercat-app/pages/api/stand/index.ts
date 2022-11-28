import type { NextApiRequest, NextApiResponse } from 'next'
import { updateOrCreate } from '../api_utils';

import { prisma } from '../../../lib/prisma';


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    let farmerId = req.body.farmerId as string;
    let marketId = req.body.marketId as string;
    let location = req.body.location as string;
    let stand = null;
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'POST':
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
                    marketId,
                    location
                },
            }
            );

            res.status(200).json( stand )
            break
        case 'DELETE':
            // Update or create data in your database
            console.log(req.body.location);
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
            res.status(204).json({});
            break
        case 'GET':
            // Get Stands
            let findstands = await prisma.stand.findMany();
            
            console.log("GET");
            res.status(200).json(findstands)
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}