import React, {Component} from 'react';
import ArticleList from '../Components/ArticleList';
import ControlPanel from '../Components/ControlPanel';

class NewsContainer extends Component {
    constructor(props) {
        super(props);
        this.state ={
            articleIds: [],
            pageNumber: 0,
            itemsPerPage: 10,
            displayArticles: []
        }
        this.fetchDisplayArticles = this.fetchDisplayArticles.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    componentDidMount() {
        const idUrl = "https://hacker-news.firebaseio.com/v0/topstories.json"
        fetch(idUrl)
        .then(res => res.json())
        .then(articleIds => {
            this.setState({articleIds})
            this.fetchDisplayArticles(this.state.pageNumber, this.state.itemsPerPage)
        })
        .catch(error => console.error)
    }

    fetchDisplayArticles(pageNumber, itemsPerPage) {
        const firstArticle = pageNumber * itemsPerPage;
        const lastArticle = firstArticle + itemsPerPage;
        const articleUrls = this.state.articleIds.slice(firstArticle, lastArticle).map(articleId => {
            return (`https://hacker-news.firebaseio.com/v0/item/${articleId}.json`)
        })
        

        Promise.all(articleUrls.map(url => 
            fetch(url)
            .then(res => res.json())
        ))
        .then(results => this.setState({displayArticles: results}))
    }

    handlePageChange(direction) {
        const newPageNumber = this.state.pageNumber + direction;
        console.log(this.state.itemsPerPage);
        const lastPage = (this.state.articleIds.length / this.state.itemsPerPage) - 1;
        if (newPageNumber < 0 || newPageNumber > lastPage) {
            return
        }
        this.fetchDisplayArticles(newPageNumber, this.state.itemsPerPage);
        this.setState({pageNumber: newPageNumber});
    }

    handleItemChange(number) {
        const newItemsPerPage = number;
        const newPageNumber = 0;
        this.fetchDisplayArticles(newPageNumber, newItemsPerPage);
        this.setState({
            pageNumber: newPageNumber,
            itemsPerPage: newItemsPerPage
        });
    }

    render() {
        return (
            <>
                <h1>Hacker News Client</h1>
                <ControlPanel 
                    onPageChange={this.handlePageChange} 
                    onItemPerPageChange={this.handleItemChange}/>
                <ArticleList articles={this.state.displayArticles}/>
            </>
        )
    }
}

export default NewsContainer;