
import React from 'react';
import axios from 'axios';

import PageTemplate from '../PageTemplate';
import Article from '../../components/Article';
import Carousel from '../../components/Carousel';
import { IArticle } from '../../types';
import { ReactComponent as FacebookIcon } from '../../assets/facebook.svg';
import { ReactComponent as DiscordIcon } from '../../assets/discord.svg';
import { ReactComponent as GitHubMark } from '../../assets/github.svg';
import { ReactComponent as EnvelopeIcon } from '../../assets/envelope.svg';
import './style.scss';

interface HomeProps {}

interface HomeState {
  articles: IArticle[];
}

class Home extends React.Component<HomeProps, HomeState> {
  constructor (props: HomeProps) {
    super(props);

    this.state = {
      articles: []
    };
  }

  async componentDidMount () {
    document.title = 'ICpEP.SE TUPV';

    const articles: IArticle[] = [];
    const allRes = await axios.get('/data/updates.json');
    const all = allRes.data;

    for (let i = 0; i < all.length && i < 6; i++) {
      const article = all[i];
      const date = new Date();
      const timestamp = Math.floor(date.getTime() / 1000);
      const articleRes = await axios.get(`${article}.json?t=${timestamp}`);
      articles.push(articleRes.data);
    }

    this.setState({ articles });
  }

  render () {
    const articles: React.ReactNode[] = [];
    const banners: string[] = [];

    for (let i = 0; i < this.state.articles.length; i++) {
      const article = this.state.articles[i];
      articles.push(<Article article={article} key={i} />);
      banners.push(article.images[0]);
    }

    return (
      <PageTemplate>
        <main>
          <div className="section">
            <Carousel images={banners} />
          </div>

          <div className="section pt-4">
            <h4 className="section-title">UPDATES</h4>
            <div className="articles">
              { articles }
            </div>
          </div>

          <div className="section pt-4">
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
        </main>
      </PageTemplate>
    );
  }
}

export default Home;
