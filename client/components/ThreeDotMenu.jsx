import React from 'react';


const ThreeDotMenu = (props) => {
  //console.log(`here we are and here's ${props}`);
  return (
    <>
      {/*<div className="three-dot-menu">&bull;&bull;&bull;</div>*/}
      <div className="three-dot-menu-items">
        <div id={props.id} onClick={props.deleteHandler}>delete this note</div>
        <div id={props.id} onClick={props.toggleMarkdownView}>markdown</div>
      </div>
    </>
  )
}



export default ThreeDotMenu;