import { NewsArticle } from "../../models/AlphaVantage";
import "./NewsItem.css";

interface Props {
  newsArticle: NewsArticle;
}

const NewsItem = ({ newsArticle }: Props) => {
  return (
    <li className="NewsItem">
      <a href={newsArticle.url}>
        <img src={newsArticle.banner_image} alt={newsArticle.title} />
        <h4>{newsArticle.title}</h4>
        <p>{newsArticle.source}</p>
      </a>
    </li>
  );
};

export default NewsItem;
