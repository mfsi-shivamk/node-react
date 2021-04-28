import React from 'react'

function Header() {
    return (
        <div className="header">
        <ul>
          <li key="home"><a href="#home">Home</a></li>
          <li key="news"><a href="#news">News</a></li>
          <li className="dropdown">
            <a href="javascript:void(0)" className="dropbtn">Dropdown</a>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </li>
        </ul>
        </div>
    )
}

export default Header
