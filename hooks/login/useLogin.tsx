import { useState } from "react";
import { useFecth } from "../useFetch";
import { LoginResponse } from "../../interfaces/loginReponse.interface";
import { useForm } from "../userForm";
import { HttpError } from "../../interfaces/errorResponse.interface";
import { Env } from "../../class/env.class";

interface Login {
  email: string;
  password: string;
}
export const useLogin = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState(false);

  const { fetchPost } = useFecth<LoginResponse,Login>();
  
  const { handleChange, handleSubmit, values, validator } = useForm<Login>({
    email: "",
    password: "",
  });

  const submit = async (values: Login, valid: boolean) => {
    if (!valid) {
      return;
    }
    setLoading(true);
    const response = await fetchPost(`${Env.apiUrlClient}/users/login`, {
      ...values,
    });
    if ("errorCode" in response) {
      if (response.errorCode == HttpError.RESOURCE_NOT_EXIST) {
        setError(true);
        setLoading(false);
      }
      return;
    }
    setLoading(false);
  };

  return {
    handleChange,
    handleSubmit,
    submit,
    setError,
    loading,
    values,
    validator,
    error,
  };
};
