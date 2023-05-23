import styled from "styled-components"

function MyPosts({id,title}){
    return (
        <Wrapper>
            <Inner>
                <MyPostContainer>
                    <PostId>{id}</PostId>
                    <PostTitle>{title}</PostTitle>
                </MyPostContainer>
            </Inner>
        </Wrapper>
    )
}


export default MyPosts

const Wrapper=styled.div`
`

const Inner=styled.div`

`

const MyPostContainer=styled.div`
    display:flex;
`

const PostId=styled.div`
    margin-right:30px;
`

const PostTitle=styled.div`

`