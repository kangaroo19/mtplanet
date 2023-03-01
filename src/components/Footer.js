import styled from "styled-components"
function Footer(){
    return (
        <Wrapper>
            <Inner>
                <Message>MTPLANET</Message>
                <Contact>contact:1000jjj@naver.com</Contact>
                <Copyright>Copyright ⓒ 2023 All rights reserved.</Copyright>
            </Inner>
        </Wrapper>
    )
}

export default Footer

const Wrapper=styled.div`
    height:120px;
    border-top:1px solid #e4e4e4;
    background-color:#f8f9fa ;
    padding:1rem 0;
    margin-top:1.2rem; 
`
const Message=styled.div`
font-weight: bold;
font-size:0.9rem;
color:#545e6f;
margin-bottom:0.1rem;
margin-left:30px;
`

const Contact=styled.div`
font-size:0.9rem;
color:#545e6f;
margin-bottom:1rem;
margin-left:30px;
`

const Copyright=styled.div`
font-size:0.9rem;
color:#545e6f;
margin-left:30px;
`

const Inner=styled.div`
width:100%;
height:100%;
margin:0 auto;
overflow: hidden;
@media only screen and (min-width:1200px){
    max-width:1200px;
}
`