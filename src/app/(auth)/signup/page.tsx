"use client";
import CustomButton from "@/components/custom/Button";
import Alert, { AlertHandle } from "@/components/ui/alert";
import Grid from "@/components/ui/grid";
import GridItem from "@/components/ui/gridItem";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/utilities/constants";
import { Field, FieldProps, Form, Formik } from "formik";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { object, string } from "yup";

const validationSchema = object({
  first_name: string()
    .matches(/^[A-Za-z\s]+$/, "name should contain letters only")
    .min(3, "Name must be at least 3 characters")
    .required("required"),
  last_name: string()
    .matches(/^[A-Za-z\s]+$/, "name should contain letters only")
    .min(3, "Name must be at least 3 characters")
    .required("required"),
  email: string().email("invalid email address").required("required"),
  password: string()
    .min(5, "password should contain at least 5 characters")
    .required("required"),
});

type formValues = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export default function Signup() {
  const alert = useRef<AlertHandle | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const initialValues: formValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values: formValues) => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const response = await res.json();
    console.log(response);
    setLoading(false);

    if (response.error) {
      alert.current?.showAlert("error", response.message);
    }

    if (response.accessToken) {
      alert.current?.showAlert("success", "signed up successfully");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96 mx-auto">
        <div className="text-center mb-6">
          <h3>Signup</h3>
          <small>create your account now</small>
        </div>
        <Alert ref={alert} />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form>
              <Grid>
                <GridItem>
                  <Field name="first_name">
                    {({ field }: FieldProps) => (
                      <Input
                        label="First Name"
                        placeholder="enter first name"
                        {...field}
                        error={touched.first_name && errors.first_name}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name="last_name">
                    {({ field }: FieldProps) => (
                      <Input
                        label="Last Name"
                        placeholder="enter last name"
                        {...field}
                        error={touched.last_name && errors.last_name}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name="email">
                    {({ field }: FieldProps) => (
                      <Input
                        label="Email Address"
                        placeholder="enter email"
                        {...field}
                        error={touched.email && errors.email}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <Field name="password">
                    {({ field }: FieldProps) => (
                      <Input
                        label="Password"
                        placeholder="enter password"
                        {...field}
                        error={touched.password && errors.password}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <CustomButton
                    loading={loading}
                    disabled={loading}
                    className="my-3 w-full"
                  >
                    SignUp
                  </CustomButton>
                  <span className="text-center text-sm block">
                    Already have an account?
                    <Link className="font-semibold" href="/login">
                      Login
                    </Link>
                  </span>
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
