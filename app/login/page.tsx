'use client'

import { signIn } from "next-auth/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "react-toastify"

export default function LoginPage() {


  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const router = useRouter()

  const handleSubmit =async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    // console.log(email,password,confirmPassword)
    if(password !== confirmPassword) return toast.error('password and confrim password dont match')
    const res = await signIn("credentials",{ email, password, redirect: false})
    console.log(res)
    if(res?.error) return toast.error(res.error)

      else {
        toast.success("login successfull")
        router.push('/')

      }
  }
  return (
   <div>
    <div>
      login page
    </div>
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
      <div>dont have any account? please <Link className="cursor-pointer" href={'/register'}>register</Link></div>
    </div>
  )
}
