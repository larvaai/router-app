import React from "react"
import { useLoaderData, useNavigate, Form, redirect, useActionData, useNavigation } from "react-router-dom"
import { loginUser } from '../api'

export function loader({ request }) {
    return new URL(request.url).searchParams.get("message")
}

export async function action({ request }) {
    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")
    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("loggedin", true)
        const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host"
    
        const res = redirect(pathname)
        res.body = true
        return res
    } catch(err) {
        return err.message
    }
}

export default function Login() {
    const navigation = useNavigation()
    const message = useLoaderData()
    const errorMessage = useActionData()

    return (
        <div className="login-container">
            { message && <h3 className="red">{message}</h3> }
            { errorMessage && <h3 className="red">{errorMessage}</h3> }
            <h1>Sign in to your account</h1>
            <Form 
                method="post" 
                className="login-form"
                replace
                >
                <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? "Logging in" : "Log in"}
                </button>
            </Form>
        </div>
    )

}