import React, {Fragment} from 'react';
import DataListEntry from './dataListEntry.jsx';




const DataList = ({data}) => {
  const createList = (data) => {

    const list = data.map((datum, i) => (
      <div key={i.toString()}>
        <DataListEntry date={datum.date} description={datum.description}/>
      </div>
    ));

    return list;
  };
  return (
    <ol id='recordsList'>
      {createList(data)}
    </ol>
  );

};


export default DataList;
