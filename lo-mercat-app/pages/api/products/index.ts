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
    let Customby = req.body.farmerId as string;
    let id = req.body.id as string;
    
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'GET':
            let products = await prisma.product.findMany();
            
            console.log("GET");
            res.status(200).json(products)
            break
        case 'POST':
        case 'PATCH':
            let product = await updateOrCreate({
                schema: prisma.product,
                where: {
                    id: id,
                    farmerId:Customby,
                },
                update: {
                    name:Name,
                    farmerId:Customby,
                },
                create: {
                    name:Name,
                    farmerId:Customby,
                },
            }
            );

            res.status(200).json(product)
            break
        case 'DELETE':
            res.status(204).json({})
            break
        default:
            prisma.product.delete({
                where: {
                    id
                }
            })
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}