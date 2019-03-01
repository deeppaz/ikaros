import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  HashRouter,
  Link
} from "react-router-dom";
import Yiyecek from '../../images/yiyecekler.jpg';
import Icecek from '../../images/icecekler.png';
import Tatli from '../../images/tatlilar.jpg';


const BasicExample = () => (
  <Router>
    <HashRouter>
      <div>
        <ul>
          <h3>Buradan direk seçebilirsiniz</h3>
          <li>
            <NavLink to="/yiyecekler"><img className="" src={Yiyecek} /></NavLink>
          </li>
          <li>
            <NavLink to="/icecekler"><img className="" src={Icecek} /></NavLink>
          </li>
          <li>
            <NavLink to="/tatlilar"><img className="" src={Tatli} /></NavLink>
          </li>
        </ul>
        <hr />
      </div>
    </HashRouter>
  </Router>
);

// const Yiyecekler = () => (
//   <div>
//     <h2>Yiyecekler</h2>
//   </div>
// );

// const Icecekler = () => (
//   <div>
//     <h2>Icecekler</h2>
//   </div>
// );

// const Tatlilar = ({ match }) => (
//   <div>
//     <h2>Tatlilar</h2>
//     <ul>
//       <li>
//         <Link to={`${match.url}/sicak-tatlilar`}>Sıcak Tatlılar</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/diyet-tatlilar`}>Diyet Tatlilar</Link>
//       </li>
//       <li>
//         <Link to={`${match.url}/yeni-gelenler`}>Yeni Gelenler</Link>
//       </li>
//     </ul>
//   </div>
// );

export default BasicExample;
