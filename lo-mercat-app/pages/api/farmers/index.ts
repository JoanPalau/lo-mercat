import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../../lib/prisma';

export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { },
        method,
    } = req
    
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query) + " and body " + JSON.stringify(req.body));
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'GET':
            let farmers = await prisma.farmer.findMany();
            console.log("GET");
            res.status(200).json(farmers);
            break
        case 'DELETE':
            let deleted = await prisma.farmer.delete({
                where: {
                    id: req.body.id
                }
            });
            res.status(204);
            break
        case 'POST':
            
            res.status(200).json({ 'todo' : 'todo' })
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}