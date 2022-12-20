
import React from 'react';
import axios from 'axios';

import PageTemplate from '../PageTemplate';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg';
import { ReactComponent as GitHubMark } from '../../assets/github.svg';
import { ReactComponent as EnvelopeIcon } from '../../assets/envelope.svg';
import './style.scss';

interface ContactProps {}

interface ContactState {
  sending: boolean;
  message: string;
  error: string;
}

class Contact extends React.Component<ContactProps, ContactState> {
  constructor (props: ContactProps) {
    super(props);

    this.state = {
      sending: false,
      message: '',
      error: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit (event: React.FormEvent) {
    event.preventDefault();
    this.setState({
      sending: true,
      message: '',
      error: ''
    });

    const target = event.target as HTMLFormElement;
    const action = target.action;
    const formData = new FormData(target);

    const response = await axios.post(action, formData, {
      headers: { Accept: 'application/json' }
    });

    const resData = response.data;
    if (resData.ok) {
      this.setState({
        sending: false,
        message: 'Message was sent.'
      });
    } else {
      this.setState({
        sending: false,
        error: resData.errors.map((error: any) => error.message).join(', ')
      })
    }
  }

  componentDidMount () {
    document.title = 'ICpEP.SE TUPV | Contact';
  }

  render () {
    return (
      <PageTemplate>
        <div className="section">
          <h4 className="section-title">Keep in Touch With Us!</h4>

          <form action="https://formspree.io/f/xaykrznj" method="post" className="form-contact" onSubmit={this.handleSubmit}>
            <p>Email: <a href="mailto:tupv.bscpe@tup.edu.ph">tupv.bscpe@tup.edu.ph</a></p>

            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" className="form-control" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" rows={5} className="form-control"></textarea>
            </div>

            {
              this.state.error &&
              <div className="box box-danger">{ this.state.error }</div>
            }

            {
              this.state.message &&
              <div className="box box-info">{ this.state.message }</div>
            }

            <button type="submit" className="btn btn-primary btn-block mt-3" disabled={this.state.sending}>
              { this.state.sending ? 'Sending...' : 'Send' }
            </button>
          </form>
        </div>

        <div className="section py-5">
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
      </PageTemplate>
    );
  }
}

export default Contact;
