import React, {Fragment} from 'react';


const RequestChart = ({selectCurrency, selectCrypto, handleDateChange, handleClick}) => (
  <Fragment>
    <div id='date-range'>
      <div className='date'>
        <label htmlFor='starting-date'>Starting Date: mm/dd/yyyy</label>
        <input type='text' id='starting-date' onChange={(e) => { handleDateChange(e.target)}} ></input>
      </div>
      <div className='date'>
        <label htmlFor='ending-date'>Ending Date: mm/dd/yyyy </label>
        <input type='text' id='ending-date' onChange={(e) => { handleDateChange(e.target)}} ></input>
      </div>
    </div>
    <div id='type'>
      <select onChange={(e) => { selectCrypto(e.target.value) }} >
        <option>Bitcoin</option>
      </select>
    </div>
    <div id='currency'>
      <select onChange={(e) => { selectCurrency(e.target.value) }} >
        <option>USD</option>
        {/* <option>EUR</option>
        <option>GBP</option> */}
      </select>
    </div>
    <div id='submit-data'>
      <button onClick={(e) => {handleClick(e.target)}}>Get Me My Chart</button>
    </div>
  </Fragment>
);





export default RequestChart;