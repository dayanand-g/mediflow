import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { signUpUser, googleSignInUser } from '@/redux/authSlice';
import type { AppDispatch } from '@/redux/store';
import * as React from 'react';
import type { UserSignIn } from '@/types';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { motion } from 'framer-motion';

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

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState<UserSignIn>(initialValue);

  // Redux Dispatch Hook
  const dispatch = useDispatch<AppDispatch>();

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      await dispatch(googleSignInUser()).unwrap();
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
      await dispatch(signUpUser({ email: userInfo.email, password: userInfo.password })).unwrap();
      navigate("/");
    } catch {
      setErrors({ general: "Signup failed. Try again." });
    } finally {
      setLoading(false);
    }
  };

  const itemVars = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <AuthLayout>
      <motion.div
        initial="initial"
        animate="animate"
        className="w-full max-w-[500px] perspective-1000"
      >
        <motion.div
          whileHover={{ rotateX: 1, rotateY: -1 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <Card className="relative bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-6 md:p-8 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden">
            
            {/* Neon Top Edge Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(34,211,238,0.5)]" />

            <CardHeader className="space-y-1 text-center p-0 mb-6 relative z-10">
              <motion.div variants={itemVars}>
                <CardTitle className="text-2xl md:text-3xl font-black text-white tracking-tighter">
                  Medi<span className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]">Flow</span>
                </CardTitle>
              </motion.div>
              <motion.div variants={itemVars}>
                <CardDescription className="text-slate-500 text-[11px] font-bold uppercase tracking-[0.15em]">
                  Initialize New Security Node
                </CardDescription>
              </motion.div>
            </CardHeader>

            <CardContent className="p-0 relative z-10">
              <form onSubmit={handleSubmit}>
                <FieldGroup className="space-y-4">

                  {/* Google Quick Init */}
                  <motion.div variants={itemVars}>
                    <Field>
                      <Button
                        variant="outline"
                        className="group relative w-full flex items-center justify-center gap-3 h-11 bg-white text-slate-950 rounded-xl font-bold text-sm tracking-tight hover:bg-cyan-400 transition-all duration-300 active:scale-[0.98] overflow-hidden"
                        onClick={handleGoogleSignIn}
                      >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />
                        <svg className="w-4 h-4 relative z-10" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                        </svg>
                        <span className="relative z-10">Continue with Google</span>
                      </Button>
                    </Field>
                  </motion.div>

                  <motion.div variants={itemVars} className="relative flex items-center py-1">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="flex-shrink mx-3 text-[9px] font-black tracking-[0.2em] uppercase text-slate-700">Manual Config</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </motion.div>

                  {/* Compact Form Fields */}
                  <div className="space-y-3">
                    <motion.div variants={itemVars}>
                      <Field className="space-y-1.5">
                        <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">Network Identifier</FieldLabel>
                        <Input
                          type="email"
                          placeholder="doctor@mediflow.systems"
                          className="w-full h-10 px-4 bg-[#030712]/50 border border-white/10 rounded-xl text-white text-sm placeholder-slate-700 focus:border-cyan-500/50 transition-all"
                          value={userInfo.email}
                          onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                        />
                        {errors.email && <p className="text-[10px] font-bold text-rose-400 pl-1">{errors.email}</p>}
                      </Field>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-3">
                      <motion.div variants={itemVars}>
                        <Field className="space-y-1.5">
                          <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">Passcode</FieldLabel>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-10 px-4 bg-[#030712]/50 border border-white/10 rounded-xl text-white text-sm placeholder-slate-700 focus:border-cyan-500/50 transition-all"
                            value={userInfo.password}
                            onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                          />
                        </Field>
                      </motion.div>

                      <motion.div variants={itemVars}>
                        <Field className="space-y-1.5">
                          <FieldLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500 pl-1">Verify</FieldLabel>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="w-full h-10 px-4 bg-[#030712]/50 border border-white/10 rounded-xl text-white text-sm placeholder-slate-700 focus:border-cyan-500/50 transition-all"
                            value={userInfo.confirmPassword}
                            onChange={(e) => setUserInfo({ ...userInfo, confirmPassword: e.target.value })}
                          />
                        </Field>
                      </motion.div>
                    </div>
                  </div>

                  {/* Error handling for passwords */}
                  {(errors.password || errors.confirmPassword) && (
                    <p className="text-[10px] font-bold text-rose-400 pl-1 text-center">{errors.password || errors.confirmPassword}</p>
                  )}

                  {/* Action Button */}
                  <motion.div variants={itemVars} className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full h-11 bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-xl font-bold text-sm tracking-tight hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all active:scale-[0.98]" 
                      disabled={loading}
                    >
                      {loading ? "Constructing Node..." : "Signup"}
                    </Button>
                  </motion.div>

                  {/* Footer Toggle */}
                  <motion.div variants={itemVars}>
                    <p className="text-[12px] text-center text-slate-500 font-bold tracking-medium">
                      Already have an account?{" "}
                      <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        Login
                      </Link>
                    </p>
                  </motion.div>

                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AuthLayout>
  );
};

export default Signup;