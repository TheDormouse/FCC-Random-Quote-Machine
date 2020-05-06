import fetch from 'isomorphic-unfetch';
import styled from 'styled-components'
import {motion, useAnimation} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuoteLeft, } from '@fortawesome/free-solid-svg-icons'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

const Box = styled(motion.div)`
margin: auto;
margin-top: 5vh;
padding: 20px 20px 20px 20px;
background: white;
border-radius: 30px;
width: 10vw;
min-height: 10vw;
color: #333;
text-align: left;
font-size: 8vh;
opacity: 0;
`
const Quote = styled(motion.div)`
visibility: hidden;
`
const Icon = styled.span`
font-size: 3vh;
float: left;
margin: 5px;
`

const Author = styled(motion.div)`
visibility: hidden;
text-align: right;
font-size: 4vh;
`
const Buttons = styled(motion.div)`
visibility: hidden;
opacity: 0;
`
const Button = styled.a`
border:none;
border-radius:3px;
color:#fff;
background-color:#333;
outline:none;
font-size:2vh;
padding: 8px 18px 6px 18px;
margin-top:7vh;
opacity:1;
cursor:pointer;
&:hover {
  opacity:0.9;
}
&#tweet-quote {
    float: left;
}
&#new-quote {
    float: right;
}
`

const Github = styled.a`
position: absolute;
bottom:5px;
right: 5px;
color: #fff;
font-size: 1.5vh;
`

export default(props) => {
    const [quote, setQuote] = React.useState({})
    const containerControls = useAnimation()
    const quoteControls = useAnimation()
    async function startAnimation (){
        await containerControls.start({opacity: [0, 1], y: [100, 0], width: ['10vw', '10vw', '80vw'], fontSize: ['8vh', '8vh', '5vh']})
        return await quoteControls.start({visibility: 'visible', opacity: [0, 1]})
    }
    async function getNewQuote(event) {
        if (event) {

            event.preventDefault();
        }
        if(quote.text){
            setQuote({})
        }
        var res = await fetch('/api/random')
        var json = await res.json()
        setQuote(json)
    }
    React.useEffect(() => {
        async function init(){
            await getNewQuote()
            return await startAnimation()
        }
        init()
    }, [])

    return (
        <div>
            <style jsx global>{`
            body {
                background:
                        linear-gradient(to right, rgba(0, 153, 255, 0.5), rgba(0, 153, 255, 0.5)),
                        url('https://source.unsplash.com/collection/261936') no-repeat center center fixed; 
                        -webkit-background-size: cover;
                        -moz-background-size: cover;
                        -o-background-size: cover;
                        background-size: cover;
            }`}</style>
                <Box id='quote-box' animate={containerControls}>
                <Icon><FontAwesomeIcon icon={faQuoteLeft}/></Icon>
                <Quote id='text' animate={quoteControls}>{quote.text ? quote.text : null}</Quote>
                <Author id='author' animate={quoteControls}>{quote.author ? "- " + quote.author.name : null}</Author>
                <Buttons animate={quoteControls}>

                <Button id='tweet-quote' href={`https://twitter.com/intent/tweet?text=${quote.text ? quote.text + ' - ' + quote.author.name : null}&via=Mad_Marchy`} target='new'><FontAwesomeIcon icon={faTwitter} /></Button>
                <Button id='new-quote' onClick={(event) => getNewQuote(event)}>New Quote</Button>
                </Buttons>
        </Box>
        <script src="https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js" />
        <Github href='https://github.com/TheDormouse/FCC-Random-Quote-Machine' target='new'>Ben Martinez-Cain</Github>
        </div>

    )

}

