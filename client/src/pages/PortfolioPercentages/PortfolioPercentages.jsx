import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./PortfolioPercentages.scss";

import PortfolioContainer from "../../components/PortfolioContainer/PortfolioContainer";
import Button from "../../components/Button/Button";

import { PortfolioContext } from "../../context/PortfolioContext";

const PortfolioPercentages = () => {
  const [portfolio] = useContext(PortfolioContext);
  const [validPercentage, setValidPercentage] = useState(false);
  const [lastIndex, setLastIndex] = useState(0);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const history = useHistory();

  //Convert array of stock symbols to array of objects with stock and percentage value
  const stockArr = portfolio.stocks.split(",").map(stock => {
    return { stock: stock.trim().toUpperCase(), percentage: "" };
  });
  //input state
  const [stockData, setStockData] = useState(stockArr);

  //handle input state change
  const handleChange = (e, index) => {
    let updatedStock = [...stockData];
    updatedStock[index].percentage = e.target.value;
    setStockData(updatedStock);
    setLastIndex(index);
    setError(false);
  };

  useEffect(() => {
    if (!portfolio.stocks) {
      history.push("/portfolio/stocks");
    }
  }, []);

  //Validate that total percentage is 100%
  useEffect(() => {
    let percentTotal = 0;
    stockData.forEach(item => {
      percentTotal = percentTotal + Math.floor(item.percentage);
    });

    if (percentTotal === 100 && !validPercentage) {
      setValidPercentage(true);
    } else if (percentTotal !== 100 && validPercentage) {
      setValidPercentage(false);
    }

    //reduce if total exceeds 100%
    if (percentTotal > 100) {
      let totalMinusLastIndex = percentTotal - stockData[lastIndex].percentage;
      let updatedStock = [...stockData];
      updatedStock[lastIndex].percentage = 100 - totalMinusLastIndex;
      setStockData(updatedStock);
      setError(true);
    }
  }, [stockData, validPercentage, lastIndex, setError]);

  const handleSubmit = async event => {
    event.preventDefault();
    let data = {
      name: portfolio.name,
      date: portfolio.date,
      investment: portfolio.investment,
      stocks: stockData
    };

    if (validPercentage) {
      await axios
        .post("http://localhost:3001/api/v1/portfolio/history", data)
        .then(response => {
          history.push(`/portfolio/history/${response.data.portfolioId}`);
        })
        .catch(e => {
          setLoading(false);
          setErrMsg(e);
        });
    }
  };

  return (
    <div className="page">
      <PortfolioContainer back>
        <h3 className="portfolio-percentages__heading">What percentage of your investment was allocated to each stock?</h3>
        {loading ? (
          <div className="portfolio-percentages__loading"></div>
        ) : (
          <form onSubmit={handleSubmit} className="portfolio-percentages__form">
            {errMsg && <span className="portfolio-percentages__error">{errMsg.message}</span>}
            {error && <span className="portfolio-percentages__error">You exceeded 100% and the value of your last input was reduced.</span>}

            {stockData.map((data, index) => (
              <div className="portfolio-percentages__input__wrapper" key={index} data-stock={data.stock}>
                <input
                  className="portfolio-percentages__input"
                  type="number"
                  name={data.stock}
                  max={100}
                  min="1"
                  value={data.percentage}
                  index={index}
                  onChange={event => handleChange(event, index)}
                />
              </div>
            ))}
            <Button btnText="Get History" btnStyle="primary" addClass={`${!validPercentage && "disabled"}`} />
          </form>
        )}
      </PortfolioContainer>
    </div>
  );
};

export default PortfolioPercentages;
