import { useActionState } from "react";

type LoginFormData = {
    email: string
    password: string
}

type LoginProps= {
    onLogin: (data: LoginFormData) => Promise <{
        success: boolean;
        error? : string
    }>
}

type ActionState = {
    error?: string
    fieldErrors?: {
        email?: string
        password?: string
    }
} | null

const LoginForm = ({onLogin}: LoginProps) => {

    async function loginAction( 
        _preveState: ActionState,
        formData: FormData
    ): Promise<ActionState> {
        const email = formData.get("email") as string
        const password = formData.get("password") as string

        // validation for inputs

        const fieldErrors: {email?:string; password?:string} = {}

        if (!email){
            fieldErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(email)){
            fieldErrors.email = "Email is invalid"
        }

        if (!password){
            fieldErrors.password = "Password is required"
        } else if (password.length < 6){
            fieldErrors.password = "Password must be at least 6 characters"
        }

        if (Object.keys(fieldErrors).length > 0){
            return {fieldErrors}
        }

        // Submit

        try{
            const result = await onLogin({email, password})

            if (result.success){
                return null
            } else {
                return { error : result.error || "Login failed"}
            }
        } catch (err) {
            return {
                error: err instanceof Error ? err.message : "An error occurred"
            }
        }
    }

    const [state, formAction, isPending] = useActionState(loginAction, null)

    return (
        <div className="login-container">
            <div className="login-card flex flex-col gap-3">
                <h2>Login</h2>

                <form action={formAction}>
                    <div className="form-group flex flex-col my-2">
                        <label htmlFor="email" className="text-start">Email</label>
                        <input
                         type="email"
                         name="email"
                         placeholder="Enter your email"
                         className=" w-full h-full my-2 p-2 rounded rounded-3 border border-gray-300 text-gray-500 bg-transparent"
                         aria-invalid={!!state?.fieldErrors?.email}
                         aria-describedby={state?.fieldErrors?.email ? "email-error" : undefined}
                         />
                         {state?.fieldErrors?.email && (
                            <span id="email-error" className="error">
                                {state.fieldErrors.email}
                            </span>
                         )}
                    </div>

                    <div className="form-group flex flex-col mb-4">
                        <label htmlFor="password" className="text-start">Password</label>
                        <input 
                        type="password"
                        name="password"
                        className="my-2 w-full h-full p-2 rounded rounded-3 border border-gray-300  text-gray-500 bg-transparent"
                        placeholder="Enter your password"
                        aria-invalid={!!state?.fieldErrors?.password}
                        aria-describedby={state?.fieldErrors?.password ? "password-error" : undefined}
                        />
                        {state?.fieldErrors?.password && (
                            <span id="password-error" className="error">
                                {state.fieldErrors.password}
                            </span>
                        )}
                    </div>

                    {state?.error && (
                        <div className="alert alert-error" role="alert">
                            {state.error}
                        </div>
                    )}

                    <button type="submit" disabled={isPending} className="w-full active:scale-95 transition text-sm text-white rounded-lg bg-slate-700">
                        {isPending ? "Logging in ..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm