
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigateFunction } from 'react-router-dom';

import { IArticle } from '../../types';
import './style.scss';

interface ArticleWrapperProps {
  article: IArticle;
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
    return (
      <div className="article" onClick={this.redirect}>
        <div className="article-img">
          <img src={article.images[0]} alt={article.title} width={350} />
        </div>
        <h6>{ article.title }</h6>
      </div>
    );
  }
}

export default function ArticleWrapper (props: ArticleWrapperProps) {
  const navigate = useNavigate();
  return <Article {...props} navigate={navigate} />;
}
