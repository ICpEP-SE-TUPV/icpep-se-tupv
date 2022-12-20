
import React from 'react';
import axios from 'axios';

import PageTemplate from '../PageTemplate';
import { IArticle } from '../../types';
import Article from '../../components/Article';
import Loader from '../../components/Loader';
import './style.scss';

interface ArticlesProps {}

interface CurrentArticles {
  year: string;
  articles: IArticle[];
  details: string[];
}

interface ArticlesState {
  updates: string[];
  years: string[];
  currentYear: string;
  articles: CurrentArticles;
}

class Articles extends React.Component<ArticlesProps, ArticlesState> {
  constructor (props: ArticlesProps) {
    super(props);

    this.state = {
      updates: [],
      years: [],
      currentYear: '',
      articles: {
        year: '',
        articles: [],
        details: []
      }
    };

    this.updateYear = this.updateYear.bind(this);
  }

  async componentDidMount () {
    document.title = 'ICpEP.SE TUPV | Articles';

    const updatesRes = await axios.get('/data/updates.json');
    const updates: string[] = updatesRes.data;
    const years: string[] = [];

    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      const split = update.split('/');
      const year = split[2];

      if (!years.includes(year)) years.push(year);
    }

    this.setState({ updates, years, currentYear: years[0] });
  }

  async componentDidUpdate () {
    const currentYear = this.state.currentYear;
    if (currentYear === this.state.articles.year) return;

    const articles: IArticle[] = [];
    const details: string[] = [];
    const updates = this.state.updates.filter((update) => {
      const split = update.split('/');
      return split[2] === currentYear;
    });

    for (let i = 0; i < updates.length; i++) {
      const update = updates[i];
      const articleRes = await axios.get(`${update}.json`);
      const article: IArticle = articleRes.data;
      const detailRes = await axios.get(article.description);
      const detail = detailRes.data;

      articles.push(article);
      details.push(detail);
    }

    this.setState({
      articles: { year: currentYear, articles, details }
    });
  }

  updateYear (year: string) {
    return (event: React.MouseEvent) => {
      event.preventDefault();
      this.setState({ currentYear: year });
    }
  }

  render () {
    const articles: React.ReactNode[] = [];
    for (let i = 0; i < this.state.articles.articles.length; i++) {
      const article = this.state.articles.articles[i];
      const detail = this.state.articles.details[i];
      articles.push(<Article article={article} detail={detail} key={i} />);
    }

    return (
      <PageTemplate>
        <main className="articles-main mb-5">
          <div className="articles-years">
            { this.state.years.map((year, i) => <div onClick={this.updateYear(year)} key={i}>{ year }</div>) }
          </div>

          <div className="articles-list">
            { articles.length > 0 ? articles : <Loader /> }
          </div>
        </main>
      </PageTemplate>
    )
  }
}

export default Articles;
