import React, {Fragment} from 'react';
import ReactPaginate from 'react-paginate';
import DataList from './dataList.jsx';

const Results = ({data, handlePageChange}) => {
  return (
    <Fragment>
      <DataList data = {data}/>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        onPageChange={(value) => {handlePageChange(value)}}
        />
    </Fragment>
  );
};

export default Results;