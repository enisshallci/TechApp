import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("/api/v1/auth/login", values);
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container " style={{ minHeight: "90vh" }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <h4 className="title">LOGIN FORM</h4>

            <div className="mb-3">
              <Field
                type="email"
                autoFocus
                name="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Enter Your Email"
                required
              />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="mb-3">
              <Field
                type="password"
                name="password"
                className="form-control"
                id="exampleInputPassword1"
                placeholder="Enter Your Password"
                required
              />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn forgot-btn"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div>

            <button type="submit" className="btn btn-primary">
              LOGIN
            </button>
          </Form>
        </Formik>
      </div>
    </Layout>
  );
};

export default Login;
