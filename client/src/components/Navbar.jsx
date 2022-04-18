import {NavLink} from "react-router-dom";
import logo from '../assets/favicon.jfif';
import './Navbar.scss'
import {useAuth} from "../shared/AuthContext";

const Navbar = () => {
  const {auth} = useAuth();

  const links = [{to: '/', name: 'Notes'}];
  const signedOutLinks = [
    {to: 'auth', name: 'Auth'},
    {to: 'reg', name: 'Registration'}
  ]
  const signedInLinks = [
    {to: 'addNote', name: 'Add note'},
    {to: 'profile', name: 'Profile'},
    {to: 'logout', name: 'Logout'},
  ];

  auth ? links.push(...signedInLinks) : links.push(...signedOutLinks);

  return (
    <nav>
      <ul>
        <li>
          <NavLink to={'/'}>
            <img src={logo} style={{borderRadius: '50%', height: 30}} alt="icon" />
          </NavLink>
        </li>
        {links.map((link, index) => {
          return (
            <li key={index}>
              <NavLink to={link.to}>{link.name}</NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
