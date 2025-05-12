"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterType } from "@/types";
import { Button, FormField } from "@/components";
import { RegisterSchema } from "@/schemas";
import logo from "@/assets/img/logo.png";
import Link from "next/link";
import { useStore } from "@/store";

function RegisterForm() {
  const { register: reg } = useStore();
  const submitting = useStore((state) => state.user.submitting);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (payload: RegisterType) => {
    reg(payload)
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form flex flex-col items-center justify-center p-4">
      <Image className="w-30 mb-4" src={logo} alt="logo" />
      <h1 className="mt-0 mb-2 text-3xl text-rose-500 font-medium">Sign Up</h1>
      <div className="w-[70%] relative flex flex-col m-3">
        <label htmlFor="firstName" className="w-full text-sm text-gray-700 mb-2">
          First Name
        </label>
        <FormField
          type="string"
          placeholder="Fisrt Name"
          name="firstName"
          register={register}
          error={errors.firstName}
        />
      </div>
      <div className="w-[70%] relative flex flex-col m-3">
        <label htmlFor="firstName" className="w-full text-sm text-gray-700 mb-2">
          First Name
        </label>
        <FormField
          type="string"
          placeholder="Last Name"
          name="lastName"
          register={register}
          error={errors.lastName}
        />
      </div>
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
        <Button type="submit" label="Sign up" variant="primary" fullWidth submitting={submitting} />
        <div className="mt-4">
          Already registered to
          {' '}
          <b>Flix Flex</b>
          ?
          {' '}
          <Link className="text-rose-500 no-underline" href="/login">Sign in now</Link>

        </div>
      </div>
    </form>
  )
}

export default RegisterForm