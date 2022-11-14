import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { updateOrCreate } from '../api_utils';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req

    let Name = req.body.name as string;
    let Customby = req.body.customby as string;
    
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'PUT':
            // Update or create data in your database
            let product = await updateOrCreate({
                schema: prisma.product,
                where: {
                    name:Name,
                    custombyFarmerId:Customby,
                },
                update: {
                },
                create: {
                    name:Name,
                    custombyFarmerId:Customby,
                },
            }
            );

            res.status(200).json({ product })
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}