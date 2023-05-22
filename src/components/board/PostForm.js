//글쓰기 버튼 클릭시 toggle값 true로 변함 (기본값은 false)
//그럼 의존성배열에 toggle값이 있는 useEffect 안에서 
//현재 시간 가져오는 getDateString()함수 호출하고
//호출된 값을 useState함수 사용해 postObj 객체에 넣음
//----------여기까진 문제없음-----------------------------

//근데 number값 처리를 위한 작업 수행중 오류 발생
//post컬렉션이 없으면 postObj.number를 1로 초기화하고
//있으면 post컬렉션의 문서 개수에 따른 number값을 할당하는 initDB함수 만듦
//post컬렉션이 없을때 1이란 값을 할당위해 
//의존성 배열 비어있는 useEffect함수에 initDB함수 호출했는데
//잘 실행되었던 date값을 넣는 과정이 안됨

//아니면 순번으로 하지않고 랜덤한 고유의 아이디값을 주는것도 나쁘지 않을듯
//(나중에 게시글 하나 지웠을때 모든 값 변해야하므로)




import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { addDoc,collection,setDoc,doc, updateDoc } from 'firebase/firestore';
import { dbService } from '../../fbase';
import { useLocation, useNavigate } from 'react-router-dom';
function PostForm({userObj}){
    const updateTitle=useRef("")
    const updateContent=useRef("")
    const location=useLocation()
    const [toggle,setToggle]=useState(false)    //작성한 날짜와 날짜별 정렬위함
    const [updateToggle,setUpdateToggle]=useState(false)
    const [postObj,setPostObj]=useState({
                                        id:(Math.random()*1000000).toFixed().toString(),
                                        title:"",
                                        content:"",
                                        date:"",
                                        userObj:userObj,
                                        sort:null
                                        }) //게시물에 대한 정보를 담고있는 객체
    const navigate=useNavigate()
    useEffect(()=>{ 
        if(!location.state) return
        setPostObj(location.state.postObj)
        setUpdateToggle((prev)=>!prev)
        console.log(location.state.postObj)
        updateTitle.current.value=location.state.postObj.title
        updateContent.current.value=location.state.postObj.content
        
    },[])
    useEffect(()=>{
        const date=getDateString()
        setPostObj({...postObj, date: date[0],sort:date[1]})
    }, [toggle])

    useEffect(()=>{ //업데이트용
        if(!location.state) return 
        setPostObj(location.state.postObj)
    },[updateToggle])
    const getDateString=()=>{ //현재 시간 가져오는 함수
        const today = new Date();
        const unixTime=today.getTime() //정렬에 사용할 유닉스시간값
        const year = today.getFullYear();
        const month = ('0' + (today.getMonth() + 1)).slice(-2);
        const day = ('0' + today.getDate()).slice(-2);
        const hour=('0' + today.getHours()).slice(-2);
        const min=('0' + today.getMinutes()).slice(-2);
        const sec=('0' + today.getSeconds()).slice(-2);
        return [year + '-' + month  + '-' + day+" " + hour + ":"+ min + ":" + sec , unixTime ];
    }
    
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
    
    const onClickAddPost = async () => { //글쓰기 버튼 클릭시
        // console.log(postObj)
        if(postObj.content==="" || postObj.title==="") return alert("내용을 작성해 주세요")
        setToggle((prev)=>!prev)
        await setDoc(doc(dbService,'post',postObj.id),postObj)
        // await setDoc(doc(dbService,postObj.id,'test'),{a:'123'})
        return navigate(`/board`)

    }
    const onClickUpdatePost=async()=>{
        if(postObj.content==="" || postObj.title==="") return alert("내용을 작성해 주세요")
        await updateDoc(doc(dbService,'post',postObj.id),postObj)
        return navigate(`/board`)
    }
    const onClickUpdateCancle=()=>{
        return navigate('/board')
    }
    return (
        <Wrapper>
            <Inner>
                <PostContainer onChange={onChangePost}>
                    <Title>
                        <TextField 
                            id="title" 
                            label="제목을 작성해 주세요" 
                            variant="outlined" 
                            sx={{width:'100%'}}
                            inputRef={updateTitle}/>
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
                            inputRef={updateContent}
                        />
                    </Content>
                </PostContainer>
                <ButtonContainer>
                     {updateToggle?
                     <>
                     <Button variant="contained" onClick={onClickUpdatePost} style={{marginRight:'4px'}}>수정</Button>         
                     <Button variant="contained" onClick={onClickUpdateCancle}>취소</Button>         
                     </>
                     
                    :
                    <Button variant="contained" onClick={onClickAddPost}>글쓰기</Button>         

                    }
                </ButtonContainer>
            </Inner>
        </Wrapper>
    )
}

export default PostForm

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

const PostContainer=styled.div`

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