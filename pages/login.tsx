import React, { use, useState } from "react"
import Header from "../components/Header"

export default function Login() {
  const [isCreating, setIsCreating] = useState<boolean>(true)
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const nameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const emailInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const passwordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isCreating) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_REQUEST_BASE_URL}/a/users/create`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: name,
              email: email,
              password: password,
            }),
          }
        )
        const data = await response.json()
        // TODO::: what do I need to set the data to? useState? data = interface I need to create?

        console.log("User data", data)
      } catch (e) {
        console.log("HIT CATCH: ", e)
      }
    }
  }

  return (
    <div>
      <Header />
      <form onSubmit={login}>
        <h3>{isCreating ? "Create an account" : "Login"}</h3>
        {isCreating && (
          <input placeholder="Enter first name here" onChange={nameInput} />
        )}
        <input placeholder="Enter email here" onChange={emailInput} />
        <input placeholder="Enter password here" onChange={passwordInput} />
        <button>{isCreating ? "Create account" : "Login"}</button>
        <br />
        <button type="button" onClick={() => setIsCreating(!isCreating)}>
          {isCreating
            ? "Already have an account?"
            : "Need to create an account?"}
        </button>
      </form>
    </div>
  )
}
