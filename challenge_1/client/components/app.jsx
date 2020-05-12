import React, {Component, Fragment} from 'react';
import Search from './search.jsx';
import Results from './results.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: false,
    };
  }


  render() {
    return (
      <Fragment>
        <div id='search-container'>
          < Search />
        </div>
        {this.state.results ? <div id='results-container'><Results /></div>: null};
      </Fragment>

    );
  }
}

export default App;
