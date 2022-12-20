
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Location } from '@remix-run/router';

import './style.scss';
import logo from '../../assets/logo.png';
import tupvLogo from '../../assets/tupv.png';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg';
import { ReactComponent as GitHubMark } from '../../assets/github.svg';

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
            <img src={logo} alt="ICpEP.SE TUPV Logo" width={64} height={64} className="mr-3" />
            <span>Institute of Computer Engineers of the Philippines SE - TUPV</span>
          </div>

          <nav className="page-header-nav">
            <Link to="/" className="page-header-link">HOME</Link>
            <span className="page-header-nav-separator">|</span>
            <Link to="/about" className="page-header-link">ABOUT</Link>
            <span className="page-header-nav-separator">|</span>
            <Link to="/articles" className="page-header-link">BLOG</Link>
            <span className="page-header-nav-separator">|</span>
            <Link to="/contact" className="page-header-link">CONTACT</Link>
          </nav>
        </header>

        { this.props.children }

        <footer className="page-footer">
          <div className="page-footer-brand">
            <div className="page-footer-logos">
              <img src={tupvLogo} alt="TUPV Logo" width={100} className="mr-3" />
              <img src={logo} alt="ICpEP Logo" width={100} className="mr-3" />
            </div>

            <div className="page-footer-copy">
              <Link to="/about">ICpEP.SE - TUPV</Link> 2022 All rights reserved.
            </div>
          </div>

          <div className="page-footer-section">
            <h5>Quick Links</h5>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/articles">Blog</Link>
            <Link to="/contact">Contact Us</Link>
          </div>

          <div className="page-footer-section">
            <h5>Social Medias</h5>
            <a href="https://www.facebook.com/ICpEP.seTUPV" target="_blank" rel="noreferrer">
              <FacebookIcon fill="currentColor" width={16} className="mr-2" /> Facebook
            </a>

            <a href="https://discord.gg/9T2aYmM7G4" target="_blank" rel="noreferrer">
              <DiscordIcon fill="currentColor" width={16} className="mr-2" /> Discord
            </a>

            <a href="https://github.com/ICpEP-SE-TUPV" target="_blank" rel="noreferrer">
              <GitHubMark fill="currentColor" width={16} className="mr-2" /> GitHub
            </a>
          </div>
        </footer>
      </React.Fragment>
    );
  }
}

export default function PageTemplateWrapper (props: PageTemplateWrapperProps) {
  const location = useLocation();
  return <PageTemplate {...props} location={location} />;
}
