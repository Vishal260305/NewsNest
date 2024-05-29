import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';





const News = (props) => {
    const [articles , setArticles] = useState([])
    const [loading , setLoading] = useState(true)
    const [page , setPage] = useState(1)
    const [totalResults , setTotalresults] = useState(0)
    

    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);

    }
    
    const updateNews = async () => {
        props.setProgress(10)
        setLoading(true)
        const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=ac15b476c3084a16b65eeff31829c165&page=1&page=${page}&pageSize=${props.pageSize}`
        let data = await fetch(url);
        props.setProgress(30)
        let parsedData = await data.json()
        props.setProgress(70)
        console.log(parsedData)
        setArticles(parsedData.articles)
        setTotalresults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100)
    }
    
    useEffect(() => {
        updateNews();
        // es-lint disable-next-line
        /*eslint no-unused-expressions: ["error", { "allowTernary": true }]*/


         document.title = `${capitalize(props.category)} - NewsNest`
    } , [])
    

    const handlePrevClick = async () => {
        // console.log("prev");
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=ed87a35f3419407aab527fbddcd8220e&page=${this.state.page - 1}&pageSize=${props.pageSize}`
        // this.setState({loading : true})
        // let data = await fetch(url);
        // let parsedData = await data.json()
        // this.setState({
        //     page : this.state.page - 1,
        //     articles: parsedData.articles,
        //     loading: false
        // })

        
        setPage(page - 1)
        updateNews();
    }

    const handleNextClick = async () => {
        // console.log("next");
        // if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)))
        // {
        //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=ed87a35f3419407aab527fbddcd8220e&page=${this.state.page + 1}&pageSize=${props.pageSize}`
        //     this.setState({loading:true});
        //     let data = await fetch(url);
        //     let parsedData = await data.json()
        //     this.setState({
        //         page : this.state.page + 1,
        //         articles: parsedData.articles,
        //         loading:false
        //     })

        // }
       setPage(page + 1)
       updateNews();

        
    }

    const fetchMoreData = async () => {
        if (articles.length < totalResults) { // Check if there are more articles available
            const url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=ac15b476c3084a16b65eeff31829c165&page=${page + 1}&pageSize=${props.pageSize}`;
            setPage(page + 1);
            
            let data = await fetch(url);
            let parsedData = await data.json();
            
            setArticles(articles.concat(parsedData.articles));
            setTotalresults(parsedData.totalResults);
        }
    };

   
        return (
                <>
                <h2 className='text-center'>NewsNest - Top Headlines from {capitalize(props.category)}</h2>
                {loading && <Spinner/>}
                <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner/>}
>
                <div className="conatiner">
                <div className="row">
                {articles.map((element) => {
                    console.log(element)
                    return <div className="col md-4" key={element.url}>
                        <NewsItem author={element.author} date={element.publishedAt} title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} />
                    </div>
                })}
                </div>
                </div>
                </InfiniteScroll>
                </>
                


            
        )
    
    
}
News.defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general"
}

News.propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,
}


export default News
