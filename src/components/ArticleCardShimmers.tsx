import React from 'react';


type ArticleCardShimmersProps = {
  count: number;
};

function ParagraphShimmer() {
  return (
    <p className='h-[7px] rounded-[3px] my-1 bg-[length:200%] animated light w-[80%]' />
  );
}

function ArticleCardShimmers({ count }: ArticleCardShimmersProps) {
  const articles = [...Array(count).keys()];
  return (
    articles.map((article) => (
      <div key={article} className="w-[250px] h-[375px] relative m-[10px] rounded-[10px] overflow-hidden  bg-[length:200%] animated light">
        <div className="absolute bottom-0 left-0 right-0 p-5 w-[80%]">
          <ParagraphShimmer />
          <ParagraphShimmer />
          <ParagraphShimmer />
        </div>
      </div>
    ))
  );
}

export default ArticleCardShimmers;
