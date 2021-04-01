import React from 'react';

const Note = (props) => {
  //console.log();
  return (
  <div className="note-editor">
    <textarea onChange={props.onChange} defaultValue={props.note.content} id={props.note._id}></textarea>
  </div>
)};

export default Note;