"use client";
import Image from "next/image";
import hero from "@/assets/img/hero.jpeg";
import RegisterForm from "@/forms/register.form";

export default function Register() {
  return (
    <div className="h-screen flex flex-row justify-center items-center">
      <div className="h-[90%] w-[80%] rounded-[10px] overflow-hidden shadow-[1px_2px_10px_0_rgba(46,36,36,0.86)] bg-[#f7f7f7]">
        <div className="h-full flex flex-wrap -mx-2 g-0 justify-content-md-center">

          <div className="h-full flex flex-col justify-center overflow-auto w-6/12 px-2">
            <RegisterForm />
          </div>
          <div className="h-full w-6/12 px-  bg-[#f722f7]">
            <Image className="mb-4" src={hero} alt="Upcoming..." />
            {/*<UpcomingMovies />*/}
          </div>
        </div>
      </div>
    </div>
  );
}