import { useState, useEffect } from "react";

const useFormValidate = (initialState, validate, callback) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;

      if (noErrors) {
        callback();
        setSubmitting(false);
        // setValues(initialState);
        setPosted(true);
      } else {
        setSubmitting(false);
      }
    }
  }, [errors, callback, initialState, isSubmitting]);

  const handleChange = event => {
    event.persist();
    setValues(values => ({
      ...values,
      [event.target.name]: event.target.value
    }));
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleBlur = () => {
    const validationErrors = validate(values);
    setErrors(validationErrors);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setPosted(false);
    setSubmitting(true);
  };

  return {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    posted
  };
};

export default useFormValidate;
