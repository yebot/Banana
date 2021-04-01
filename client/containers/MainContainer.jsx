import React, { Component } from 'react';
import Login from "../components/Login.jsx";
import Logout from "../components/Logout.jsx";
import NoteList from "../components/NoteList.jsx";
import Note from "../components/Note.jsx";

//import { connect } from 'react-redux';

//const mapStateToProps = state => ({
//});

//const mapDispatchToProps = dispatch => ({
//});

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      author_id: 116612,
      notes: {},
      note: {},
      editBufferInSeconds: 3,
      editLast: Date.now(),
      lastNoteUpdated: -1,
      currentNoteOpen: -1,
      justOpened: true
    };
    this.createNote = this.createNote.bind(this);
    this.selectNote = this.selectNote.bind(this);
    this.changedNote = this.changedNote.bind(this);
    this.prepNotesForState = this.prepNotesForState.bind(this);
    this.makeTitleAndPreview = this.makeTitleAndPreview.bind(this);
    this.apiCallUpdateNote = this.apiCallUpdateNote.bind(this);
    this.deleteNoteClickHandler = this.deleteNoteClickHandler.bind(this);
  }

  componentDidMount() {
    console.log(`/api/note/all/${this.state.author_id}`);
    // Get list of this users' notes, add to state.
    fetch(`/api/note/all/${this.state.author_id}`)
      .then(res => res.json())
      .then(notes => {
        //console.log(notes);
        this.setState({notes: this.prepNotesForState(notes)});
      })
      .catch(err => {
        console.log(`error getting all notes - ${err}`);
      });
    /* TODO:
       - check for a valid session cookie, if good proceed to checking session in DB
       - if no cookie, show login
    */
    //fetch('/api/user/start-session')
    //  .then((data) => {
    //    console.log(data);
    //  })
    //  .catch((err) => {
    //  });
  }

  prepNotesForState(notes) {

    // TODO: sort notes by modified_at
    //let newTitle = '';
    //for (let i = 0; i < notes.length; i++) {
    //  //console.log(new Date(notes[i].modified_at));
    //  // UPDATE NOTE TITLE
    //  // check for markdown
    //  if (notes[i].content[0] === '#') {
    //    newTitle = notes[i].content.substring(0, notes[i].content.indexOf('\n'))
    //  } else {
    //    newTitle = notes[i].content.substring(0, 50)
    //  }
    //  notes[i].title = newTitle;
    //}
    //console.log(`here are the notes ${notes}`);
    return notes;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    //console.log(this.state.note);
    const rightNow = Date.now();
    if (rightNow - this.state.editLast > this.state.editBufferInSeconds * 1000) {
      console.log('... Triggering PATCH');
      // check if last note open id isnt -1, proceed if true
      if (true) {
        fetch(`/api/note/${this.state.note._id}`,{
          method: 'PATCH',
          body: JSON.stringify({ 
            content: this.state.note.content,
            author_id: this.state.note.author_id,
            tags: this.state.note.tags
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        })
          .then(result => {
            this.setState({ editLast: Date.now() })
          })
          .catch(err => console.log(err) );
      }
      //console.log(`...from changedNote: updated note content = ${e.target.value}`)
    } else {
      console.log('... its too soon');
    }
  } 

  apiCallUpdateNote(note) {
    if (note._id) {
      fetch(`/api/note/${note._id}`,{
        method: 'PATCH',
        body: JSON.stringify({ 
          content: note.content,
          author_id: note.author_id,
          tags: note.tags
        }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(result => {
        this.setState({ editLast: Date.now() });
        return result;
      })
      .catch(err => console.log(err) );
    }
  }

  createNote() {
    console.log('invoking createNewNote');
    // fetch a create new now post to api
    const newNote = {
      author_id: this.state.author_id,
      content: '',
      tags: JSON.stringify({})
    }
    fetch(`/api/note`, {
      method: 'POST',
      body: JSON.stringify(newNote),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        const newNotes = [...this.state.notes];
        newNotes.unshift(data);
        //console.log(newNotes);
        this.setState({ notes: newNotes });
      })
      .catch(err => { console.log('error creating new note')})
    // update state with whats returned
  }

  makeTitleAndPreview(content) {
    let title = content.substring(0,100);
    let preview = title;
    title = title.substring(0,title.indexOf('\n')).replaceAll('#', '').trim();
    preview = preview.substring(preview.indexOf('\n')).replaceAll('#', '').trim();
    return [title, preview];
  }

  changedNote(e) {
    //console.log('...from changedNote: the note changed');
    let note = this.state.note;
    note = Object.assign(note, { content: e.target.value })
    this.setState({ note });

  }

  selectNote(e) {
    console.log(`...invoked selectNote, e.target.id = ${e.target.id}`);
    
    //lastNoteUpdated: -1,
    //currentNoteOpen: -1
    // update state
    let editThisNote = {}
    let currentNoteOpen = this.state.currentNoteOpen;
    for (const key in this.state.notes) {
      //console.log(`looking for the note to edit by key - ${key}`);
      //console.log(this.state.notes[key]._id);
      if (e.target.id === this.state.notes[key]._id) {
        console.log(`...from selectNote: we are editing this note ${this.state.notes[key]}`);
        editThisNote = this.state.notes[key];
        currentNoteOpen = parseInt(key);
        //console.log(editThisNote.title);
        break;
      }
    }
    if (currentNoteOpen !== this.state.currentNoteOpen) {
      // send an API update for the note we are leaving to make sure it gets saved.
      this.apiCallUpdateNote(this.state.note);
      this.setState({ note: editThisNote, currentNoteOpen: currentNoteOpen });
    }
  }

  deleteNoteClickHandler(e) {

  }

  render(props) {
    //console.log(this.state.notes);
    // Here's where we make our array of notes for the list
    const noteList = [];
    for (const k in this.state.notes) {
      const [ title, preview ] = this.makeTitleAndPreview(this.state.notes[k].content)
      let classes = 'note-in-list';
      if (this.state.note.hasOwnProperty('_id')) {
        if (this.state.note._id === this.state.notes[k]._id) {
          classes = 'note-in-list selected';
        } else {
          classes = 'note-in-list';
        }
      }
      noteList.push(
        <div
          className={classes}
          id={this.state.notes[k]._id}
          key={this.state.notes[k]._id}
          onClick={this.selectNote}
        >
          {title}
          <div className="preview">{preview}</div>
        </div>);
    }
    // Here is where we are checking state for a note to be editing.
    let note = '';
    if (this.state.note.hasOwnProperty('content')) {
      note = <Note note={this.state.note} onChange={this.changedNote} />;
    }
    return(
      <div className="grid-container">
        <div className="sidebar">
          {/*<h1 id="header">Banana</h1>
          <Login />
          <Logout />*/}
          <NoteList createNote={this.createNote} notes={noteList}/>
        </div>
        {note}
      </div>
    );
  }

}

export default MainContainer;
//export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);