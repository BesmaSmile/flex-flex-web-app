import React from 'react';
import './style.scss';

function ArticleCardShimmers({ count }) {
  const articles = [...Array(count).keys()];
  return (
    articles.map((article) => (
      <div key={article} className="article-card-shimmer">
        <div className="article-card-title">
          <p />
          <p />
          <p />
        </div>
      </div>
    ))
  );
}

export default ArticleCardShimmers;
