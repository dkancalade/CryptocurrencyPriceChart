import React, {Component, Fragment} from 'react';
import DateValidator from 'datevalidator';
console.log('DateValidator', DateValidator);
import Chart from 'chart.js';
import DisplayChart from './displayChart.jsx';
import RequestChart from './requestChart.jsx';
import Axios from 'axios';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: '',
      endDate: '',
      dataIds: 0,
      dataValues: 0,
      cryptoName: 'Bitcoin',
      currencyType: '$'
    };
    this.selectCurrency = this.selectCurrency.bind(this);
    this.selectCrypto = this.selectCrypto.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.dateValidator = this.dateValidator.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.createDateLabels= this.createDateLabels.bind(this);
  }

  dateValidator(date) {
    const dateArr = date.split('/');
    let isValid = false;

    if (dateArr.length === 3) {
    const y = Number.parseInt(dateArr[2]);
    const m = Number.parseInt(dateArr[0]);
    const d = Number.parseInt(dateArr[1]);
      isValid = DateValidator.validate(y, m, d);
    }
    return isValid;
  }

  dateFormatter(date) {
    const dateArr = date.split('/');
    let yMD = [dateArr[2], dateArr[0], dateArr[1]];
    let formattedDate = yMD.join('-');
    return formattedDate;
  }

  handleDateChange(target) {
    if (target.id ==='starting-date') {
      this.setState({startDate: target.value}, () => {
        // console.log('current Start Date', this.state.startDate);
      });
    }

    if (target.id ==='ending-date') {
      this.setState({endDate: target.value}, () => {
        // console.log('current End Date', this.state.endDate);
      });
    }
  }

  selectCurrency (type) {
    this.setState({currencyType: type}, () => {
      // console.log('currency symbol', this.state.currencyType);
    });
  }

  selectCrypto (name) {
    this.setState({currencyType: name}, () => {
      // console.log('currency symbol', this.state.cryptoName);
    });
  }

  createDateLabels(dateIds) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const labels = dateIds.map((id) => {
      const datePieces = id.split('-');
      const dateLabels = datePieces.map( (piece, i) => {
        if (i === 0) {
          return piece;
        }
        if (i === 1) {
          const month = Number.parseInt(piece);
          return `${months[month - 1]},`;
        }
        if (i === 2) {
          return piece;
        }
      });
      const mDYLabel = [dateLabels[1], dateLabels[2], dateLabels[0]];
      return mDYLabel.join(' ');
    });
    return labels;
  }


  handleClick (target) {
    const validStartDate = this.dateValidator(this.state.startDate);
    const validEndDate = this.dateValidator(this.state.endDate);
    if (validStartDate && validEndDate) {
      const startDate = this.dateFormatter(this.state.startDate);
      const endDate = this.dateFormatter(this.state.endDate);
      const url = `http://localhost:4400/historicalData?start=${startDate}&end=${endDate}`;
      Axios.get(url)
        .then((data) => {
          const results = data.data;
          const keys = Object.keys(results);
          const values = keys.map((key) => {
            return results[key];
          });
          const labels = this.createDateLabels(keys);
          this.setState({dataIds: labels, dataValues: values}, () => {
           console.log(this.state);
            const chart = new Chart(document.getElementById('crypto-chart').getContext('2d'), {
              type: 'line',
              data: {
                labels: this.state.dataIds,
                datasets: [{
                  label: `my ${this.state.cryptoName} dataset`,
                  backgroundColor: 'rgb(255, 99, 132)',
                  borderColor: 'rgb(255, 99, 132)',
                  data: this.state.dataValues
                }]
              },
              options: {}
            });
          });
        })
        .catch((err)=> {
          console.log('error', err);
        });
    }
    else {
      alert('Incorrect Date, Please use mm/dd/yyyy format');
    }
  }

  render() {
    return (
      <Fragment>
        <div id='request-container'>
          <RequestChart
            selectCurrency={this.selectCurrency}
            selectCrypto={this.selectCrypto}
            handleDateChange={this.handleDateChange}
            handleClick={this.handleClick}
            />
        </div>
        <div id='display-container'>
          <DisplayChart />
        </div>
        <div id='citation'>
          <a href='https://www.coindesk.com/price/bitcoin'> 'Powered by CoinDesk'</a>
        </div>
      </Fragment>
    );
  }
}

export default App;