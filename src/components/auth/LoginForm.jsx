import Logo from "../../image/f4.png";
import { Formik, Field, ErrorMessage } from "formik";
import { Eye } from "lucide-react";
import * as Yup from "yup";
import { useContext, useState } from "react";
import authContext from "../../store/auth-context";

const LoginSchema = Yup.object().shape({
  username: Yup.string().required("نام ضروری می باشد"),
  password: Yup.string()
    .min(6, "پسورد از شش حرف کم نباشد")
    .required("پسورد لازم است"),
});

const Form = () => {
  const ctx = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-auto bg-gray-100 py-22 lg:py-[150px] dark:bg-dark overflow-hidden">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[525px] overflow-hidden rounded-2xl bg-white px-10 py-16 text-center sm:px-12 md:px-[60px] dark:bg-dark-2">
              <div className="mb-10 text-center md:mb-16">
                <span className="ml-36 font-serif text-lg">خوش آمدید</span>
                <a
                  href="javascript:void(0)"
                  className="mx-auto inline-block max-w-[60px]"
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
                    <div className="mb-6">
                      <Field
                        type="text"
                        name="username"
                        placeholder="ایمل"
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
                          placeholder="پسورد"
                          // Make padding match username field: px-5 py-3
                          className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-dark placeholder-dark-6 outline-hidden focus:border-primary dark:border-dark-3 dark:text-white dark:placeholder-dark-5"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-500"
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
                پسورد تانرا از یاد برده اید ؟
              </a>
              <p className="text-base text-body-color dark:text-dark-6">
                <span className="pr-0.5">تا حال عضو نیستید؟</span>
                <a
                  href="signup-form"
                  className="text-primary hover:underline m-2"
                >
                  ثبت نام
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
