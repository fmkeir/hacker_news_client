import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = (props) => {

  const articleNodes = props.articles.map(article =>{
    return <ArticleItem url={article.url} title={article.title}/>
  })

    return (
        <ul>
            {articleNodes}
        </ul>   
    );
}

export default ArticleList;
