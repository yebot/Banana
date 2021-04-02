import React from 'react';
import ThreeDotMenu from "../components/ThreeDotMenu.jsx";


const Note = (props) => {
  return (
    <>
      <textarea
        autoFocus 
        className="editor"
        onChange={props.onChange}
        value={props.note.content}
        id={props.note._id}>
      </textarea>
      <ThreeDotMenu 
        deleteHandler={props.deleteHandler}
        toggleMarkdownView={props.toggleMarkdownView}
        id={props.note._id} />
    </>
  )};

export default Note;