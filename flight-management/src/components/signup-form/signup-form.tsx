import { useActionState } from "react";

type SignUpData = {
  name: string;
  email: string;
  password: string;
};

type SignupProps = {
  onSignup: (data: SignUpData) => Promise<{
    success: boolean;
    error?: string;
  }>;
  onGoogleSign: () => void;
  onLogin: () => void;
};

type ActionState = {
  error?: string;
  fieldErrors?: {
    name?: string;
    email?: string;
    password?: string;
  };
} | null;

const SignUp = ({ onSignup, onGoogleSign, onLogin }: SignupProps) => {
  
  async function SignUpAction(
    _preveState: ActionState,
    formData: FormData
  ): Promise<ActionState> {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // validation

    const fieldErrors: { name?: string; email?: string; password?: string } =
      {};

    if (!name) {
      fieldErrors.name = "Name is required";
    } else if (name.length < 3) {
      fieldErrors.name = "Name must be at least 3 characters";
    }

    if (!email) {
      fieldErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      fieldErrors.email = "Email is invalid";
    }

    if (!password) {
      fieldErrors.password = "Password is required";
    } else if (password.length < 6) {
      fieldErrors.password = "Password muse be at least 6 characters";
    }

    if (Object.keys(fieldErrors).length > 0) {
      return { fieldErrors };
    }

    // submit
    try {
      const result = await onSignup({ name, email, password });

      if (result.success) {
        return null;
      } else {
        return { error: result.error || "Signup failed" };
      }
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "An error occurred",
      };
    }
  }

  const [state, formAction, isPending] = useActionState(SignUpAction, null);

  return (
    <div className="signup-container">
      <div className="signup-card flex flex-col gap-3">
        <h2 className="text-black font-bold text-xl">Sign Up</h2>

        <form action={formAction}>
          <div className="form-group flex flex-col my-2">
            <label htmlFor="name" className="text-start text-sm after:content-['*'] after:text-red-500 after:ml-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full h-full my-2 p-2 rounded  border border-gray-300 text-gray-500 bg-transparent"
              aria-invalid={!!state?.fieldErrors?.name}
              aria-describedby={
                state?.fieldErrors?.name ? "name-error" : undefined
              }
            />
            {state?.fieldErrors?.name && (
              <span id="name-error" className="error text-red-500 text-sm text-start">
                {state.fieldErrors.name}
              </span>
            )}
          </div>

          <div className="form-group flex flex-col my-2">
            <label htmlFor="email" className="text-start text-sm after:content-['*'] after:text-red-500 after:ml-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full h-full my-2 p-2 rounded  border border-gray-300 text-gray-500 bg-transparent"
              aria-invalid={!!state?.fieldErrors?.email}
              aria-describedby={
                state?.fieldErrors?.email ? "email-error" : undefined
              }
            />
            {state?.fieldErrors?.email && (
              <span id="email-error" className="error text-red-500 text-sm text-start">
                {state.fieldErrors.email}
              </span>
            )}
          </div>

          <div className="form-group flex flex-col my-2">
            <label htmlFor="password" className="text-start text-sm after:content-['*'] after:text-red-500 after:ml-1">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full h-full my-2 p-2 rounded  border border-gray-300 text-gray-500 bg-transparent"
              aria-invalid={!!state?.fieldErrors?.password}
              aria-describedby={
                state?.fieldErrors?.password ? "password-error" : undefined
              }
            />
            {state?.fieldErrors?.password && (
              <span id="password-error" className="error text-red-500 text-sm text-start">
                {state.fieldErrors.password}
              </span>
            )}
          </div>

          {state?.error && (
            <div className="alert alert-error" role="alert">
              {state.error}
            </div>
          )}

          <button type="submit" disabled={isPending} className="my-1 w-full active:scale-95 transition text-md text-center text-white rounded  bg-slate-700">
            {isPending ? "Creating account..." : "Sign up"}
          </button>

          {/* Google Sign */}
          <button
            type="button"
            onClick={onGoogleSign}
            className="google-button bg-transparent text-center border border-gray-600 text-black rounded w-full h-full p-2 my-2 active:scale-95 transition"
          >
            Sign up with Google
          </button>

          {/* Already have account */}
          <div className="login-link">
            Already have an account?
            <button type="button" onClick={onLogin} className="link-button bg-transparent text-teal-600 underline p-0">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
