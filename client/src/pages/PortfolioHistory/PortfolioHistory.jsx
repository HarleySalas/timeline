import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./PortfolioHistory.scss";

import PortfolioContainer from "../../components/PortfolioContainer/PortfolioContainer";
import Chart from "../../components/Chart/Chart";
import Button from "../../components/Button/Button";

const PortfolioHistory = props => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  //Fetch Portfolio History
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/v1/portfolio/history/${props.match.params.id}`)
      .then(result => {
        setData(result.data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [props.match.params.id]);

  //Create string from Portfolio History data to be written in component
  //ex output "$10,000 in AMZN, and $15,000 in AAPL"
  const getInvestments = () => {
    let arr = [];

    Object.keys(data.stocks).forEach(key => {
      arr.push(
        `$${((parseFloat(data.stocks[key].investmentPercent) / 100) * parseFloat(data.investment)).toLocaleString("en-US")} in ${key}`
      );
    });

    if (arr.length > 1) {
      let last = arr.pop();
      arr.push(`and ${last}`);
    }

    return arr.join(", ");
  };

  //returns total current value of all stocks in data
  const getTotalValue = () => {
    let valueArr = [];

    Object.keys(data.stocks).forEach(key => {
      valueArr.push(
        parseFloat(
          ((data.stocks[key].investmentPercent / 100) *
            parseFloat(data.investment) *
            getPercentIncrease(data.stocks[key].startPrice, data.stocks[key].endPrice)) /
            100
        )
      );
    });

    return valueArr.reduce((acc, val) => {
      return acc + val;
    }, 0);
  };

  //returns an array of each stock's percentage gain
  const getPercentArr = () => {
    let arr = [];

    Object.keys(data.stocks).forEach(key => {
      arr.push(getPercentIncrease(parseFloat(data.stocks[key].startPrice), parseFloat(data.stocks[key].endPrice)));
    });

    return arr;
  };

  //receives two numbers and returns the percentage of increase
  const getPercentIncrease = (a, b) => {
    let percent;
    if (b !== 0) {
      if (a !== 0) {
        percent = ((b - a) / a) * 100;
      } else {
        percent = b * 100;
      }
    } else {
      percent = -a * 100;
    }
    return Math.floor(percent);
  };

  return (
    <div className="page">
      <PortfolioContainer>
        {loading && <div className="portfolio-history__loading"></div>}
        {data && !error && (
          <>
            <h1 className="portfolio-history__heading">Portfolio History</h1>
            <span className="portfolio-history__subheading">
              If {data.name} invested {getInvestments()} on {moment(new Date(data.startDate)).format("MMMM Do YYYY")}, today it'd be worth a
              total of <strong>${getTotalValue().toLocaleString("en-US")}</strong>.
            </span>
            <div className="portfolio-history__data-wrapper">
              <div className="portfolio-history__data-wrapper__left">
                <h3 className="portfolio-history__chart-heading">Percentage Increase</h3>
                <Chart labels={Object.keys(data.stocks)} data={getPercentArr()} />
              </div>
              <div className="portfolio-history__data-wrapper__right">
                <div className="portfolio-history__data-block">
                  <span className="portfolio-history__data-title">Current Value:</span>
                  <span className="portfolio-history__data-value">${getTotalValue().toLocaleString("en-US")}</span>
                </div>
                <div className="portfolio-history__data-block">
                  <span className="portfolio-history__data-title">Total Growth:</span>
                  <span className="portfolio-history__data-value">
                    {getPercentIncrease(data.investment, getTotalValue()).toLocaleString("en-US")}%
                  </span>
                </div>
              </div>
            </div>

            <Button
              btnText="Share (Copy URL)"
              btnStyle="primary"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
            />
          </>
        )}
        {error && (
          <div>
            <h3>{error}</h3>
          </div>
        )}
      </PortfolioContainer>
    </div>
  );
};

export default PortfolioHistory;
