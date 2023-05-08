import React, { useRef, useState } from "react";

export interface Validator {
  [x: string]: ValidityState;
}

export interface ValidatorValue {
  invalid: boolean;
  required: boolean;
  type: string;
  value: string;
  change: boolean;
}

const initValidators: ValidityState = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: true,
};

export const useForm = <T extends Object>(initialValue: T) => {
  let initValidator: Validator = {};
  const [values, setValues] = useState<T>(initialValue);
  Object.keys(initialValue).forEach((key) => { 
    initValidator = {
      ...initValidator,
      [key]: initValidators,
    };
  });
  const [validator, setVlidator] = useState<Validator>(initValidator);

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement> | any,
    isSelect: boolean = false
  ) => {
    let newValues;
    const { name, value, validity, type, checked } = event.target; 
    if (type == "checkbox" || type == "radio") {
      newValues = { ...values, [name]: checked };
    } else newValues = { ...values, [name]: value };
    setValues(newValues)
    const newValidator: Validator = {
      ...validator,
      [name]: {
        badInput: validity.badInput,
        customError: validity.customError,
        patternMismatch: validity.patternMismatch,
        rangeOverflow: validity.rangeOverflow,
        rangeUnderflow: validity.rangeUnderflow,
        stepMismatch: validity.stepMismatch,
        tooLong: validity.tooLong,
        tooShort: validity.tooShort,
        typeMismatch: validity.typeMismatch,
        valid: validity.valid,
        valueMissing: validity.valueMissing,
      },
    };
    setVlidator(validator => ({ ...newValidator }));
  };


  const setValidators = (inputs: HTMLInputElement[]) => {
    let newValidator = { };
    for (const {validity,name} of inputs) {  
      newValidator = {
        ...newValidator,
        [name]: {
          badInput: validity.badInput,
          customError: validity.customError,
          patternMismatch: validity.patternMismatch,
          rangeOverflow: validity.rangeOverflow,
          rangeUnderflow: validity.rangeUnderflow,
          stepMismatch: validity.stepMismatch,
          tooLong: validity.tooLong,
          tooShort: validity.tooShort,
          typeMismatch: validity.typeMismatch,
          valid: validity.valid,
          valueMissing: validity.valueMissing,
        }
      }   
    } 
    return newValidator;
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    callback: (value: T, formValid: boolean) => void,
  ) => {
    const valid = event.currentTarget.checkValidity();
    const elements = event.currentTarget.elements;
    const newValidator = setValidators(Array.from(elements) as HTMLInputElement[]);
    setVlidator({...newValidator})
    event.preventDefault();
    callback({ ...values },valid);
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


