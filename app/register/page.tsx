"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(email, password, confirmPassword);

    if (password !== confirmPassword) return toast.error("password wrong");

    const { data } = await axios.post("/api/auth/register", {
      email,
      password,
    });
    console.log(data);

    if (!data?._id) return toast.error("error while register");
    else {
      toast.success("register successfull.Please login now!");
      router.push("/login");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };
  return (
    <div>
        <div>register page</div>
      <form onSubmit={handleSubmit}>
        <div>
          <p>enter your email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border-2"
            defaultValue={email}
          />
        </div>
        <div>
          <p>enter your password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="border-2"
            defaultValue={password}
          />
        </div>
        <div>
          <p>confirm your password</p>
          <input
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border-2"
            defaultValue={confirmPassword}
          />
        </div>

        <button type="submit" className="border-2">
          submit
        </button>
      </form>
      <div>allready have an account? please <Link className="cursor-pointer" href={'/login'}>login</Link></div>
    </div>
  );
}
