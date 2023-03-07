import {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, GithubAuthProvider} from "firebase/auth";
import {authService} from '../fbase';
import {dbService} from '../fbase';
import {doc, setDoc} from "firebase/firestore";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Error from '../components/login/Error';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

import {faGoogle, faGithub} from "@fortawesome/free-brands-svg-icons";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {
    const navigate = useNavigate() //로그인 성공시 리디렉션 처리 위함
    const [nickName, setNickName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newAccount, setNewAccount] = useState(true) //true일때는 create acc, false 일때는 login
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)
    const toggleAccount = () => setNewAccount((prev) => !prev)
    const onSocialClick = async (event) => {
        event.preventDefault()
        const {target: {
                name
            }} = event
        let provider
        if (name === "google") {
            provider = new GoogleAuthProvider()
        } else if (name === "github") {
            provider = new GithubAuthProvider()
        }
        const data = await signInWithPopup(authService, provider).then(
            async (result) => {
                console.log(result)
                const {uid, displayName, photoURL} = result.user
                await setDoc(doc(dbService, "users", `${uid}`), {
                    uid: `${uid}`,
                    userName: `${displayName}`,
                    userImg: `${photoURL}`
                })
                navigate('/')
            }
        )
    }
    const onChange = (event) => {
        const {
            target: {
                name,
                value
            }
        } = event
        if (name === "email") {
            setEmail(value)
        } else if (name === "password") {
            setPassword(value)
        } else {
            setNickName(value)
        }
    }
    const onSubmit = async (event) => { //async함수는 반드시 프로미스 리턴
        event.preventDefault()

        try {
            let data
            if (newAccount) { //create acc
                data = await createUserWithEmailAndPassword(authService, email, password).then(
                    async (result) => {
                        console.log(result)
                        const {uid, displayName, photoURL} = result.user
                        await setDoc(doc(dbService, "users", `${uid}`), {
                            uid: `${uid}`,
                            userName: `${nickName}`,
                            userImg: `${photoURL}`
                        })
                    }
                )
                setNewAccount(false)
                navigate('/')

            } else { //log in
                data = await signInWithEmailAndPassword(authService, email, password).then(
                    async (result) => {
                        const {uid, displayName, photoURL} = result.user
                        await setDoc(doc(dbService, "users", `${uid}`), {
                            uid: `${uid}`,
                            userName: `${nickName}`,
                            userImg: `${photoURL}`
                        })
                        navigate('/')
                    }
                )
            }
        } catch (error) {
            console.log("오류요")
            setOpen(true)
            setError(error.message)
        }
    }
    function callBack(value) { //자식 컴포넌트의 데이터 부모 컴포넌트(app)로 보내기 위함
        setOpen(value)
    }
    return (
        <ThemeProvider theme={theme}>
            {/* {redirect?<Route path="/login"/>} */}
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: 'secondary.main'
                        }}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    {
                                newAccount
                                    ? "회원가입"
                                    : "로그인"
                            }
                    </Typography>
                    <Box
                        component="form"
                        noValidate="noValidate"
                        sx={{
                            mt: 1
                        }}>
                        {
                            newAccount
                                ? <TextField
                                        margin="normal"
                                        required="required"
                                        fullWidth="fullWidth"
                                        id="nickname"
                                        label="닉네임"
                                        name="nickname"
                                        onChange={onChange}
                                        value={nickName}
                                        autoFocus="autoFocus"/>
                                : null
                        }
                        <TextField
                            margin="normal"
                            required="required"
                            fullWidth="fullWidth"
                            id="email"
                            label="이메일"
                            name="email"
                            autoComplete="email"
                            value={email}
                            onChange={onChange}/>
                        <TextField
                            margin="normal"
                            required="required"
                            fullWidth="fullWidth"
                            name="password"
                            label="비밀번호"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={onChange}/>

                        <Button
                            type="submit"
                            fullWidth="fullWidth"
                            variant="contained"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}
                            onClick={onSubmit}>
                            {
                                newAccount
                                    ? "계정 생성"
                                    : "로그인"
                            }
                        </Button>
                        <Grid container="container">
                            <Grid item="item" xs="xs"></Grid>
                            <Grid item="item">
                                <span className="login_toggle" onClick={toggleAccount} style={{textDecoration:'underline'}}>{
                                        newAccount
                                            ? "로그인 하기"
                                            : "계정 생성하기"
                                    }</span>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth="fullWidth"
                            variant="outlined"
                            sx={{
                                mt: 3,
                                mb: 2
                            }}
                            onClick={onSocialClick}
                            name="google">
                            <FontAwesomeIcon icon={faGoogle}></FontAwesomeIcon>
                            구글로 로그인
                        </Button>
                    </Box>
                </Box>
                <Copyright
                    sx={{
                        mt: 8,
                        mb: 4
                    }}/> {
                    open
                        ? <Error error={error} callBack={callBack}/>
                        : null
                }
            </Container>
        </ThemeProvider>
    );
}
