import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import "./PortfolioDate.scss";
import SelectDatepicker from "react-select-datepicker";

import PortfolioContainer from "../../components/PortfolioContainer/PortfolioContainer";
import Button from "../../components/Button/Button";
import { PortfolioContext } from "../../context/PortfolioContext";

const PortfolioDate = () => {
  const [portfolio, setPortfolio] = useContext(PortfolioContext);
  const history = useHistory();
  const [date, setDate] = useState({ value: portfolio.date });
  const [validDate, setValidDate] = useState(false);
  const [error, setError] = useState(false);

  const onDateChange = date => {
    setDate({ value: date });
  };

  const isValidDate = date => {
    return date instanceof Date && !isNaN(date);
  };

  //If user visits page before entering their name, redirect them.
  useEffect(() => {
    if (!portfolio.name) {
      history.push("/portfolio/name");
    }
  });

  //Ensure input is a valid date, and that it's a week day.
  //Trade API does not work for data on weekends.
  useEffect(() => {
    const weekday = moment(date.value).format("dddd");
    const isWeekend = weekday === "Sunday" || weekday === "Saturday";

    if (isValidDate(date.value) && !isWeekend) {
      setValidDate(true);
    } else {
      setValidDate(false);
    }

    if (isWeekend && !error) {
      setError(true);
    } else if (!isWeekend && error) {
      setError(false);
    }
  }, [date.value]);

  const submit = () => {
    if (validDate) {
      setPortfolio({ ...portfolio, date: date.value });
      history.push("/portfolio/investment");
    }
  };

  return (
    <div>
      <PortfolioContainer back>
        <h3 className="portfolio-date__heading">When did you start investing in stock?</h3>
        <div className="portfolio-date__wrapper">
          {error && <span className="portfolio-date__error">You must select a week day.</span>}
          <div className="portfolio-date__select-wrapper">
            <SelectDatepicker value={date.value} onDateChange={date => onDateChange(date)} maxDate={new Date()} format={"year/month/day"} />
          </div>
          <Button btnText="Next Step" btnStyle="primary" onClick={() => submit()} addClass={`${!validDate && "disabled"}`} />
        </div>
      </PortfolioContainer>
    </div>
  );
};

export default PortfolioDate;
