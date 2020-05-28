import { useState } from 'react';

const useCustomForm = ({
  initialValues,
  onSubmit,
}) => {
  const [values, setValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [onSubmitting, setOnSubmitting] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

  const updateValue = (name, value) => {
    setValues({ ...values, [name]: value });
  };

  const handleFormChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    updateValue(name, value);
  };

  const handleBlur = (event) => {
    const { target } = event;
    const { name } = target;
    setTouched({ ...touched, [name]: true });
    setErrors({ ...errors });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    setErrors({ ...errors });
    onSubmit({ values, errors });
  };

  return {
    values,
    errors,
    touched,
    updateValue,
    handleFormChange,
    handleBlur,
    handleSubmit,
  };
};

export default useCustomForm;
