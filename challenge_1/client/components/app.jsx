import React, {Component, Fragment} from 'react';
import Search from './search.jsx';
import Results from './results.jsx';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      era: '',
      keyword: '',
      offset: 1,
      data: false,
      perPage: 10,
      currentSearchType: ''
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleEraChange=this.handleEraChange.bind(this);
    this.handleYearChange=this.handleYearChange.bind(this);
    this.handleSearch=this.handleSearch.bind(this);
    this.handleKeywordChange=this.handleKeywordChange.bind(this);
    this.handlePageChange=this.handlePageChange.bind(this);
  }

  handleChange(targetId, value) {
    const newState = {}
    newState[`${targetId}`] = value;

    this.setState(newState, () => {
      // console.log('updated state', this.state);
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

  handleSearch(target, id) {
    var container;
    var page = this.state.offset;
    if (target === null) {
      container = id;
    } else {
      container = target.parentElement.id
      this.setState({offset: 1});
      page = 1;
    }
    const limit = this.state.perPage;
    var parameter;
    var url;

    if (container === 'date-container') {
      this.setState({currentSearchType: 'date'});
      if (this.state.era === 'BC') {
        parameter = `-${this.state.year}`;
      } else {
        parameter = this.state.year;
      }
      url = `http://localhost:3000/events?date_like=${parameter}&_limit=${limit}&_page=${page}`;
    }

    if (container === 'keyword-container') {
      this.setState({currentSearchType: 'keyword'});
      parameter = this.state.keyword;
      console.log('keyword page', page);
      url = `http://localhost:3000/events?q=${parameter}&_limit=${limit}&_page=${page}`;
    }
    Axios.get(url)
      .then((response) => {
      this.setState({data: response.data}, () => {
        console.log('results', this.state.data);
      });
      })
      .catch((err) => {
        console.log('error', err);
      });
  };

  handlePageChange(value) {
    var parentElementId;
    this.setState({offset: value.selected + 1}, () => {
      if (this.state.currentSearchType === 'date') {
        parentElementId = 'date-container';
      }
      if (this.state.currentSearchType === 'keyword') {
        parentElementId = 'keyword-container';
      }
        this.handleSearch(null, parentElementId);
    });
  }

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
        <div id='results-container'>
        {this.state.data ? <Results data={this.state.data} handlePageChange={this.handlePageChange} />: null}
        </div>
      </Fragment>
    );
  }
}

export default App;
