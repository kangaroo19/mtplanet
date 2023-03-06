//각 신교대 페이지(Detail.js)안에 있는 유저들이 작성한 리뷰
import styled from 'styled-components'
import Rating from '@mui/material/Rating';
function Reviews({reviewObj}){
    return (
        <Wrapper>
            {/* <Title>{reviewObj.displayName}</Title> */}
            <OneLineReview>{reviewObj.userReview} 입영일자:{reviewObj.userYear}/{reviewObj.userMonth}</OneLineReview>
            <Rating name="half-rating-read" defaultValue={Number(reviewObj.userStarReview)} precision={0.5} readOnly />
            <GoodReview>장점:{reviewObj.userGoodReview}</GoodReview>
            <BadReview>단점:{reviewObj.userBadReview}</BadReview>
        </Wrapper>

    )
}

export default Reviews

const Wrapper=styled.div`
    border:1px solid black;
    margin-top:10px;
`
const Title=styled.div`
    font-size:1.2rem;    
`
const OneLineReview=styled.div`
    font-size:1.2rem
`
const GoodReview=styled.div`
    font-size:1rem
`
const BadReview=styled.div`
    font-size:1rem
`