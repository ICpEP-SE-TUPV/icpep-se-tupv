
import React from 'react';

import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg';
import { ReactComponent as GitHubMark } from '../../assets/github.svg';
import { ReactComponent as EnvelopeIcon } from '../../assets/envelope.svg';
import './style.scss';

class Socials extends React.Component {
  render () {
    return (
      <div className="section pt-5">
        <h4 className="section-title">SOCIAL MEDIAS</h4>
        <div className="socials">
          <a href="https://www.facebook.com/ICpEP.seTUPV" target="_blank" rel="noreferrer">
            <FacebookIcon width={56} fill="currentColor" />
          </a>

          <a href="https://discord.gg/9T2aYmM7G4" target="_blank" rel="noreferrer">
            <DiscordIcon width={56} fill="currentColor" />
          </a>

          <a href="https://github.com/ICpEP-SE-TUPV" target="_blank" rel="noreferrer">
            <GitHubMark width={56} fill="currentColor" />
          </a>

          <a href="mailto:tupv.bscpe@tup.edu.ph">
            <EnvelopeIcon width={56} fill="currentColor" />
          </a>
        </div>
      </div>
    )
  }
}

export default Socials;
