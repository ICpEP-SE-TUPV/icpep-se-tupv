
import React from 'react';
import { useParams } from 'react-router-dom';
import MarkdownView from 'react-showdown';
import axios from 'axios';

import { IArticle } from '../../types';
import PageTemplate from '../PageTemplate';
import Loader from '../../components/Loader';
import './style.scss';

interface ArticleWrapperProps {}

interface ArticleProps {
  year?: string;
  slug?: string;
}

interface ArticleState {
  article: IArticle | null;
  markdown: string;
}

class Article extends React.Component<ArticleProps, ArticleState> {
  constructor (props: ArticleProps) {
    super(props);

    this.state = {
      article: null,
      markdown: ''
    };
  }

  async componentDidMount () {
    const year = this.props.year;
    const slug = this.props.slug;
    if (!year || !slug) return;

    const articleRes = await axios.get(`/data/${year}/${slug}.json`);
    const article: IArticle = articleRes.data;
    const descriptionRes = await axios.get(article.description);
    const descriptionMd = descriptionRes.data;

    document.title = `ICpEP.SE TUPV | ${article.title}`;
    this.setState({ article, markdown: descriptionMd });
  }

  render () {
    const images: React.ReactNode[] = [];
    const article = this.state.article;
    const markdown = this.state.markdown;
    if (!article) return <Loader />;

    const widthPercentage = 100 / article.images.length;
    const imageStyle = { maxWidth: `calc(${widthPercentage}% - 16px)` };
    for (let i = 0; i < article.images.length; i++) {
      const image = article.images[i];
      images.push(<img src={image} alt={`${article.title} #${i}`} style={imageStyle} key={i} />);
    }

    const dateObj = new Date(article.date);
    const date = dateObj.toDateString();

    return (
      <PageTemplate>
        <main>
          <div className="section">
            <h4 className="section-title section-title-long">{ article.title }</h4>

            <div className="article-images">{ images }</div>
            <div className="article-markdown">
              <MarkdownView markdown={markdown} />
              <p>Date: { date }</p>
            </div>
          </div>
        </main>
      </PageTemplate>
    );
  }
}

export default function ArticleWrapper (props: ArticleWrapperProps) {
  const params = useParams();
  return params.slug ? <Article {...props} year={params.year} slug={params.slug} /> : <React.Fragment />;
}
