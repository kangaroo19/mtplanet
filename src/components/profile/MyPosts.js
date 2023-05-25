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
    padding:5px 0 5px 0;
    border-bottom:1px solid black;
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