import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export default async function entrypoint(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req
    let stock = null;
    let marketId = id as string;
    let simplified = req.query.simplified === "true";
    
    console.log("[LOG] " + method + " with query " + JSON.stringify(req.query));
    //res.status(200).json({hello:'world'});

    switch (method) {
        case 'GET':
            console.log(simplified)
            let query_select = {
                product: {
                    select: {
                        name: true
                    }
                }
            }
            if (!simplified) {
                query_select = {
                    product: {
                        select: { 
                            name: true,
                            id: !simplified,
                            farmerId: !simplified,
                        }
                    },
                    farmer: {
                        select: {
                            Stand: {
                                where: {
                                    marketId: marketId
                                }
                            },
                            name:!simplified,                            
                        },
                    }
                } as any
            }
            // Get Stands
            stock = await prisma.stock.findMany({
                where: {
                    farmer: {
                        Stand: {
                            some: {
                                marketId: marketId
                            }
                        }
                    },
                },
                select: query_select
            });

            console.log("GET");
            res.status(200).json(stock);
            break
        default:
            res.setHeader('Allow', ['PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
}