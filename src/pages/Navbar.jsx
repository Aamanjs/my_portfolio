import React from 'react';
import './Navbar.css';

const Navbar = () => {
    // Define your navigation links
    const navLinks = [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Education", href: "#education" },
        { name: "Projects", href: "#projects"},
        { name: "Work", href: "#work" },
        { name: "Contact", href: "#contact" },
    ];

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <span className="logo-name">Aaman</span>
            </div>
            <div className="navbar-right">
                <ul className="nav-links">
                    {navLinks.map((link) => (
                        <li key={link.name} className="nav-item">
                            <a href={link.href} className="nav-link">
                                {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;