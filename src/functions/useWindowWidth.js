//미디어 쿼리 위한 현재 보고 있는 창의 픽셀 값(innerWidth)리턴하는 함수


import { useState, useEffect } from 'react';

export default function useWindowWidth() {
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeListener);

    return () => { //메모리 누수 막기위한 cleanup함수
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  return innerWidth;
}

