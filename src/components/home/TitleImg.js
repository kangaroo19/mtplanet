import styled from "styled-components"
import img from '../../img/main.jpg'
function TitleImg(){
    return (
        <Section>
            <Wrapper>
                <Inner>
                    <TitleWrapper>
                        <Title>MTPLANET</Title>
                        <Message>훈련소 정보를 미리 알아보세요</Message>
                    </TitleWrapper>
                </Inner>
            </Wrapper>
        </Section>
    )
}

export default TitleImg

const Section=styled.div`
    width:100%;
    background-color: white;
    position: relative;
    margin-top:50px;
    @media only screen and (max-width:800px){
        display:none;
    }
`
const Wrapper=styled.div`
    height:360px;
    width:100%;
    background-image: url(${img});
    background-size: cover;
    background-position:center 1%;
    background-repeat: no-repeat;
    z-index: 1;
`
const Inner=styled.div`
    width:100%;
    height:100%; 
    background-color:rgb(47,48,89);
    opacity: 0.8;
    z-index: 2;
`
const TitleWrapper=styled.div`
    margin:0 30px;
    padding-top:60px;
    padding-bottom: 100px;
`

const Title=styled.div`
    font-size: 2rem;
    font-weight: bold;
    color:white;
    margin-bottom: 2rem;
`

const Message=styled.div`
    color:white;
    font-size: 1.4rem;
`