import PageViewer from './page_viewer';
import ReactDOM from 'react-dom';
import React from 'react';

const ImgViewer = (props) => {
  const src_a = [
    'https://cdn.pixabay.com/photo/2017/12/15/11/14/outdoor-3020882_960_720.jpg',
    'https://cdn.pixabay.com/photo/2015/06/15/01/04/water-809799_960_720.jpg',
    'https://cdn.pixabay.com/photo/2014/06/21/14/25/water-373780_960_720.jpg',
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
