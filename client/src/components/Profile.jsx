import axios from '../shared/axios';
import {useEffect, useState} from 'react';
import Loader from './UI/Loader';

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');

  const getUser = async () => {
    try {
      const {data} = await axios.get('users/me');
      setUser(data.user);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  const inputStyle = {
    color: 'yellow',
    fontSize: 20,
    background: 'transparent',
    textAlign: 'center',
    border: 0
  }

  const renderUser = () => {
    if(isLoading) {
      return <Loader />;
    } else {
      return (
        <>
          <label htmlFor="username">Username</label>
          <input type="text" name={'username'} id={'username'} value={user.username} readOnly style={inputStyle} />
          <label htmlFor="date">Created date</label>
          <input type="text" name={'date'} id={'date'} value={user.createdDate} readOnly style={inputStyle} />
        </>
      )
    }
  }

  return (
    <div className={'d-flex justify-content-center align-items-center flex-column'}>
      {renderUser()}
    </div>
  );
};

export default Profile;
