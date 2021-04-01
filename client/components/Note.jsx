import React from 'react';
import ThreeDotMenu from "../components/ThreeDotMenu.jsx";


const Note = (props) => {
  //console.log();
  return (
    <>
      <textarea className="editor" onChange={props.onChange} value={props.note.content} id={props.note._id}></textarea>
      <ThreeDotMenu />
    </>
  )};

export default Note;