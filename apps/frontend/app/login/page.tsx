"use client";
import axios from "axios";
import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";

import { appActionTypes, useAppContext } from "../appContext";
import Toast from "@/components/Toast";

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
  const router = useRouter();
  const { dispatch } = useAppContext();

  const { watch, control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(yup.object().shape(resolver)),
  });
  watch();

  const handleLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        data: {
          email,
          password,
        },
        withCredentials: true,
      });

      dispatch({
        type: appActionTypes.UPDATE_LOGGED_IN_USER,
        user: res?.data?.user,
      });
      dispatch({
        type: appActionTypes.TOGGLE_TOAST,
        showToast: true,
        toastMessage: "Successfully logged in",
      });
      setValue("email", "");
      setValue("password", "");
      router.push("/dashboard");
    } catch (err) {
      dispatch({
        type: appActionTypes.TOGGLE_TOAST,
        showToast: true,
        toastMessage: "Error encountered. Cannot login!",
      });
      setValue("email", "");
      setValue("password", "");
      console.log("Problems faced while logging in", err);
    }
  };
  return (
    <div className="flex flex-col w-full gap-4 max-w-sm items-center justify-center mx-auto">
      <p>Login</p>
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
      <button className="btn w-full" onClick={handleSubmit(handleLogin)}>
        Submit
      </button>
    </div>
  );
}
