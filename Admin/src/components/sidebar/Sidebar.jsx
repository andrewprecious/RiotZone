import "./sidebar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="Sidebar">
      {/* desktop view */}
      <div className="desktopView">
        {/* sidebar top */}
        <div className="sidebarTop">Runway Riot</div>

        {/* sidebar bottom */}
        <div className="sidebarBottom">
          {/* sidebar header */}
          <div className="main">
            <p>Main</p>
            <div className="linkItem">
              <Link to="/dashboard">
                <i className="fa fa-th-large" aria-hidden="true"></i>
                <span>Dashboard</span>
              </Link>
            </div>
          </div>
          {/* sidebar lists */}
          <div className="list">
            <p>list</p>
            {/* first list */}
            <div className="linkItem">
              <Link to="/users">
                <i className="fa fa-users" aria-hidden="true"></i>
                <span>Users</span>
              </Link>
            </div>
            {/* second list */}
            <div className="linkItem">
              <Link to="/">
                <i className="fa fa-address-book" aria-hidden="true"></i>
                <span>Categories</span>
              </Link>
            </div>
            {/* third list */}
            <div className="linkItem">
              <Link to="/">
                <i className="fa fa-book" aria-hidden="true"></i>
                <span>Posts</span>
              </Link>
            </div>
            {/* fourth list */}
            <div className="linkItem">
              <Link to="/createCategory">
                <i className="fa fa-book" aria-hidden="true"></i>
                <span>createCategory</span>
              </Link>
            </div>
            {/* fifth list */}
            <div className="linkItem">
              <Link to="/createPost">
                <i className="fa fa-book" aria-hidden="true"></i>
                <span>create post</span>
              </Link>
            </div>
            {/* last list */}
            <div className="linkItem" id="logout">
              <Link onClick={logout}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span>Logout</span>
              </Link>
              {user && <p>{user.email}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* mobile view */}
      <div className="mobileView">
        {/* first list */}
        <div className="linkItem">
          <Link to="/user">
            <i className="fa fa-users" aria-hidden="true"></i>
            <span>Users</span>
          </Link>
        </div>
        {/* second list */}
        <div className="linkItem">
          <Link to="/">
            <i className="fa fa-address-book" aria-hidden="true"></i>
            <span>Categories</span>
          </Link>
        </div>
        {/* third list */}
        <div className="linkItem">
          <Link to="/">
            <i className="fa fa-book" aria-hidden="true"></i>
            <span>Posts</span>
          </Link>
        </div>
        {/* fourth list */}
        <div className="linkItem">
          <Link to="/">
            <i className="fa fa-sign-out" aria-hidden="true"></i>
            <span>Logout</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
