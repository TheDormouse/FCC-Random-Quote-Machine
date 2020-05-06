import {PrismaClient} from '@prisma/client';
import Cors from 'cors'
const prisma = new PrismaClient();


// Initializing the cors middleware
const cors = Cors({
    methods: ['GET', 'HEAD']
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, result => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export default async function (req, res) { // Run the middleware
    await runMiddleware(req, res, cors)

    // Rest of the API logic
    const length = await prisma.quote.count({})
    const random = Math.floor(Math.random() * Math.floor(length) + 1)

    const quote = await prisma.quote.findOne({
        where: {
            id: parseInt(random)
        },
        include: {
            author: true
        }
    })
    await prisma.disconnect()
    res.json(quote)
}

// export default handler

/*export default async function (req, res) {
  if(req.method === "GET"){
    const quotes = await prisma.quote.findMany({})
    const length = quotes.length
    const random = Math.floor(Math.random() * Math.floor(length) + 1)

    const quote = await prisma.quote.findMany({where: { id: parseInt(random)}, include: {author: true}})
    await prisma.disconnect()
    res.json(quote)

  }
}*/
