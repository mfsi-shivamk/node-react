import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import Header from './Component/Header/Header';
import ImageBox from './Component/ImageGallery/ImageGallery';
import imagesData from './Data/images';
function App() {
  return (
    <React.Fragment>
      <Header/>
      {imagesData.sample1.map(r => <ImageBox {...r} />)}
<div className="container">
  <div className="item"></div> 
   <div className="item"></div> 
    <div className="item"></div>
  <div className="item"></div>  
  <div className="item"></div>  
  <div className="item"></div>
  <div className="item"></div> 
   <div className="item"></div>  
   <div className="item"></div>
</div>

    </React.Fragment>
  );
}

export default App;
