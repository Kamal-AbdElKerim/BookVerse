import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('access_token');
      navigate('/login');
  };
  return (
  








<header className="header navbar-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="nav-inner">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <img src="assets/images/logo/logo.svg" alt="Logo" />
                </a>
                <button
                  className="navbar-toggler mobile-menu-btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li class="nav-item text-center ">
                    <Link  to="/home">Home</Link>

                  
                    </li>
                 
                  </ul>
                </div>
              
              </nav>
            </div>
          </div>
        </div>
        {/* row */}
      </div>
      {/* container */}
    </header>










  )
}
