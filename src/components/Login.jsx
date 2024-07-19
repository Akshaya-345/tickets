import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const validUsers = [
  { username: "user1", password: "password1" },
  { username: "Akshaya", password: "Akshaya@123" },
  { username: "Kishore", password: "akkuu" },
  { username: "user4", password: "password4" },
  { username: "user5", password: "password5" },
];

const Login = ({ onLogin }) => {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (values, { setSubmitting, setFieldError }) => {
    const user = validUsers.find(
      (user) =>
        user.username === values.username && user.password === values.password
    );

    if (user) {
      onLogin(values.username);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', values.username);
      navigate('/');
    } else {
      setFieldError("password", "Invalid username or password!");
      setSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700">
      <div className="flex-1 flex justify-center items-center px-6">
        <div className="max-w-md">
          <h2 className="text-4xl font-extrabold mb-6 text-white text-center">Welcome to Kapture CX</h2>
          <p className="text-gray-300 text-center">
            Sign in to access your account...
          </p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Login</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({isSubmitting}) => (
              <Form>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <Field
                    type="text"
                    id="username"
                    name="username"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showPassword ? "text" : "password"}
                      id="password"
                      name="password"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-700"
                      style={{ zIndex: "10" }}
                      onClick={handleTogglePassword}
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-gray-700"
                          // xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 1116 0 8 8 01-16 0z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M5.707 7.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0zm8.586 4.414a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-700"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM2 10a8 8 1116 0 8 8 01-16 0z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M5.707 7.293a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0zm8.586 4.414a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-900 hover:to-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign in
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;