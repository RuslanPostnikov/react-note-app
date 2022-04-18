import {useAuth} from '../shared/AuthContext';
import axios from '../shared/axios';
import {useEffect, useState} from 'react';
import Note from './Note';
import Loader from './UI/Loader';

const Notes = () => {
  const {auth} = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [listChange, setListChange] = useState(false);
  const [notes, setNotes] = useState([]);

  const getNotes = async (offset, limit) => {
    try {
      const {data} = await axios.get('notes', {
        params: {offset, limit}
      });
      setNotes(data.allNotes);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getNotes();
  }, [listChange]);

  const renderNotes = () => {
    if(!auth) {
      return <h1>You need to log in</h1>
    } else {
      if(!notes.length || !notes) {
        return <h1>You don't have notes</h1>
      } else {
        return (
          <ul className={'list-group'}>
            {notes.map((note, i) => <Note key={i} note={note} setListChange={setListChange} />
            )}
          </ul>
        )
      }
    }
  }

    return (
      <div>
        {isLoading ? <Loader /> : renderNotes()}
      </div>
    );
};

export default Notes;
