"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./autocomplete.module.css";
import { DataSelect } from "../../../interfaces/dataSelect.interface";


type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  options: DataSelect[];
  onChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  invalid?: boolean;
};

function AutocompleteInput({
  label,
  onChangeInput,
  options,
  onSelect,
  invalid,
  ...props
}: inputProps) {
  const onChange = useRef<React.ChangeEvent<HTMLInputElement>>();
  const classInput = invalid ? styles.invalid : styles.input;
  const classLabel = invalid ? styles.labelInvalid : "";
  const ref = useRef<HTMLDivElement>(null);
   
  const [showOptions, setShowOptions] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
    setShowOptions(true);
    onChange.current = e;
    const valid = isValidValue(e.target.value);
    if(!valid){
      onChange.current.target.setCustomValidity("no valid")      
    }
    onChangeInput(onChange.current);
   }

  function handleSelect(option: string | number, value: string) {
    setInputValue(value);
    setShowOptions(false);
    const event = onChange.current;
    event?.target.setCustomValidity("");
    event!.target.value = option.toString();
    onChangeInput(event!);
  }

  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  const onClickOutside = () => setShowOptions(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const isValidValue = (value: string) => {
    return filteredOptions.some((option) => option.value == value);
  }

  return (
    <div ref={ref} className={styles.box}>
      <input
        {...props}
        type={props.type ? props.type : "text"}
        value={inputValue}
        onChange={handleInputChange}
        className={classInput}
      />
      <span className={classLabel}>{label}</span>
      {showOptions && filteredOptions.length > 0 && (
        <ul className={styles.options}>
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option.id, option.value)}
              className={styles.option}
            >
              {option.value}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AutocompleteInput;
