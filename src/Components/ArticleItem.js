import React from 'react';

const ArticleItem = (props) => {

  return (
    <li>
      <a href={props.url}> 
        {props.title}  
      </a>
    </li>
  )
}

export default ArticleItem;