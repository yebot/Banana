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
      editBufferInSeconds: 5,
      editLast: Date.now()
    };
    this.createNote = this.createNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.changedNote = this.changedNote.bind(this);
  }

  componentDidMount() {
    console.log(`i am MainContainer and I did mount`);
    // Get list of this users' notes, add to state.
    fetch(`/api/note/all/${this.state.author_id}`)
      .then(res => res.json())
      .then(notes => {
        this.setState({notes: notes});
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

  componentDidUpdate(prevProps) {
    console.log(`here is prevProps ...${prevProps}`);
    console.log(prevProps);
    //if (prevProps.hidden !== this.props.hidden) {
    //    IntercomAPI("update", { hide_default_launcher: this.props.hidden });
    //}
  } 


  createNote() {
    console.log('invoking createNewNote');
    // fetch a create new now post to api

    // update state with whats returned
  }

  changedNote(e) {
    console.log('...the note changed');
    const rightNow = Date.now();
    if (rightNow - this.state.editLast > this.state.editBufferInSeconds * 1000) {
      console.log('we can send and api call');
    } else {
      console.log('its too soon');
    }
  }

  editNote(e) {
    console.log('invoking editNote');
    console.log(e.target.id);
    // fetch updated note to api (actually, all the notes are in state, so...)

    // update state
    let editThisNote = {}
    for (const key in this.state.notes) {
      console.log(`looking for the note to edit by key - ${key}`);
      //console.log(this.state.notes[key]._id);
      if (e.target.id === this.state.notes[key]._id) {
        console.log(`we are editing this note ${this.state.notes[key]}`);
        editThisNote = this.state.notes[key];
        console.log(typeof editThisNote.title);
        console.log(editThisNote.title);
        break;
      }
    }
    this.setState({ note: editThisNote });
  }

  render(props) {
    const noteList = [];
    for (const k in this.state.notes) {
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
          onClick={this.editNote}
        >
          {this.state.notes[k].title}
        </div>);
    }
    // Here is where we are checking state for a note to be editing.
    let note = '';
    if (this.state.note.hasOwnProperty('content')) {
      note = <Note note={this.state.note} onChange={this.changedNote} />;
    }
    return(
      <div className="container">
        <div className="outerBox">
          <h1 id="header">Banana</h1>
  
          {/*<Login />*/}
          {/*<Logout />*/}
          <NoteList createNote={this.createNote} notes={noteList}/>
          {note}
        </div>
      </div>
    );
  }

}

export default MainContainer;
//export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);