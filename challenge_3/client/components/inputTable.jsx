import React, {Fragment} from 'react';

const inputTable = ({remainingPins, handleClick}) => {

  return (
   <table>
     <caption><h5>Select the Number of Pins, When Finished Click Restart</h5></caption>
      <thead>
        <tr>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
        </tr>
      </thead>
     <tbody onClick={(e) => { handleClick(e.target)}}>
      <tr>
        <td>0</td>
        <td>1</td>
        <td>2</td>
      </tr>
      <tr>
        <td>3</td>
        <td>4</td>
        <td>5</td>
      </tr>
      <tr>
        <td>6</td>
        <td>7</td>
        <td>8</td>
      </tr>
      <tr>
        <td>9</td>
        <td>10</td>
        <td>Restart</td>
      </tr>
     </tbody>
   </table>
  );
};

export default inputTable;