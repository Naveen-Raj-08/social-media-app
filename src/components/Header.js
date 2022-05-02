import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

export const Header = () => {

  const [Loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    setLoading(true);
    setTimeout(() => {
      navigate("/login");
      setLoading(false)
    }, 2000);
  }

  return (
    <div className="page__header">
      <div className="row align-items-center">
        <div className="col-md-3">
          <div className="logo">[logo]</div>
        </div>
        <div className="col-md-9">
          <nav className="d-flex justify-content-end">
            <ul className="list list-unstyled d-flex align-items-center">
              <li className="link mx-2">
                <Link to="/profile">My Profile</Link>
              </li>
              <li className="link mx-2">
                <Button varient="primary" className={Loading ? "disabled" : null} onClick={handleLogout} >
                  {
                    Loading ? <span className="spinner-border spinner-border-sm"></span> : null
                  } Log out
                </Button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};
