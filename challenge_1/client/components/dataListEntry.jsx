import React from 'react';

const DataListEntry = ({date, description}) => (
<li className='record'>
  <h2>Date: <span>{date}</span></h2>
  <h2>Description:</h2>
  <p className='description'>{description}</p>
</li>
);


export default DataListEntry;