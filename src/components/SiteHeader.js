import React from 'react'
import { Link } from 'react-router-dom'

export default function siteHeader() {
  return (
    <div className='site-header'>
      <div>
  {/*Main Navigation*/}
  <header>
    {/* Sidebar */}
    <nav id="sidebarMenu" className="collapse d-lg-block sidebar collapse bg-white">
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <a href="/customer" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-chart-bar fa-fw me-3" /><span>Customers</span></a>
          <a href="/travelpackage" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-globe fa-fw me-3" /><span>Package Travel</span></a>
          <a href="/order" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-building fa-fw me-3" /><span>Order</span></a>
          <a href="#" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-calendar fa-fw me-3" /><span>OrderDetail</span></a>
        </div>
      </div>
    </nav>
    {/* Sidebar */}
    {/* Navbar */}
    <nav id="main-navbar" className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
      {/* Container wrapper */}
      <div className="container-fluid">    
        {/* Right links */}
        <ul className="navbar-nav ms-auto d-flex flex-row">
          {/* Notification dropdown */}
          <a href="https://www.travelia.id" className="list-group-item list-group-item-action py-2 ripple"><i className="fas fa-globe fa-fw me-3" /><span>International TRAVELIA</span></a>
        </ul>
      </div>
      {/* Container wrapper */}
    </nav>
    {/* Navbar */}
  </header>
  {/*Main Navigation*/}
  {/*Main layout*/}
  <main style={{marginTop: 58}}>
    <div className="container pt-4">
    </div>
  </main>
  {/*Main layout*/}
</div>

      {/* <Link to="/">
        <h1>
          Travelnia
        </h1>
      </Link> */}
    </div>
  )
}
