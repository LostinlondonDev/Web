import Link from "next/link";
import { useLogin } from "../../hooks/login/useLogin";
import { traslateNs } from "../../i18";
import Button from "../button/Button";
import Input from "../input/Input";
import styles from './login.module.css'



export const LoginForm = () => {
  const traslate = (value: string) => traslateNs(value, "login");
  const [newHere, createAccount] = traslate("HAS_ACOOUNT").split(",");
  const forgotPassword = `${traslate("FORGOT_PASSWORD")} ?`;
  const errorMesage = traslate("LOGIN_INCORRECT");
  const {
    handleChange,
    handleSubmit,
    submit,
    setError,
    values,
    validator,
    loading,
    error,
  } = useLogin();

  return (
    <div className={styles.loginForm}>
      <h2>{traslate("TITLE_PAGE")}</h2>
      {error && (
        <div className={styles.error}>
          <span></span>
          <span>{errorMesage}</span>
          <strong onClick={() => setError(false)}>x</strong>
        </div>
      )}
      <p>{traslate("MESSAGE_TIP")}</p>
      <form
        className={styles.form}
        noValidate
        onSubmit={(e) => handleSubmit(e, submit)}
      >
        <div className={styles.input}>
          <Input
            label={`${traslate("EMAIL")}`}
            onChange={handleChange}
            name="email"
            type="email"
            value={values.email}
            invalid={
              validator.email.valueMissing || validator.email.typeMismatch
            }
            required
          />
          {validator.email.valueMissing && (
            <span className="formControlMessageError">
              {traslate("FIELD_IS_REQUIRED")}
            </span>
          )}
          {validator.email.typeMismatch && (
            <span className="formControlMessageError">
              {traslate("EMAIL_IS_INVALID")}
            </span>
          )}
        </div>
        <div className={styles.input}>
          <Input
            label={`${traslate("PASSWORD")}`}
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            invalid={validator.password.valueMissing}
            required
          />
          {validator.password.valueMissing && (
            <span className="formControlMessageError">
              {traslate("FIELD_IS_REQUIRED")}
            </span>
          )}
        </div>
        <div>
          <Button
            className={styles.button}
            type="submit"
            loading={loading}
            disabled={loading}
          >
            Login
          </Button>
        </div>
      </form>
      <div className={styles.cteCount}>
        <Link href="/forgotpassword" className={styles.link}>
          {forgotPassword}
        </Link>
        <span>
          {`${newHere} ?`}
          <Link href={`/signup`}>{`${createAccount} ?`}</Link>
        </span>
      </div>
    </div>
  );
};
