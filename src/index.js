//2023/03/22
//load time: 601 ms 
//performance grade : 89
//page size : 1 mb
//request : 107

//image percent : 49.89%
//Script percent : 42.27%

//###이미지 압축 후####

//load time: 114 ms 
//performance grade : 89
//page size : 727kb
//request : 107

//image percent : 27.78%
//Script percent : 60.91%
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
      <App/>
    </HashRouter> 
);

//browserRouter vs hashRouter

//browserRouter:
//-html5의 history api활용
//-ssr에 적합하므로,seo좋음
//-새로고침하거나 url직접 접근시 404에러
//따로 서버 존재하고 대규모 프로젝트에 적합

//hashRouter:
//Url의 hash사용
//csr에 적합,seo나쁨
//라우터에 #이 붙음 
//간단한 개인 프로젝트에 적합