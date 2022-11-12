import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
import { updateOrCreate } from '../api_utils';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { name, customby },
        method,
    } = req

    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'PUT':
            let Name = name as string;
            let Customby = customby as string;
            
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