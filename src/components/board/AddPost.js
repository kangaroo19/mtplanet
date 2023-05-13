import { useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
function AddPost({userObj}){
    const [postObj,setPostObj]=useState({number:"",title:"",content:"",date:"",userObj:userObj}) //게시물에 대한 정보를 담고있는 객체

    const onChangePost=(event)=>{
        const {target:{id,value}}=event
        switch(id){
            case 'title':
                setPostObj({...postObj,title:value})
                break
            case 'content':
                setPostObj({...postObj,content:value})
            break
        }
    }
    
    const onClickAddPost=()=>{
        const today = new Date();
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const dateString = year + '-' + month  + '-' + day;
        setPostObj({...postObj,date:dateString})
    }
    console.log(postObj)

    return (
        <Wrapper>
            <Inner>
                <postContainer onChange={onChangePost}>
                    <Title>
                        <TextField 
                            id="title" 
                            label="제목을 작성해 주세요" 
                            variant="outlined" 
                            sx={{width:'100%'}}/>
                    </Title>
                    <Content>
                    <TextField
                            fullWidth
                            id="content"
                            label="내용을 작성해 주세요"
                            multiline
                            rows={10} //height
                            variant="filled"
                            name='badreview'
                        />
                    </Content>
                </postContainer>
                <ButtonContainer>
                     <Button variant="contained" onClick={onClickAddPost}>글쓰기</Button>         
                </ButtonContainer>
            </Inner>
        </Wrapper>
    )
}

export default AddPost

const Wrapper=styled.div`
    margin-top:50px;
    background-color:#e9e9e9;
    @media only screen and (max-width:420px){
        margin-top:20px;
        margin-bottom:60px;
    }
`

const Inner = styled.div `
    background-color:white;
    width:100%;
    height:100%;
    margin:0 auto;
    padding:20px;
    overflow: hidden;
    @media only screen and (min-width:800px){
        max-width:800px;
    }
`

const postContainer=styled.div`

`

const Title=styled.div`

`

const Content=styled.div`
    margin-top:10px;
    height:300px;
`

const ButtonContainer=styled.div`
    height:200px;
    display:flex;
    align-items:center;
    justify-content:center;
`