import "./navbar.css";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();
  return (
    <div>
      <div className="Navbar">
        {/* left side */}
        <div className="left">
          <form action="">
            <input type="text" placeholder="search" />
          </form>
        </div>

        {/* right side */}
        <div className="right">
          {/* bell side */}
          <div className="bell">
            <i class="fa fa-bell-o" aria-hidden="true"></i>
            <div className="count">1</div>
          </div>
          {/* other link */}
          <i className="fa fa-moon-o" aria-hidden="true"></i>
          <img src="/avata.jpg" alt="blah" className="avata" />
          <i class="fa fa-user" aria-hidden="true"></i>
        </div>
      </div>
      {user && <p>{user.email}</p>}
    </div>
  );
};

export default Navbar;
