import React, { Component } from 'react';
import AppSearchBar  from './AppSearchBar';
import GifList from './GifList';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previousQuery: '',
      result: [],
      query: '',
      querying: false
    };
    this.setQueryHistory = this.setQueryHistory.bind(this);
    this.setResultData = this.setResultData.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.queryGiphyApi = this.queryGiphyApi.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.calcOffset = this.calcOffset.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  calcOffset = (currentData, previousQuery, query) => {
    return query === previousQuery ? currentData.length : 0;
  }

  queryGiphyApi = () => {
    this.setState({querying: true});
    const {query, previousQuery, result} = this.state;
    let trendURL = new URL('https://api.giphy.com/v1/gifs/search');
    let params = {
      api_key: '70G0anIuZda7OGg6eRk8p7HkarutnJfG',
      fmt: 'json',
      limit: 20,
      offset: this.calcOffset(result, previousQuery, query),
      q: this.state.query
    };

    Object.keys(params).forEach(key => trendURL.searchParams.append(key, params[key]));

    fetch(trendURL, {
      method: 'GET',
      mode: 'cors',
    }).then((response) => {
      return response.json();
    }).then((body) => {
      this.setResultData(body.data);
    })
  }

  handleOnChange = (e) => {
    this.setState({
      query: e.target.value
    });
  }

  handleScroll() {
    const windowHeight = window.innerHeight ? window.innerHeight : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 500 && !this.state.querying) {
      this.queryGiphyApi()
    } 
  }
  
  scrollToTop = () => {
    window.scroll(0,0);
  }

  setResultData = (data) => {
    const {query, previousQuery} = this.state
    let currentData = this.state.result;
    if (query === previousQuery) {
      currentData = currentData.concat(data);
      this.setState({
        result: currentData,
        querying: false
      });
    } else {
      this.setState({
        result: data,
        querying: false,
      });
      this.setQueryHistory(query);
      this.scrollToTop();
    }
  }

  setQueryHistory = (string) => {
    this.setState({previousQuery: string});
  }

  render() {
    const { query, result } = this.state;
    let listOfGif;
    
    if (result.length) {
      listOfGif = <GifList gifList={result} />
      return (
        <div className="App">
          <AppSearchBar handleOnChange={this.handleOnChange} queryGiphyApi={this.queryGiphyApi} />
          {listOfGif}
        </div>
      )
    } else {
      return (
        <div className="App">
          <AppSearchBar handleOnChange={this.handleOnChange} queryGiphyApi={this.queryGiphyApi} />        
        </div>
      )
    }
  }
}

export default App;
