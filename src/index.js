//2023/03/22
//load time: 6.01 ms 
//performance grade : 89
//page size : 1 mb
//request : 107

//image percent : 49.89%
//Script percent : 42.27%

//###이미지 압축 후####

//load time: 1.14 ms 
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

