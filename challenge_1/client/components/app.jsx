import React, {Component, Fragment} from 'react';
import Search from './search.jsx';
import Results from './results.jsx';
import Axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: false,
      search: ''
    };
  }

  handleChange(target) {
    this.setState({search: target.innerText}, () => {
      console.log('search', this.state.search);
    })
  }

  handleSearchClick() {
    Axios.get('/')
  }


  render() {
    return (
      <Fragment>
        <div id='search-container'>
          < Search />
        </div>
        {this.state.results ? <div id='results-container'><Results /></div>: null}
      </Fragment>

    );
  }
}

export default App;
