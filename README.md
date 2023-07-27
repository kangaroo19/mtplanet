# MTPLANET
![제목을 입력하세요 (2)](https://user-images.githubusercontent.com/86513078/236845866-6cd6cedf-a5ea-4436-9ead-34ce38283fdb.png)

### 주소
https://kangaroo19.github.io/mtplanet/#/

## 1.개요
MTPLANET은 기업정보,리뷰 서비스를 제공하는 "잡플래닛"이라는 사이트와 비슷하게 군대 훈련소들의 리뷰를 볼 수 있는 웹페이지 입니다


## 2.미리보기
### PC버전
![ㅋㅋㅋㅋㅋ](https://user-images.githubusercontent.com/86513078/228157468-abd0d2ca-e8f0-4d80-88dd-9fc69a0ff0d5.png)
### 모바일버전
![dddd](https://user-images.githubusercontent.com/86513078/228160103-f53d9bef-471b-49c3-bd4b-e003c2ec8497.PNG)


MTPLANET은 크게 4가지 화면으로 구성되어 있습니다.

- 홈페이지 : 부대들의 목록을 표시
- 랭킹페이지 : 부대들의 별점별,리뷰개수별 랭킹을 표시
- 뉴스페이지 : 국방관련 뉴스를 표시
- 로그인 페이지 : 로그인,회원가입을 위한 페이지

※디자인은 대부분 Material UI 사용하였습니다.

## 3.파일구조
![구조](https://github.com/kangaroo19/mtplanet/assets/86513078/e1bf110f-7a38-4083-95d5-16e8861b5f44)


## 4.사용법

![제목 없음](https://user-images.githubusercontent.com/86513078/226247553-2b1e1568-e67a-4c92-a051-815295aad33e.png)


회원가입을 하지 않아도 리뷰를 볼 순 있지만 리뷰를 작성하기 위해선 먼저 로그인 페이지에서 닉네임(리뷰 작성시 표시됨),이메일,비밀번호를 작성하여 회원가입을 해야 합니다. 이 과정이 귀찮으면 구글로 로그인하여도 무방합니다.

 &nbsp; &nbsp; &nbsp; -이메일은 양식만 지키면 어느것을 쓰든 상관없습니다.

  &nbsp; &nbsp; &nbsp; -비밀번호는 6자 이상이어야 합니다.
  
 ![ㄴㅇㄹㄹ](https://user-images.githubusercontent.com/86513078/226251491-1254e2da-6034-48fb-9732-b775d93a7ad9.png)


성공적으로 회원가입을 마치면 홈페이지로 이동해 리뷰를 작성할 부대를 선택해 이동합니다 이 화면은 해당 부대의 평균 별점 흡연 가능/불가능 여부 등을 볼 수 있습니다 하단의 "리뷰 작성하기 버튼" 클릭시 리뷰작성 페이지로 이동합니다

![ㄹㄹㄹ](https://user-images.githubusercontent.com/86513078/226251948-dfc3a69a-9f82-4c83-9b52-80206d868bd2.png)

각 항목에서 해당되는 버튼을 클릭하고 한줄평,장 단점 작성 완료 후 글쓰기 버튼을 클릭하면 내가 작성한 리뷰가 게시됩니다.

![dcc](https://user-images.githubusercontent.com/86513078/226252247-9732385f-c615-445c-88d7-2ec0d2eea94a.PNG)
게시완료


## 5.코드
### - 회원가입

로그인과 회원가입기능은 Firebase Authentication를 사용하여 구현하였습니다.
```JS
if (newAccount) { //계정생성
                if(nickName==="") return //nickName 안썼을때
                data = await createUserWithEmailAndPassword(authService, email, password).then( //email,password는 각각 내가 작성한 값
                    async (result) => {
                        await updateProfile(result.user,{
                            displayName:nickName 
                        })
                        
                        const {uid, displayName, photoURL} = result.user
                        await setDoc(doc(dbService, "users", `${uid}`), {  //db에 유저정보 저장
                            uid: `${uid}`,
                            userName: `${nickName}`,
                            userImg: `${photoURL}`
                        })
                    }
                )
                setNewAccount(false)
                navigate('/')
```
- email,password,nickName 변수는 각각 내가 회원가입 화면에서 작성한 값입니다.
- newAccount값이 true이면 계정생성,false이면 로그인 화면으로 바뀜니다
- createUserWithEmailAndPassword함수 사용하여 회원가입시 displayName은 null로 초기화 되므로 내가 작성한 nickName을 displayName프로퍼티에 넣고 updateProfile함수 사용하여 업데이트합니다. 이후 유저 정보를 Firebase Firestore에 넣기 위해 setDoc 함수 사용하였습니다. 회원가입이 성공적으로 완료되면 홈 페이지로 리디렉션 됩니다.

### - 로그인

```JS
else { //로그인 버튼 setNewAccount가 false 일때
                data = await signInWithEmailAndPassword(authService, email, password).then(
                    async (result) => {
                    
                        .
                        .
                        .
                        
                        })
                        navigate('/')
                    }
                )
            }

```
- signInWithEmailAndPassword 함수 사용하여 로그인 기능 구현,로그인 성공적으로 처리시 홈 페이지로 리디렉션


### - 리뷰 작성
리뷰 작성 기능은 firebase firestore 을 사용해 만들었습니다
```JS
const onSubmit=async(event)=>{ //리뷰 제출
        event.preventDefault()
        if(oneLineReview!=='' && goodReview!=='' && badReview!==''){
            const reviewObj={ //reviewArr에 저장되는 데이터,db에 저장됨
                displayName:userObj.displayName, 
                uid:userObj.uid,
                userImg:userObj.userImg,
                .
                .
                .
                userYear:year,
                userMonth:month,
                date:Date.now(),
            }
            const reviewDocRef=await addDoc(collection(dbService,`${divisionData[id].title}`),reviewObj) //ex)12사단 컬렉션에 저장됨
```

- reviewObj는 해당 부대의 컬렉션에 저장되는 객체입니다 이 객체에는 사용자정보,사용자가 선택한 각 요소들의 별점(생활관,훈련강도 등),장/단점,한줄평 들의 정보가 포함되어 있습니다.

### -평균 별점


![zxcvzcxv](https://user-images.githubusercontent.com/86513078/226341398-5007d8c8-599c-4641-8d3c-5e19d1a4b596.PNG)


각 부대의 평균 별점을 내기 위해 각 부대 컬렉션안에 allrating이라는 문서필드 따로 만들어 각 부대의 총 별점값과 문서필드 갯수를 저장하였습니다.

```JS
const countDocRef = collection(dbService, `${divisionData[id].title}`) 
            const countSnapshot = await getCountFromServer(countDocRef) //총 리뷰 개수
            const starObj={ //부대의 평균 별점 내기 위함
                star:starSnapshot.data().star+Number(reviewObj.userStarReview), //방금 내가 선택한 별점과 데이터베이스에 저장된 별점 더함
                count:countSnapshot.data().count-1, //해당 부대에 저장된 문서 갯수 ,allrating 문서필드 있으므로 -1
                room:starSnapshot.data().room+reviewObj.userRoomReview,
                shower:starSnapshot.data().shower+reviewObj.userShowerReview,
                toliet:starSnapshot.data().toliet+reviewObj.userTolietReview,
                training:starSnapshot.data().training+reviewObj.userTolietReview,
                distance:starSnapshot.data().distance+reviewObj.userDistanceReview,
                food:starSnapshot.data().food+reviewObj.userFoodReivew,
                smoke:starSnapshot.data().smoke+reviewObj.userSmokeReview,
                tv:starSnapshot.data().tv+reviewObj.userTvReview,
                px:starSnapshot.data().px+reviewObj.userPxReview,
            }
            starDocRef=await setDoc(doc(dbService,`${divisionData[id].title}`,'allrating'),starObj)
            .
            .
            .
            navigate(`/detail/${id}`) //리뷰 작성 완료 후 해당 부대 페이지로 리디렉션
```
내가 방금 작성한 별점과 firestore에 저장된 별점 값을 더해 새로 firebase에 저장합니다 리뷰작성이 성공적으로 완료되면 부대 페이지로 리디렉션됩니다.

## 6.기술스택

<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=JavaScript&logoColor=white"/><img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/><img src="https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=CSS3&logoColor=white"/><img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white"/>
<img src="https://img.shields.io/badge/firebase-FFCA28?style=flat&logo=firebase&logoColor=white">

## ** 게시판 기능 추가(2023/05/28)

![ㅇㅇㅇㅇㅇ](https://github.com/kangaroo19/mtplanet/assets/86513078/c948caa7-949c-4bc8-ad9d-c0df85da7a40)

CRUD기능과 댓글기능을 포함한 게시판 기능을 추가하였습니다.

### -글쓰기 버튼 클릭시 파이어베이스에 저장되는 데이터(postObj)

```JS
const [postObj,setPostObj]=useState(        
        {
            id:(Math.random()*1000000).toFixed().toString(), 
            title:"",   
            content:"", 
            date:"",    
            userObj:userObj, /
            sort:null   
        })
```
- id:게시물의 고유 id 클릭시 이 값으로 라우팅,파이어베이스에 댓글기능 처리위해 이 값을 이름으로 가지는 컬렉션 생성 
- title:게시물 제목
- content:게시물 내용
- date:게시물 등록 날짜
- userObj:글쓴이 정보
- sort:정렬에 사용될 유닉스 시간


### -댓글작성시 파이어베이스에 저장되는 데이터(replyObj)

```JS
const [replyObj,setReplyObj]=useState(
            {
                id:(Math.random()*1000000).toFixed().toString(),
                value:"",  
                date:null,  
                sort:null, 
                userObj:userObj
            })
```

- id:댓글의 고유 아이디
- value:댓글 내용
- date:댓글작성 날짜
- sort:정렬에 사용될 유닉스 시간
- userObj:댓글 작성자 정보



