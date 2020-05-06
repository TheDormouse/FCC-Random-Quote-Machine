import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if(req.method === "GET"){
    const quotes = await prisma.quote.findMany({})
    const length = quotes.length
    const random = Math.floor(Math.random() * Math.floor(length) + 1)

    const quote = await prisma.quote.findMany({where: { id: parseInt(random)}, include: {author: true}})
    await prisma.disconnect()
    res.json(quote)

  }
}