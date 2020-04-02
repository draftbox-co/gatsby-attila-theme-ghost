import { useState, useContext } from "react";
import { ArmadaFormsContext } from "../context/form-context";

export const useForm = formKey => {
  const [submitting, setSubmitting] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [errors, setErrors] = useState([]);
  const { client } = useContext(ArmadaFormsContext);

  const handleSubmit = async data => {
    setSubmitting(true);
    console.log(formKey);

    try {
      let formHeaders = new Headers();
      formHeaders.append("Content-Type", "application/json");
      const response = await fetch(`${client}/${formKey}`, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify(data),
        headers: formHeaders
      });

      if (!response.ok) {
        setErrors([{ error: `error occured submitting request: ${formKey}` }]);
      } else {
        setSubmitting(false);
        setSucceeded(true);
      }
    } catch (error) {
      setErrors([{ error: `error occured submitting request: ${formKey}` }]);
    }

    // setTimeout(() => {
    //   setSubmitting(false);
    //   setSucceeded(true);
    // }, 5000);
    // console.log(client, "client");
    // console.log(data, formKey, client);
  };

  return [{ submitting, errors, succeeded, handleSubmit }];
};
