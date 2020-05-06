import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if(req.method === "GET"){
      const {authorid, contains} = req.query;

      if(authorid && !parseInt(authorid)){
        await prisma.disconnect()
        res.json([])
      } 
      if(authorid){
        const author = await prisma.author.findMany({where: {name: {contains: contains}, id: parseInt(authorid)}, include: {quotes: true}})
        await prisma.disconnect()
        res.json(author)
      }
      else {
        const quotes = await prisma.author.findMany({where: {name: {contains: contains}}, include: {quotes: true}})
        await prisma.disconnect()
        res.json(quotes)
      }

  }
}