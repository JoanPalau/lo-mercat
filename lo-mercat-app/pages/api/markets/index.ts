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
    let name = req.body.name as string;
    let location = req.body.location as string;
    let schedule = req.body.schedule as string;
    let type = req.body.type as string;
    let id = req.body.id as string;
    let market = null;
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'POST':
            let val : any = {
                name,
                location,
                schedule,
                type,
            }; 
            // Update or create data in your database
            market = await prisma.market.create({
                data: val
            }
            );

            res.status(200).json(market)
            break
        case 'DELETE':
            // Update or create data in your database
            
                market = await prisma.market.delete({
                    where: {
                        id,
                    },
                }
                );
            console.log("REMOVE");
            res.status(204).json({});
            break
        case 'GET':
            // Get Stands
            let findmarkets = await prisma.market.findMany();
            
            console.log("GET");
            res.status(200).json(findmarkets)
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}