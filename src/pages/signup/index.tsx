import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import * as React from 'react';
import type { UserSignIn } from '@/types';
import { useUserAuth } from '@/context/userAuthContext';
import { Link, useNavigate } from 'react-router-dom';

type ISignupProps = object;

const initialValue: UserSignIn = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup: React.FunctionComponent<ISignupProps> = () => {

  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    general?: string;
  }>({});

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!userInfo.email) newErrors.email = "Email is required";
    if (!userInfo.password) newErrors.password = "Password is required";
    if (userInfo.password !== userInfo.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const { googleSignIn, signUp } = useUserAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await googleSignIn();
      navigate("/");
    } catch {
      setErrors({ general: "Google sign-in failed" });
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
      await signUp(userInfo.email, userInfo.password);
      navigate("/");
    } catch {
      setErrors({ general: "Signup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-green-100 px-4">
      
      {/* Card */}
      <Card className="w-full max-w-lg shadow-lg border border-gray-100 rounded-xl px-6 py-5">
        
        {/* Header */}
        <CardHeader className="space-y-2 text-center">
          <div className="text-3xl font-bold text-primary">MediFlow</div>
          <CardTitle className="text-2xl font-semibold">
            Create your account
          </CardTitle>
          <CardDescription>
            Manage patients, analytics & operations in one place
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-5">
          <form onSubmit={handleSubmit}>
            <FieldGroup className="space-y-4">

              {/* Google Button */}
              <Field>
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
                  onClick={handleGoogleSignIn}
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

              {/* Separator */}
              <FieldSeparator className="text-sm text-gray-500">
                Or continue with email
              </FieldSeparator>

              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email-create-account">Email</FieldLabel>
                <Input
                  id="email-create-account"
                  type="email"
                  placeholder="doctor@hospital.com"
                  className="mt-1 focus:ring-2 focus:ring-primary/40"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
              </Field>

              {/* Password */}
              <Field>
                <FieldLabel htmlFor="password-create-account">Password</FieldLabel>
                <Input
                  id="password-create-account"
                  type="password"
                  placeholder="Enter password"
                  className="mt-1 focus:ring-2 focus:ring-primary/40"
                  value={userInfo.password}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                  }
                />
                {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
              </Field>

              {/* Confirm Password */}
              <Field>
                <FieldLabel htmlFor="confirm-password-create-account">
                  Confirm Password
                </FieldLabel>
                <Input
                  id="confirm-password-create-account"
                  type="password"
                  placeholder="Confirm password"
                  className="mt-1 focus:ring-2 focus:ring-primary/40"
                  value={userInfo.confirmPassword}
                  onChange={(e) =>
                    setUserInfo({
                      ...userInfo,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
              </Field>

              {/* Submit */}
              <Field>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-blue-700 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? "Creating..." : "Create Account"}
                </Button>
              </Field>

              {/* Footer */}
              <Field>
                <p className="text-sm text-center text-gray-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-primary font-medium hover:underline"
                  >
                    Login
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

export default Signup;