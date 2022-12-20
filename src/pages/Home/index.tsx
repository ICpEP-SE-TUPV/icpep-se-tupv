
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PageTemplate from '../PageTemplate';
import Article from '../../components/Article';
import Carousel from '../../components/Carousel';
import { ReactComponent as ArrowRightIcon } from '../../assets/arrow-right.svg';
import { IArticle } from '../../types';
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

          <div className="section articles-section pt-4">
            <h4 className="section-title">UPDATES</h4>
            <div className="articles">
              { articles }
            </div>

            <div className="section-more mt-2">
              <Link to="/articles">
                <ArrowRightIcon width={32} fill="currentColor" className="mr-2" />
                <span>Read More</span>
              </Link>
            </div>
          </div>
        </main>
      </PageTemplate>
    );
  }
}

export default Home;
