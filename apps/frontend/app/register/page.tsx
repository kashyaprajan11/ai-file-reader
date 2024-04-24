"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const resolver = {
  email: yup.string().email().required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(
      10,
      "password must contain 10 or more characters with at least one of each: uppercase, lowercase, number and special character"
    ),
};

export default function Register() {
  const { watch, control, handleSubmit } = useForm({
    resolver: yupResolver(yup.object().shape(resolver)),
  });
  watch();

  const handleCreateUser = (data: { email: String; password: String }) => {
    console.log(data);
  };
  return (
    <div className="flex flex-col w-full gap-4 max-w-sm items-center justify-center mx-auto">
      <p>Register here</p>
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="w-full">
            <input
              type="text"
              placeholder="Email"
              value={value}
              onChange={onChange}
              className={`input input-bordered w-full ${!!error && "border-red-500"}`}
            />
            {!!error && <p className="error mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <div className="w-full">
            <input
              type="password"
              placeholder="Password"
              value={value}
              onChange={onChange}
              className={`input input-bordered w-full ${!!error && "border-red-500"}`}
            />
            {!!error && <p className="error mt-1">{error.message}</p>}
          </div>
        )}
      />
      <button
        className="btn w-full"
        onClick={handleSubmit(handleCreateUser, (err) =>
          console.log("error", err)
        )}
      >
        Submit
      </button>
    </div>
  );
}
