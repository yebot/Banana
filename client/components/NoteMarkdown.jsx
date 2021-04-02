import React from 'react';
import Markdown from 'markdown-to-jsx';

const NoteMarkdown = (props) => {
  let mdContClass = 'markdown-preview-container';
  if (props.markdownView === false) {
    mdContClass += ' displaynone';
  }
  return (
    <div className={mdContClass}>
      <div 
        className="markdown-preview"
        id={props.note._id}
      >
        <Markdown>{props.note.content}</Markdown>
      </div>
      <div id="markdown-close"><button id="markdown-close" onClick={props.toggleMarkdownView}>close</button></div>
    </div>
  )};

export default NoteMarkdown;