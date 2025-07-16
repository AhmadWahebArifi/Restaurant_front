import { Formik, Field, ErrorMessage } from "formik";
import Logo from "../../image/f4.png";
import * as Yup from "yup";
import { useState, useEffect, useContext } from "react";
import authContext from "../../store/auth-context";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Name is required !"),
  email: Yup.string()
    .required("Email is requird")
    .email("Invalid email format"),
  password: Yup.string()
    .min(6, "Password must be at least 6 ! ")
    .required("Password is required ! "),
  password_confirm: Yup.string()
    .min(6, "Password must be at least 6 ! ")
    .required("Password is required ! ")
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const SignupForm = () => {
  const ctx = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);

  // Prevent scrolling on body when this component is mounted
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <section className="min-h-screen bg-gray-100 py-8 lg:py-12 overflow-hidden dark:bg-dark">
      <div className="container mx-auto overflow-hidden">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-2xl bg-white px-10 py-10 text-center sm:px-12 md:px-[60px] dark:bg-dark-2">
              <div className="mb-10 text-center md:mb-16">
                <span className="font-serif text-lg block mb-2">Welcome</span>
                <div className="flex justify-center">
                  <a href="javascript:void(0)" className="inline-block">
                    <img src={Logo} alt="logo" className="w-28" />
                  </a>
                </div>
              </div>
              {/* form */}
              <Formik
                initialValues={{
                  username: "test",
                  email: "test@test.com",
                  password: "testtest",
                  password_confirm: "testtest",
                }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  console.log("Form values:", values);
                  console.log("Submitting registration...");
                  ctx.onSignup(
                    values.username,
                    values.email,
                    values.password,
                    values.password_confirm
                  );
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                      <Field
                        type="text"
                        name="username"
                        placeholder="Username"
                        className={
                          "w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm text-black outline-hidden focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                        }
                      />
                      <ErrorMessage
                        className="text-red-600 text-xs mt-1"
                        name="username"
                        component="div"
                      />
                    </div>

                    <div className="mb-6">
                      <Field
                        type="text"
                        name="email"
                        placeholder="Email"
                        className={
                          "w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm text-black outline-hidden focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                        }
                      />
                      <ErrorMessage
                        className="text-red-600 text-xs mt-1"
                        name="email"
                        component="div"
                      />
                    </div>

                    <div className="mb-6 flex flex-col relative">
                      <div className="relative w-full">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm text-black placeholder-gray-500 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                          tabIndex={-1}
                        ></button>
                      </div>
                      <ErrorMessage
                        className="text-red-600 text-xs mt-1"
                        name="password"
                        component="div"
                      />
                    </div>
                    <div className="mb-6 flex flex-col relative">
                      <div className="relative w-full">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password_confirm"
                          placeholder="Password Confirm"
                          className="w-full rounded-md border border-stroke bg-transparent px-3 py-2 text-sm text-black placeholder-gray-500 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
                        />

                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                          tabIndex={-1}
                        ></button>
                      </div>
                      <ErrorMessage
                        className="text-red-600 text-xs mt-1"
                        name="password_confirm"
                        component="div"
                      />
                    </div>

                    <div className="mb-10">
                      <input
                        type="submit"
                        value="Sign up"
                        className="w-full cursor-pointer rounded-md border border-primary bg-blue-800 px-5 py-3 text-base font-medium text-white transition hover:bg-primary/90"
                      />
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SignupForm;
