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
    let birthday = req.body.birthday as string;
    let gender = req.body.gender as string;
    let userId = req.body.userId as string;
    let customer = null;
    //res.status(200).json({hello:'world'});
    switch (method) {
        case 'GET':
            // Get Stands
            let findcustomer = await prisma.customer.findMany();
            
            console.log("GET");
            res.status(200).json(findcustomer)
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}