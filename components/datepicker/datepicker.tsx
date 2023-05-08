"use client";
import { forwardRef, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import styles from "./datepicker.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  invalid: boolean;
  format?: string;
  onChangeInput: (e: any) => void;
  onMonthChange?: (e: Date) => void;
};

const CustomInput = forwardRef(
  ({ label, invalid, ...propsInput }: Partial<Props>, ref: any) => {
    const classInput = invalid ? styles.invalid : "";
    const classLabel = invalid ? styles.labelInvalid : "";
    return (
      <div className={styles.box}>
        <input {...propsInput} ref={ref} className={classInput} readOnly />
        <span className={classLabel}>{label}</span>
      </div>
    );
  }
);

CustomInput.displayName = "CustomInput";

export const DatePickerInput = ({
  label,
  invalid = false,
  onChangeInput,
  onMonthChange,
  ...props
}: Props) => {
  const [date, setDate] = useState<Date | null>(null);
  const [inputValue, setInputValue] = useState("");
  const refInput = useRef<HTMLInputElement>(null);

  const onChange = (date: Date) => {
    setInputValue(date?.toISOString()!);
    refInput.current!.value = date?.toISOString()!;
    let { name, validity, value } = refInput.current!;
    onChangeInput({ target: { name, validity, value } });
    setDate(date);
  };

  return (
    <>
      <DatePicker
        dropdownMode="select"
        value={date?.toLocaleDateString()}
        startDate={date}
        calendarClassName={styles.calendar}
        onChange={onChange}
        onMonthChange={onMonthChange}
        customInput={<CustomInput label={label} invalid={invalid} />}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
      />
      <input
        ref={refInput}
        {...props}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        hidden
      />
    </>
  );
};
