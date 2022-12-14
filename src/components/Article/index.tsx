
import React from 'react';
import { useNavigate, NavigateFunction } from 'react-router-dom';
import MarkdownView from 'react-showdown';

import { IArticle } from '../../types';
import './style.scss';

interface ArticleWrapperProps {
  article: IArticle;
  detail?: string;
}

interface ArticleProps extends ArticleWrapperProps {
  navigate: NavigateFunction;
}

class Article extends React.Component<ArticleProps> {
  constructor (props: ArticleProps) {
    super(props);

    this.redirect = this.redirect.bind(this);
  }

  redirect (event: React.MouseEvent) {
    event.preventDefault();

    const article = this.props.article;
    this.props.navigate(`/article/${article.slug}`);
  }

  render () {
    const article = this.props.article;
    const detail = this.props.detail;

    return (
      <div className={`article ${detail ? 'article-detailed' : ''}`} onClick={this.redirect}>
        <div className="article-img">
          <img src={article.images[0]} alt={article.title} width={350} />
        </div>

        <div className="article-details">
          <h6>{ article.title }</h6>
          { detail &&
            <MarkdownView markdown={detail} className="article-view" />
          }
        </div>
      </div>
    );
  }
}

export default function ArticleWrapper (props: ArticleWrapperProps) {
  const navigate = useNavigate();
  return <Article {...props} navigate={navigate} />;
}
