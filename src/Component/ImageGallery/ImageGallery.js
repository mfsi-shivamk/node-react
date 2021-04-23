import React from 'react'

const style = {
   img : { width:"600", height:"400"}
}
function ImageBox({url, desc}) {
    return (
        <div class="responsive">
  <div class="gallery">
    <a target="_blank" href={url}>
      <img src={url} alt="Forest" style={style.img}/>
    </a>
    <div class="desc">{desc}</div>
  </div>
</div>
    )
}

export default ImageBox
