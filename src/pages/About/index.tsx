
import React from 'react';
import axios from 'axios';

import PageTemplate from '../PageTemplate';
import Officer from '../../components/Officer';
import { IOfficer } from '../../types';
import './style.scss';

interface AboutProps {}

interface AboutState {
  year: string;
  adviser: IOfficer | null;
  officers: IOfficer[];
  development: IOfficer[];
}

class About extends React.Component<AboutProps, AboutState> {
  constructor (props: AboutProps) {
    super(props);

    this.state = {
      year: '',
      adviser: null,
      officers: [],
      development: []
    };
  }

  async componentDidMount () {
    document.title = 'ICpEP.SE TUPV | About';

    const date = new Date();
    const timestamp = Math.floor(date.getTime() / 1000);
    const adviserRes = await axios.get(`/data/adviser.json?t=${timestamp}`);
    const officersRes = await axios.get(`/data/officers.json?t=${timestamp}`);
    const devRes = await axios.get(`/data/development.json?t=${timestamp}`);
    const adviser = adviserRes.data;
    const officers = officersRes.data;
    const development = devRes.data;

    this.setState({
      year: officers.year,
      adviser,
      officers: officers.officers,
      development
    });
  }

  render () {
    const adviser = this.state.adviser;
    const officers: React.ReactNode[] = [];
    const development: React.ReactNode[] = [];

    for (let i = 0; i < this.state.officers.length; i++) {
      const officer = this.state.officers[i];
      officers.push(<Officer officer={officer} key={i} />);
    }

    for (let i = 0; i < this.state.development.length; i++) {
      const dev = this.state.development[i];
      development.push(<Officer officer={dev} label="Role" key={i} />);
    }

    return (
      <PageTemplate>
        <main>
          <div className="section">
            <h4 className="section-title">ABOUT</h4>

            <div className="subsection">
              <h5>Our Mission</h5>
              <p>
                The Institute of Computer Engineers of the Philippines Student Edition (ICpEP.SE) is
                committed in bridging the gap between the industry and the academe by empowering the
                interests, welfare, and ideals of its members, developing a strong and harmonious
                foundation within its community, and professionalizing the skills of its officers and members
                for global competitiveness and national progression
              </p>
            </div>

            <div className="subsection">
              <h5>Our Vision</h5>
              <p>
                The Institute of Computer Engineers of the Philippines Student Edition (ICpEP.SE)
                envisions itself as the foundation of world class computer engineers and motivator of
                students' interests towards excellence in Computer Engineering as their field of
                specialization.
              </p>
            </div>
          </div>

          <div className="section pt-5">
            <h4 className="section-title">Officers of Academic Year { this.state.year }</h4>
            <div className="people">
              { adviser && <Officer officer={adviser} /> }
            </div>

            <div className="people">
              { officers }
            </div>
          </div>

          <div className="section pt-5">
            <h4 className="section-title">Website Development</h4>
            <div className="people">{ development }</div>
          </div>
        </main>
      </PageTemplate>
    );
  }
}

export default About;
