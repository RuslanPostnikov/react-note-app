import axios from '../shared/axios';
import {useState} from 'react';

const Note = ({note, setListChange}) => {
  const [input, setInput] = useState(note.text);
  const [readOnly, setReadOnly] = useState(true)

  const handleCompletion = async (e) => {
    e.stopPropagation();
    try {
      setListChange(true);
      await axios.patch(`notes/${note._id}`);
      setListChange(false);
    } catch (e) {
      console.log(e);
    }
  }

  const deleteNote = async (e) => {
    e.stopPropagation();
    try {
      setListChange(true);
      await axios.delete(`notes/${note._id}`);
      setListChange(false);
    } catch (e) {
      console.log(e);
    }
  }

  const editNote = async (e) => {
    e.stopPropagation();

    if(!readOnly) {
      try {
        setListChange(true);
        await axios.put(`notes/${note._id}`, {text: input});
        setListChange(false);
      } catch (e) {
        console.log(e);
      }
    }
    setReadOnly(!readOnly);
  }

  return (
      <li
        className={'list-group-item mb-2 d-flex justify-content-between'}
        style={{background: 'grey'}}
        onClick={handleCompletion}
        key={note._id}
      >
        <input
          style={readOnly ? {background: 'transparent', border: 0} : null}
          type="text"
          value={input.toString()}
          onChange={(e) => setInput(e.target.value)}
          readOnly={readOnly}
        />
        <div style={{display: 'flex', gap: 5}}>
          <button
            className={'btn btn-primary'}
            onClick={editNote}
          >
            {readOnly ? <>Edit</> : <>Save</>}
          </button>

          <button
            className={'btn btn-danger'}
            onClick={deleteNote}
          >
            Delete
          </button>

          <button
            className={`btn ${note.completed ? 'btn-warning' : 'btn-success'}`}
            onClick={handleCompletion}
          >
            {note.completed ? <>Uncheck</> : <>Check</>}
          </button>

        </div>
      </li>
  );
};

export default Note;
