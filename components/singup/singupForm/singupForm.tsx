
import Link from "next/link";
import { Country } from "../../../interfaces/country.interface";
import { useFormSingUp } from "../../../hooks/useFormSingUp";
import { traslateNs } from "../../../i18";
import { DataSelect } from "../../../interfaces/dataSelect.interface";
import styles from './singupForm.module.css'
import Input from "../../input/Input";
import AutocompleteInput from "../../autocomplete/autocomplete";
import { DatePickerInput } from "../../datepicker/datepicker";
import Button from "../../button/Button";

interface Props {
  countries: Country[];
}

export const SingUpForm = ({countries }: Props) => {
  const {
    handleChange,
    handleSubmit,
    submit,
    validatorAutocomplete,
    validatorConfirmPassword,
    validator,
    values,
  } = useFormSingUp();
  const traslate = (value: string) => traslateNs(value, "singUp");
  const [
    firstName,
    lastName,
    dialCode,
    phone,
    country,
    birthDate,
    email,
    password,
    confirmPassword,
  ] = traslate("FIELDS").split(",");

  const fieldRequired = traslate("FIELD_IS_REQUIRED");
  const emailInavlid = traslate("EMAIL_IS_INVALID");
  const valueInvalid = traslate("VALUE_IS_INVALID");
  const confirmPasswordInvalid = traslate("CONFIRM_PASSWORD_INVALID");
  const [firstText, secondText] = traslate("OPTION_TERMS").split(".");

  const countriesOptions = countries.map<DataSelect>(({ _id, name }) => ({
    id: _id,
    value: name,
  }));

  const dialCodeOptions = countries.map<DataSelect>(
    ({ _id, dial_code, name }) => ({
      id: _id,
      value: `${name} ${dial_code}`,
    })
  );

  return (
    <form
      className={styles.details}
      noValidate
      onSubmit={(e) => handleSubmit(e, submit)}
    >
      <div className={styles.form}>
        <h3>{traslate("DETAILS")}</h3>
        <div className={styles.formLabel}>
          <div>
            <Input
              label={`${firstName}*`}
              name="firts_name"
              value={values.firts_name}
              onChange={handleChange}
              invalid={validator.firts_name.valueMissing}
              required
            />
            {validator.firts_name.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
          </div>
          <div>
            <Input
              label={`${lastName}*`}
              name="last_name"
              value={values.last_name}
              onChange={handleChange}
              invalid={validator.last_name.valueMissing}
              required
            />
            {validator.last_name.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
          </div>
          <div className={styles.country}>
            <AutocompleteInput
              label={`${dialCode}*`}
              name="dial_code"
              options={dialCodeOptions}
              onChangeInput={handleChange}
              invalid={validatorAutocomplete("dial_code")}
              required
            />
            {validator.dial_code.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
            {validator.dial_code.customError && (
              <span className="formControlMessageError">{valueInvalid}</span>
            )}
          </div>
          <div>
            <Input
              label={`${phone}*`}
              name="phone"
              value={values.phone}
              onChange={handleChange}
              invalid={validator.phone.valueMissing}
              required
            />
            {validator.phone.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
          </div>
          <div className={styles.country}>
            <AutocompleteInput
              name="country"
              options={countriesOptions}
              onChangeInput={handleChange}
              label={`${country}*`}
              invalid={validatorAutocomplete("country")}
              required
            />
            {validator.country.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
            {validator.country.customError && (
              <span className="formControlMessageError">{valueInvalid}</span>
            )}
          </div>
          <div>
            <DatePickerInput
              label={`${birthDate}`}
              onChangeInput={handleChange}
              name="bird_day"
              invalid={validator.bird_day.valueMissing}
              required
            />
            {validator.bird_day.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
          </div>
          <div className={styles.email}>
            <Input
              label={`${email}*`}
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              invalid={
                validator.email.valueMissing || validator.email.typeMismatch
              }
              required
            />
            {validator.email.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
            {validator.email.typeMismatch && (
              <span className="formControlMessageError">{emailInavlid}</span>
            )}
          </div>
          <div>
            <Input
              label={`${password}*`}
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              invalid={
                validator.password.valueMissing ||
                validator.password.patternMismatch
              }
              required
            />
            {validator.password.valueMissing && (
              <span className="formControlMessageError">{fieldRequired}</span>
            )}
            {validator.password.patternMismatch && (
              <span className="formControlMessageError">
                <br /> -The password must contain at least 8 characters <br />{" "}
                -One uppercase letter <br /> -One lowercase letter <br />
                -One Number
              </span>
            )}
          </div>
          <div>
            <Input
              label={`${confirmPassword}*`}
              type="password"
              name="confirm_password"
              value={values.confirm_password}
              onChange={handleChange}
              invalid={
                validator.confirm_password.valueMissing ||
                validatorConfirmPassword() ||
                validator.confirm_password.patternMismatch
              }
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"
              required
            />
          
            {validator.confirm_password.patternMismatch && (
              <span className="formControlMessageError">{}</span>
            )}
            {validatorConfirmPassword() && (
              <span className="formControlMessageError">
                {confirmPasswordInvalid}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.conditions}>
        <h2>{traslate("TERMS")}</h2>
        <p>{traslate("TERMS_DESCRIPTION")}</p>
        <div>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="accept_send_marketing"
            checked={values.accept_send_marketing}
            onChange={handleChange}
          />
          <label>{traslate("ACCEPT_TERMS")}</label>
        </div>
        <p>{traslate("SECOND_TERMS")}</p>
        <div>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="accept_personal_data"
            checked={values.accept_personal_data}
            onChange={handleChange}
          />
          <label>{firstText}</label>
        </div>
        <div>
          <input
            type="checkbox"
            className={styles.checkbox}
            name="accept_term"
            checked={values.accept_term}
            onChange={handleChange}
          />
          <label>{secondText}</label>
        </div>
        <p>
          {traslate("MESSAGE_TERMS")
            .split(";")
            .map((el) =>
              !el.includes("policy") ? (
                el
              ) : (
                <Link key={el} href="/" style={{ color: "red" }}>
                  {el}
                </Link>
              )
            )}
        </p>
        <div className={styles.save}>
          <Button>{traslate("BUTTON")}</Button>
        </div>
      </div>
    </form>
  );
};
