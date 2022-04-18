import {useState} from 'react';
import axios from '../shared/axios';

const AddNote = () => {
  const [text, setText] = useState('');
  const addNote = (text) => {
    try {
      axios.post('notes', {text});
      setText('')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        name={'text'}
        className="form-control"
        placeholder="Type here"
        aria-describedby="basic-addon1"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className={'btn btn-primary'} onClick={() => addNote(text)}>Add note</button>
    </div>
  );
};

export default AddNote;
