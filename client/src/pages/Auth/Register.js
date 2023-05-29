import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Layout from "../../components/Layout/Layout";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import "react-notifications/lib/notifications.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../style/AuthStyles.css";

const Register = () => {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    phone: Yup.string().required("Phone number is required"),
    address: Yup.string().required("Address is required"),
    answer: Yup.string().required("Notes are required"),
  });

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post("/api/v1/auth/register", values);
      if (res && res.data.success) {
        toast.success(res.data.message, "Success");
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title="Register - GalaxyTech">
      <div className="form-container">
        <h1>Register Page</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-3">
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter Your Name"
                required
              />
              <ErrorMessage
                name="name"
                component="div"
                className="error-message"
              />
            </div>
            <div className="mb-3">
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter Your Email"
                required
              />
              <ErrorMessage
                name="email"
                component="div"
                className="error-message"
              />
            </div>
            <div className="mb-3">
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter Your Password"
                required
              />
              <ErrorMessage
                name="password"
                component="div"
                className="error-message"
              />
            </div>
            <div className="mb-3">
              <Field
                type="text"
                name="phone"
                className="form-control"
                placeholder="Enter Your Phone Number"
                required
              />
              <ErrorMessage
                name="phone"
                component="div"
                className="error-message"
              />
            </div>
            <div className="mb-3">
              <Field
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter Your Address"
                required
              />
              <ErrorMessage
                name="address"
                component="div"
                className="error-message"
              />
            </div>
            <div className="mb-3">
              <Field
                type="text"
                name="answer"
                className="form-control"
                placeholder="Notes"
                required
              />
              <ErrorMessage
                name="answer"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        </Formik>
        <NotificationContainer />
      </div>
    </Layout>
  );
};

export default Register;
