import React from 'react';

const NoteList = (props) => {
  //console.log(props.notes);
  return (
  <div className="note-list">
    <div id="banana" onClick={props.toggleDataTheme}>🍌 </div>
    <button id="create-note" onClick={props.createNote}>new note</button>
    {/*<div>Here is our list of notes</div>*/}
    {props.notes}
  </div>
)};

export default NoteList;