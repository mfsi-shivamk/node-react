/* eslint-disable react/prop-types */ 
import React from 'react'

const style = {
   img : { width:"600", height:"400"}
}
function ImageBox({url, desc}) {
    return (
        <div className="responsive">
  <div className="gallery">
    <a target="_blank" rel="noreferrer" href={url}>
      <img src={url} alt="Forest" style={style.img}/>
    </a>
    <div className="desc">{desc}</div>
  </div>
</div>
    )
}

export default ImageBox
