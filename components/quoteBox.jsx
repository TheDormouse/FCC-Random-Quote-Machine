import styled from 'styled-components'
import {motion, useAnimation} from 'framer-motion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuoteLeft, faQuoteRight} from '@fortawesome/free-solid-svg-icons'

const Box = styled(motion.div)`
margin: auto;
padding: 20px 20px 20px 20px;
background: white;
border-radius: 30px;
width: 10vw;
min-height: 10vw;
color: grey;
text-align: left;
font-size: 8vh;
`
const Quote = styled(motion.div)`
visibility: hidden;
`
const Icon = styled.span`
font-size: 3vh;
float: left;
margin: 5px;`

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
height:38px;
border:none;
border-radius:3px;
color:#fff;
background-color:#333;
outline:none;
font-size:0.85em;
padding: 8px 18px 6px 18px;
margin-top:30px;
opacity:1;
cursor:pointer;
&:hover {
  opacity:0.9;
}
`

export default(props) => {
    const containerControls = useAnimation()
    const quoteControls = useAnimation()
    const {quote} = props;
    async function startAnimation (){
        await containerControls.start({opacity: [0, 1], y: [100, 0], width: ['10vw', '10vw', '80vw'], fontSize: ['8vh', '8vh', '5vh']})
        return await quoteControls.start({visibility: 'visible', opacity: [0, 1]})
    }
    React.useEffect(() => {
        startAnimation()
    }, [])
    return (
        <Box id='quote-box' animate={containerControls}>
                <Icon><FontAwesomeIcon icon={faQuoteLeft}/></Icon>
                <Quote id='text' animate={quoteControls}>{quote.text ? quote.text : null}</Quote>
                <Author id='author' animate={quoteControls}>{quote.author ? "- " + quote.author.name : null}</Author>
                <Buttons animate={quoteControls}>

                <Button animate={quoteControls}>test</Button>
                </Buttons>
        </Box>
    )
}
