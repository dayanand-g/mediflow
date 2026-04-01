import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import type { UserLogIn } from '@/types';
import { useUserAuth } from '@/context/userAuthContext';
import { Link, useNavigate } from 'react-router-dom';

type ILoginProps = object;

const initialValue: UserLogIn = {
  email: "",
  password: "",
};

const Login: React.FunctionComponent<ILoginProps> = () => {
  const { googleSignIn, logIn } = useUserAuth();
  const navigate = useNavigate();

  const [userLoginInfo, setuserLoginInfo] = React.useState<UserLogIn>(initialValue);
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{ email?: string; password?: string; general?: string }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!userLoginInfo.email) newErrors.email = "Email is required";
    if (!userLoginInfo.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn();
      navigate("/");
    } catch (error) {
      setErrors({ general: "Google sign-in failed. Try again." });
      console.error("Google Sign-In Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      setErrors({});
      await logIn(userLoginInfo.email, userLoginInfo.password);
      navigate("/");
    } catch (error) {
      setErrors({ general: "Invalid email or password" });
      console.error("Login Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-4">
      <Card className="w-full max-w-lg shadow-lg border border-gray-100 rounded-xl px-6 py-5">

        <CardHeader className="space-y-2 text-center">
          <div className="text-3xl font-bold text-primary">MediFlow</div>
          <CardTitle className="text-2xl font-semibold">Welcome back</CardTitle>
          <CardDescription>Login to manage patients and analytics</CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4">

              {errors.general && (
                <p className="text-sm text-red-500 text-center">{errors.general}</p>
              )}

              <Field>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    />
                  </svg>
                  Continue with Google
                </Button>
              </Field>

              <FieldSeparator className="text-sm text-gray-500">
                Or continue with email
              </FieldSeparator>

              <Field>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="example@hospital.com"
                  value={userLoginInfo.email}
                  onChange={(e) =>
                    setuserLoginInfo({ ...userLoginInfo, email: e.target.value })
                  }
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </Field>

              <Field>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Enter password"
                  value={userLoginInfo.password}
                  onChange={(e) =>
                    setuserLoginInfo({ ...userLoginInfo, password: e.target.value })
                  }
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </Field>

              <Field>
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-blue-700 text-white font-medium" 
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>

              <Field>
                <p className="text-sm text-center text-gray-500">
                  Don’t have an account?{" "}
                  <Link to="/signup" className="text-primary font-medium">
                    Sign up
                  </Link>
                </p>
              </Field>

            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;