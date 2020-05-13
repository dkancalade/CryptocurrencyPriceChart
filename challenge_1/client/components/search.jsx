import React, {Fragment} from 'react';

const Search = (props) => (
  <Fragment>
    <div id='date-container'>
      <label htmlFor='search-by-year'>Enter Year &nbsp;</label>
      <input type='text' id='search-by-year'></input>
      <select id='era'>
        <option value='BC'>BC</option>
        <option value='AD'>AD</option>
      </select>
      <button type="button">Search</button>
    </div>
    <div id='keyword-container'>
      <label htmlFor="search-by-keyword">Enter Keyword/s &nbsp;</label>
      <input type='text' id='search-by-keyword'></input>
    <button type="button">Search</button>
    </div>
  </Fragment>
);

export default Search;