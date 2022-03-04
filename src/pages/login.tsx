import { useState } from 'react'
import Image from 'next/image'

import { useLogin } from '@/admin/hooks'
import { SpinLoader } from '@/common/components/icon'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const { login, message, isLoading } = useLogin({ username, email, password })

  return (
    <div className="grid grid-cols-1 place-content-center mx-auto h-screen lg:grid-cols-5 lg:mx-24">
      <div className="col-span-2">
        <Image
          src="/assets/images/login.jpg"
          layout="responsive"
          height={900}
          width={750}
          alt="login-image"
          objectFit="cover"
        />
      </div>
      <div className="flex flex-col col-span-full col-start-3 justify-center items-center w-full">
        {message && <div>{message}</div>}
        <form
          className="flex flex-col space-y-4 w-1/2"
          onSubmit={async (e) => {
            e.preventDefault()
            login()
          }}
        >
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="name"
            className="form-input"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            className="form-input"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="form-input"
          />
          <button
            type="submit"
            className="flex justify-center items-center p-2 text-sm text-black/70 bg-orange rounded-md"
          >
            {isLoading ? <SpinLoader /> : 'login'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
