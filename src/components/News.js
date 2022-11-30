import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const updateNews = async () => {
        props.setprogress(30);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apiKey}&pageSize=${props.pagesize}&page=${page}`;
        setLoading(true);
        let data = await fetch(url);
        let parsedData = await data.json();
        props.setprogress(70);
        console.log(parsedData);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setprogress(100);
    };

    useEffect(() => {
        document.title = `${props.catagory} - NEWS`;
        updateNews();
        // eslint-disable-next-line
    }, []);

    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.catagory}&apiKey=${props.apiKey}&pageSize=${props.pagesize}&page=${page + 1}`;
        setPage(page + 1);
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setTotalResults(parsedData.totalResults);
    };

    return (
        <>
            <div className="container">
                <h1 className="text-center" style={{ marginTop: "80px", marginBottom: "16px" }}>
                    Top {props.catagory} News Headlines
                </h1>
                {loading && <Spinner />}
                <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner />} style={{ overflow: "hidden" }}>
                    <div className="row">
                        {articles.map((element) => {
                            return (
                                <div className="col-md-4 my-3" key={element.url}>
                                    <NewsItem
                                        title={element.title}
                                        description={element.description}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author ? element.author : "unknown"}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
};

News.defaultProps = {
    country: "us",
    pagesize: 9,
    catagory: "General",
    apiKey: "e17ab16fb44e4dc8831a992f69b9cd26",
};

News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    catagory: PropTypes.string,
};

export default News;
