import React from 'react';

const NoteList = (props) => {
  //console.log(props.notes);
  return (
  <div className="note-list">
    <button onClick={props.createNote}>Create New Note</button>
    {/*<div>Here is our list of notes</div>*/}
    {props.notes}
  </div>
)};

export default NoteList;