import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserTie, FaGraduationCap, FaBookOpen, FaChartBar, FaCog } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="logo">DeepAssist</h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaHome className="nav-icon" />
          <span>Home</span>
        </NavLink>
        
        <NavLink to="/interview" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaUserTie className="nav-icon" />
          <span>Interview Prep</span>
        </NavLink>
        
        <NavLink to="/courses" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaGraduationCap className="nav-icon" />
          <span>Courses</span>
        </NavLink>
        
        <NavLink to="/resources" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaBookOpen className="nav-icon" />
          <span>Resources</span>
        </NavLink>
        
        <NavLink to="/progress" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaChartBar className="nav-icon" />
          <span>Progress</span>
        </NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <NavLink to="/settings" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
