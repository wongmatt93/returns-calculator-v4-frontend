import NewsArticle from "../../models/NewsArticle";
import "./NewsContainer.css";
import NewsItem from "./NewsItem";

interface Props {
  stockNews: NewsArticle[];
}

const NewsContainer = ({ stockNews }: Props) => {
  return (
    <section className="NewsContainer">
      <h3>News</h3>
      <ul>
        {stockNews.map((newsArticle, index) => (
          <NewsItem
            key={`${newsArticle.title} ${index}`}
            newsArticle={newsArticle}
          />
        ))}
      </ul>
    </section>
  );
};

export default NewsContainer;
