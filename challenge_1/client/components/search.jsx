import React, {Fragment} from 'react';

const Search = ({handleEraChange, handleYearChange, handleKeywordChange, handleSearch}) => (
  <Fragment>
    <div id='date-container'>
      <label htmlFor='year'>Enter Year &nbsp;</label>
      <input type='text' id='year' onChange={(e) => { handleYearChange(e.target) }}></input>
      <select id='era' onChange={(e) => {handleEraChange(e.target)}}>
        <option value='BC'>BC</option>
        <option value='AD'>AD</option>
      </select>
      <button type="button" onClick={(e) => {handleSearch(e.target)}} >Search</button>
    </div>
    <div id='keyword-container'>
      <label htmlFor="keyword">Enter Keyword/s &nbsp;</label>
      <input type='text' id='keyword' onChange={(e) => { handleKeywordChange(e.target) }}></input>
    <button type="button" onClick={(e) => {handleSearch(e.target)}} >Search</button>
    </div>
  </Fragment>
);

export default Search;