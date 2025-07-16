import Logo from "../../image/f4.png";
import { Formik, Field, ErrorMessage } from "formik";
import { Eye } from "lucide-react";
import * as Yup from "yup";
import { useContext, useState, useEffect } from "react";
import authContext from "../../store/auth-context";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("Name is required ! "),
  password: Yup.string()
    .min(6, "Password shouldn't be less than 6")
    .required("Password is requird"),
});

const Form = () => {
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

  // ...existing code...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-dark">
      <div className="container mx-auto">
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-[525px] px-4">
            <div className="relative mx-auto rounded-2xl bg-white px-10 py-10 text-center sm:px-12 md:px-[60px] dark:bg-dark-2">
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
                initialValues={{ username: "", password: "" }}
                validationSchema={LoginSchema}
                onSubmit={(values) => {
                  console.log(values.username);
                  ctx.onLogin(values.username, values.password);
                }}
              >
                {({ handleSubmit }) => (
                  <form onSubmit={handleSubmit} >
                    <div className="mb-6">
                      <Field
                        type="text"
                        name="username"
                        placeholder="Email"
                        className={
                          "w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-hidden focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                        }
                      />
                      <ErrorMessage
                        className="text-red-600"
                        name="username"
                        component="div"
                      />
                    </div>

                    <div className="mb-6 flex flex-col relative">
                      <div className="relative w-full">
                        <Field
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Password"
                          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
                          tabIndex={-1}
                        >
                          <Eye size={18} />
                        </button>
                      </div>
                      <ErrorMessage
                        className="text-red-600 mt-2"
                        name="password"
                        component="div"
                      />
                    </div>

                    {ctx.userErrorMessage && (
                      <div className="text-red-600 mt-4 mb-4">
                        {ctx.userErrorMessage}
                      </div>
                    )}

                    <div className="mb-10">
                      <input
                        type="submit"
                        value="Sign In"
                        className="w-full cursor-pointer rounded-md border border-primary bg-blue-800 px-5 py-3 text-base font-medium text-white transition hover:bg-primary/90"
                      />
                    </div>
                  </form>
                )}
              </Formik>
              <a
                href="#"
                className="mb-2 inline-block text-base text-dark hover:text-primary hover:underline dark:text-white"
              >
                Forget your password ?
              </a>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">Are you not a member yet ?</span>
                <a
                  href="signup-form"
                  className="text-primary hover:underline m-2"
                >
                  Signup
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Form;
