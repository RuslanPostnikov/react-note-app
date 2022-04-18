import './App.css';
import {Route, Routes, Navigate} from "react-router";
import {useAuth} from "./shared/AuthContext";
import Layout from "./layout/Layout";
import Auth from "./components/Auth";
import Notes from "./components/Notes";
import AddNote from './components/addNote';
import Registration from './components/Registration';
import Profile from './components/Profile';
import Logout from './components/UI/Logout';
import {useEffect} from 'react';

const App = () => {
  const {auth, setAuth} = useAuth();

  useEffect(() => {
    setAuth(!!JSON.parse(window.localStorage.getItem('auth')));
  }, [setAuth]);

  const renderRoutes = () => {
    if(auth) {
      return (
        <>
          <Route path={'addNote'} element={<AddNote />} />
          <Route path={'profile'} element={<Profile />} />
          <Route path={'logout'} element={<Logout />} />
        </>
      )
    } else {
      return (
        <>
          <Route path={'auth'} element={<Auth />} />
          <Route path={'reg'} element={<Registration />} />
        </>
      )
    }
  }

    return (
        <Layout>
            <Routes>
              <Route index element={<Notes />}/>
              {renderRoutes()}
              <Route path='*' element={<Navigate to='/' />}/>
            </Routes>
        </Layout>
    );
};

export default App;
