import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function (req, res) {
  if (req.method === 'POST') {
    const { author, quote } = req.body;
    const getAuthor = await prisma.author.upsert({
        where: { name: author},
        update: {
            quotes: {
                create: [{text : quote}]
                }
            
        },
        create: { 
            name: author,
            quotes: {
                create: [{text : quote}]
                }
         }
    })
    res.json(getAuthor)
    //const movie = await prisma.movie.create({ data: JSON.parse(body) });
    //res.json(movie);
  }
  if(req.method === "GET"){
      const {quoteid, contains} = req.query;

      if(quoteid && !parseInt(quoteid)){
        await prisma.disconnect()
        res.json([])
      } 
      if(quoteid){
        const quotes = await prisma.quote.findMany({where: {text: {contains: contains}, id: parseInt(quoteid)}, include:{author: true}})
        await prisma.disconnect()
        res.json(quotes)
      }
      else {
        const quotes = await prisma.quote.findMany({where: {text: {contains: contains}}, include: { author: true}})
        await prisma.disconnect()
        res.json(quotes)
      }
  }
}