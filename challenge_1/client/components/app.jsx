import React, {Component, Fragment} from 'react';
import Search from './search.jsx';
import Results from './results.jsx';
import ReactPaginate from 'react-paginate';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: false,
      year: '',
      era: '',
      keyword: '',

      offset: 0,
      data: [],
      perPage: 10,
      currentPage: 0
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleEraChange=this.handleEraChange.bind(this);
    this.handleYearChange=this.handleYearChange.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
    this.handleKeywordChange=this.handleKeywordChange.bind(this);
  }

  handleChange(targetId, value) {
    const newState = {}
    newState[`${targetId}`] = value;

    this.setState(newState, () => {
      console.log('updated state', this.state);
    });
  }

  handleEraChange(target) {

    this.handleChange(target.id, target.value);
  }

  handleYearChange(target) {
    if (Number.parseInt(target.value) !== NaN) {

    this.handleChange(target.id, target.value);
    }
  }

  handleKeywordChange(target) {
      this.handleChange(target.id, target.value);
  }

  handleSearch(target) {
    console.log('clicked', target);
    var parameter;
    var url;

    if (target.parentElement.id === 'date-container') {
      if (this.state.era === 'BC') {
        parameter = `-${this.state.year}`;
      } else {
        parameter = this.state.year;
      }
      console.log('parameter', parameter);
      url = `http://localhost:3000/events?date_like=${parameter}`;
    }

    if (target.parentElement.id === 'keyword-container') {
      parameter = this.state.keyword;
      url = `http://localhost:3000/events?q=${parameter}`;

    }

    Axios.get(url)
      .then((response) => {
      this.setState({data: response}, () => {
        console.log('results', this.state.data);
      });
      })
      .catch((err) => {
        console.log('error', err);
      });
  };


  render() {
    return (
      <Fragment>
        <div id='search-container'>
          < Search
            handleEraChange={this.handleEraChange}
            handleYearChange={this.handleYearChange}
            handleKeywordChange={this.handleKeywordChange}
            handleSearch={this.handleSearch}
          />
        </div>
        {this.state.results ? <div id='results-container'><Results /></div>: null}
      </Fragment>

    );
  }
}

export default App;
