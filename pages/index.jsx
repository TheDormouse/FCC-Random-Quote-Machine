//import { PrismaClient } from '@prisma/client';
import fetch from 'isomorphic-unfetch';
export default (props) => {
    const [quote, setQuote] = React.useState({})
    async function getNewQuote(event) {
        if(event){

            event.preventDefault();
        }
        setQuote({})
        var res = await fetch('/api/random')
        var json = await res.json()
        console.log(json)
        setQuote(json[0])
    }
    React.useEffect(() => {
        getNewQuote()
    }, [])
        return(
            <div className='container'>
                <style jsx global>{`
                    body {
                        background:
                        linear-gradient(to right, rgba(0, 153, 255, 0.5), rgba(0, 153, 255, 0.5)),
                        url('/desk.jpeg') no-repeat center center fixed; 
                        -webkit-background-size: cover;
                        -moz-background-size: cover;
                        -o-background-size: cover;
                        background-size: cover;
                    }
                    .container{
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                    .buttons {
                        display: flex;
                    }
                    #quotebox {
                        background-color: rgba(0, 153, 255, 0.8);
                        border-radius: 27px;
                        box-shadow: 20px 20px 37px 0px rgba(0, 0, 0, 0.25);
                        width: 100%;
                        padding: 10vh 10vw 10vh 10vw;
                        margin: 10vh 10vw 10vh 10vw;
                    }
                    #text {
                        padding: 10px;
                        font-family: "Inknut Antiqua", serif;
                        color: #ffffff;
                        letter-spacing: 0px;
                        line-height: 1.2;
                        font-weight: 400;
                        font-style: normal;
                    }
                    #author {
                        font-family: "Inknut Antiqua", serif;
                        color: #ffffff;
                        letter-spacing: 0px;
                        line-height: 1.2;
                        font-weight: 400;
                        font-style: normal;
                        text-align: right;
                    }
                    .buttons a{
                        overflow: visible;
                        background-color: rgba(0, 153, 255, 0.8);
                        border-radius: 20px;
                        font-family: "Inknut Antiqua", serif;
                        color: #ffffff;
                        letter-spacing: 0px;
                        line-height: 1.2;
                        font-weight: 400;
                        font-style: normal;
                        padding: 10px;
                        justify-content: center;
                    }
                    a {
                        text-decoration: none;
                        color: white;
                    }
                    .github {
                        position: absolute;
                        bottom:5px;
                        right: 5px;
                    }
                `}</style>
                <div id="quotebox">
                    <h1 id="text">{quote.text ? quote.text : 'loading..'}</h1>
                    <h2 id="author">{quote.author ? quote.author.name : ''}</h2>
                    
                </div>
                    <div className='buttons'>
                <a href={`https://twitter.com/intent/tweet?text=${quote.text ? quote.text + ' - ' + quote.author.name : null}&via=Mad_Marchy`} target='new'>Tweet quote</a>
                <a id="new-quote" href="#" onClick={(event) => getNewQuote(event)}>New Quote</a>
                </div>
                <div className='github'><a href='https://github.com/TheDormouse/FCC-Random-Quote-Machine' target='new'>Github</a></div>
            </div>)

}

/*export async function getServerSideProps(context) {
    const prisma = new PrismaClient();
    const quotes = await prisma.quote.findMany({})
    const length = quotes.length
    const random = Math.floor(Math.random() * Math.floor(length) + 1)
    const quote = await prisma.quote.findOne({where: { id: parseInt(random)}, include: {author: true}})
    await prisma.disconnect()
    return {
      props: {quote: JSON.stringify(quote)}, // will be passed to the page component as props
    }
  }*/