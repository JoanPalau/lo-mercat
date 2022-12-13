import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';
import { updateOrCreate } from '../api_utils';


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    let completed = false;
    let purchaseId = req.body.purchaseId as string;
    let order = null;
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'POST':
            let val: any = {
                purchaseId,
                completed
            };
            // Update or create data in your database
            order = await prisma.order.create({
                data: val
            }
            );

            res.status(200).json(order)
            break
        case 'PATCH':
            order = await prisma.order.update({
                where: {
                    id: req.body.myid
                },
                data:{
                    completed: req.body.completed
                }
            }
            );
            res.status(200).json(order);
            break
        case 'GET':
            // Get Stands
            let findorder = await prisma.order.findMany({
                include: {
                    OrderLine: true,
                }
            });

            console.log("GET");
            res.status(200).json(findorder)
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}