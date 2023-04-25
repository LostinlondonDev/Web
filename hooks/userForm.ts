import React, { useRef, useState } from "react";

export interface Validator {
  [x: string]: ValidatorValue;
}

export interface ValidatorValue {
  invalid: boolean;
  required: boolean;
  type: string;
  value: string;
  change: boolean;
}

export const useForm = <T extends Object>(initialValue: T) => {
  let initValidator: Validator = {};
  // const valueRef = useRef<T>(initialValue);
  const [values, setValues] = useState<T>(initialValue);
  const formValidRef = useRef<boolean>(false);
  
  Object.keys(initialValue).forEach((key) => {
    initValidator = {
      ...initValidator,
      [key]: {
        invalid: false,
        required: false,
        type: "text",
        value: "",
        change: false,
      },
    };
  });
  const [validator, setVlidator] = useState<Validator>(initValidator);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | any,
    isSelect: boolean = false
  ) => {
    let newValues;
    const { name, value, validity, type, required, checked } = event.target;

    if (type == "checkbox" || type == "radio") {
      newValues = { ...values, [name]: checked };
    } else newValues = { ...values, [name]: value };
    setValues(newValues);

    const newValidator = {
      ...validator,
      [name]: {
        invalid: isSelect ? false : !validity?.valid || false,
        type,
        required,
        value: value,
        change: true,
      },
    };
    setVlidator({ ...newValidator });
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    callback: (value: T, formValid: boolean) => void,
    detectChanges: boolean = false
  ) => {
    const hasInputInvalid = !Object.values(validator).some(
      (e) => e.invalid === true
    );
    const toChangeInput = Object.values(validator).some(
      (e) => e.change === true
    );
    event.preventDefault();
    formValidRef.current = hasInputInvalid && (toChangeInput || detectChanges);
    callback({ ...values }, formValidRef.current);
  };

  const resetForm = () => setValues(initialValue);

  return {
    handleChange,
    handleSubmit,
    resetForm,
    validator,
    values,
  };
};
