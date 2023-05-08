
import { User } from "../interfaces/user.interface";
import { useState } from "react";
import { useForm } from "./userForm";
import { useFecth } from "./useFetch";
import { Env } from "../class/env.class";



export const useFormSingUp = () => {

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(false);

  const { handleChange, handleSubmit, values, validator } =
    useForm<User>({
      firts_name: "",
      last_name: "",
      country: "",
      bird_day: "",
      dial_code: "",
      phone: "",
      email: "",
      password: "",
      confirm_password: "",
      accept_personal_data: false,
      accept_term: false,
      accept_send_marketing: false,
    });

  const {fetchPost} = useFecth<{},User>()

  const submit = async (values: User, valid: boolean) => {
    console.log(valid);
    
     if(!valid){
      return;
     }
     setLoading(true)
     const response = await fetchPost(`${Env.apiUrlClient}/users`,{...values})
     if("errorCode" in response){
       setError(true);
       setLoading(false);
       return;
     }
  };

  const validatorAutocomplete = (name: string) => {
    return validator[name].customError || validator[name].valueMissing;
  };

  const validatorConfirmPassword = () => {
    return values.confirm_password != values.password;
  };

  return {
    handleChange,
    handleSubmit,
    submit,
    validatorAutocomplete,
    validatorConfirmPassword,
    values,
    validator,
  };
};
