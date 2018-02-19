import PageViewer from './page_viewer';
import ReactDOM from 'react-dom';
import React from 'react';

const ImgViewer = (props) => {
  const src_a = [
    'http://www.armoredcore.net/acvd/static/images/top/top_contents.png',
    'http://www.armoredcore.net/top/pc/images/slider/acvd.jpg',
    'http://www.armoredcore.net/acvd/static/images/bg/top3.jpg',
  ];
  return (
    <div style={{textAlign: 'center'}}>
      <img
       src={src_a[props.page]}
       height={300} 
       style={{overflowY: 'visible'}}/>
      <h1 style={{color: 'white'}}> {props.page + 1} </h1>
    </div>
  );
};


ReactDOM.render(
  <PageViewer background='black'>
    <ImgViewer />
  </PageViewer>,
  document.getElementById("main")
);
