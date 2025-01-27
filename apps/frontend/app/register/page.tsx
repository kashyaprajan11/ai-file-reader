"use client";

import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>("");

  const { watch, control, handleSubmit, setValue } = useForm({
    resolver: yupResolver(yup.object().shape(resolver)),
  });
  watch();

  const toggleShowToast = (message: string | null = null) => {
    if (message) {
      setToastMessage(message);
    }
    setShowToast((prev) => !prev);
  };

  const handleCreateUser = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios({
        method: "post",
        url: `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        data: {
          email,
          password,
        },
      });
      toggleShowToast("Account successfully created.");
      setValue("email", "");
      setValue("password", "");
      router.push("/login");
    } catch (err) {
      toggleShowToast("Error creating Account! Please try again later.");
      setValue("email", "");
      setValue("password", "");
      console.log("Problems faced while creating user", err);
    }
  };
  return (
    <div className="flex flex-col w-full gap-4 max-w-sm items-center justify-center mx-auto">
      <p>Register</p>
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
      <button className="btn w-full" onClick={handleSubmit(handleCreateUser)}>
        Submit
      </button>
      <p className="opacity-20">
        Hint: You can use any random id and password to register. No
        verification required.
      </p>

      {showToast && (
        <Toast message={toastMessage} onClose={() => setShowToast(false)} />
      )}
    </div>
  );
}
