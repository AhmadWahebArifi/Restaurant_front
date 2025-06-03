import React, { useContext, useState } from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import authContext from "../../store/auth-context";
import Logo from "../../image/f4.png";
import App from "../../App";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Username is required."),
  password: Yup.string()
    .min(6, "Password Must be at least 6 characters or more.")
    .required("Password is required"),
});

const Login = () => {
  const ctx = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {ctx.isLogin ? (
        <App />
      ) : (
        <section class="h-auto bg-gray-100 py-22 lg:py-[150px] dark:bg-dark">
          <div class="container mx-auto">
            <div class="-mx-4 flex flex-wrap">
              <div class="w-full px-4">
                <div class="relative mx-auto max-w-[525px] overflow-hidden rounded-2xl bg-white px-10 py-16 text-center sm:px-12 md:px-[60px] dark:bg-dark-2">
                  <div class="mb-10 text-center md:mb-16">
                    <span className="mr-36 font-serif text-lg">Welcome</span>
                    <a
                      href="javascript:void(0)"
                      class="mx-auto inline-block max-w-[60px]"
                    >
                      <img src={Logo} alt="logo" />
                    </a>
                  </div>
                  {/* form */}
                  <Formik
                    initialValues={{ username: "", password: "" }}
                    validationSchema={LoginSchema}
                    onSubmit={(values) => {
                      console.log(values.username);
                      ctx.onLogin(values.username, values.password);
                    }}
                  >
                    {({ handleSubmit }) => (
                      <form onSubmit={handleSubmit}>
                        <div class="mb-6">
                          <Field
                            type="text"
                            name="username"
                            placeholder="Username"
                            className={
                              "w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-hidden focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                            }
                            class="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-hidden focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                          />
                          <ErrorMessage
                            class="text-red-600"
                            name="username"
                            component="div"
                          />
                        </div>

                        <div class="mb-6">
                          <Field
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            class="w-full rounded-lg border border-stroke bg-transparent py-3 pl-5 pr-12 text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="right-4 
                          top-1/4 translate-x-44 -translate-y-10 text-sm text-gray-500"
                          >
                            {showPassword ? "👁️" : "👁️‍🗨️"}
                          </button>
                          <ErrorMessage
                            class="text-red-600 "
                            name="password"
                            component="div"
                          />

                          {/* Toggle button */}
                          {/* className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500" */}
                        </div>
                        <div class="mb-10">
                          <input
                            type="submit"
                            value="Sign In"
                            class="w-full cursor-pointer rounded-md border border-primary bg-blue-800 px-5 py-3 text-base font-medium text-white transition hover:bg-primary/90"
                          />
                        </div>
                      </form>
                    )}
                  </Formik>
                  <a
                    href="#"
                    class="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
                  >
                    Forget Password?
                  </a>
                  <p class="text-base text-body-color dark:text-dark-6">
                    <span class="pr-0.5">Not a member yet?</span>
                    <a href="#" class="text-primary hover:underline">
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Login;
