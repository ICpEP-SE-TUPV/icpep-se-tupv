
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Location } from '@remix-run/router';

import './style.scss';
import logo from '../../assets/logo.png';

interface PageTemplateWrapperProps {
  children: React.ReactNode;
}

interface PageTemplateProps extends PageTemplateWrapperProps {
  location: Location;
}

class PageTemplate extends React.Component<PageTemplateProps> {
  render () {
    return (
      <React.Fragment>
        <header className="page-header">
          <div className="page-header-brand">
            <img src={logo} alt="ICpEP.SE TUPV Logo" width={48} height={48} className="mr-2" />
            <span>Institute of Computer Engineers of the Philippines SE - TUPV Chapter</span>
          </div>

          <nav className="page-header-nav">
            <Link to="/" className="page-header-link">Home</Link>
            <span className="page-header-nav-separator">|</span>
            <Link to="/about" className="page-header-link">About</Link>
            <span className="page-header-nav-separator">|</span>
            <Link to="/blog" className="page-header-link">Blog</Link>
            <span className="page-header-nav-separator">|</span>
            <Link to="/contact" className="page-header-link">Contact</Link>
          </nav>
        </header>

        { this.props.children }

        <footer className="page-footer">
          Copyright &copy; 2022, <Link to="/about">ICpEP.SE TUPV</Link>
        </footer>
      </React.Fragment>
    );
  }
}

export default function PageTemplateWrapper (props: PageTemplateWrapperProps) {
  const location = useLocation();
  return <PageTemplate {...props} location={location} />;
}
