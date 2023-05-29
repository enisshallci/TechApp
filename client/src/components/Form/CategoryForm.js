import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  const validationSchema = Yup.object().shape({
    category: Yup.string().required("Category is required"),
  });

  return (
    <Formik
      initialValues={{ category: value }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div className="mb-3">
          <Field
            type="text"
            name="category"
            className="form-control"
            placeholder="Enter new category"
          />
          <ErrorMessage name="category" component="div" className="error" />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </Form>
    </Formik>
  );
};

export default CategoryForm;
