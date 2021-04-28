// import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import Header from './Component/Header/Header';
import ImageBox from './Component/ImageGallery/ImageGallery';
import images from './Data/images';
import Form from './Component/Form/Form';
import form from './Data/formData';
function App() {
  return (
    <React.Fragment>
      <Header/>
      <Form {...form.domainForm} />
      <br/>
      <br/>
      <br/>
      {images.sample1.map((r,i) => <ImageBox {...r} key={i}/>)} 
    </React.Fragment>
  );
}

export default App;
