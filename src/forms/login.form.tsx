"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginType } from "@/types";
import { Button, FormField } from "@/components";
import { LoginSchema } from "@/schemas";
import logo from "@/assets/img/logo.png";
import { useStore } from "@/store";
import { stat } from "fs";

function LoginForm() {
  const login = useStore((state) => state.login);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (payload: LoginType) => {
    login(payload)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form flex flex-col items-center justify-center p-4">
      <Image className="w-30 mb-4" src={logo} alt="logo" />
      <h1 className="mt-0 mb-2 text-3xl text-rose-500 font-medium">Sign In</h1>
      <div className="w-[70%] relative flex flex-col m-3">
        <label htmlFor="username" className="w-full text-sm text-gray-700 mb-2">
          Username
        </label>
        <FormField
          type="string"
          placeholder="Username"
          name="username"
          register={register}
          error={errors.username}
        />
      </div>
      <div className="w-[70%] relative flex flex-col m-3">
        <label htmlFor="password" className="w-full mb-2 text-sm text-gray-700">
          Password
        </label>
        <FormField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
        />
      </div>
      <div className="w-[70%] flex flex-col mt-4">
        <Button className="hover:bg-blue-700" type="submit" label="Sign in" variant="primary" fullWidth />
        <div className="mt-4">
          New to
          {' '}
          <b>Flix Flex</b>
          ?
          {' '}
          <Link className="text-rose-500 no-underline" href="/register">Sign up now</Link>

        </div>
      </div>
    </form>
  )
}

export default LoginForm