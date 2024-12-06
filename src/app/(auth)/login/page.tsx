"use client";
import React, { useRef, useState } from "react";
import { setTokens, setUser } from "@/app/store/features/authSlice";
import { useAppDispatch } from "@/app/store/hooks";
import CustomButton from "@/components/custom/Button";
import Alert, { AlertHandle } from "@/components/ui/alert";
import Grid from "@/components/ui/grid";
import GridItem from "@/components/ui/gridItem";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/utilities/constants";
import { reportErrors } from "@/utilities/helpers";
import { Field, FieldProps, Form, Formik } from "formik";
import Link from "next/link";

import { object, string } from "yup";
import { useRouter } from "next/navigation";

interface formValues {
  email: string;
  password: string;
}

const validationSchema = object({
  email: string().email("invalid email address").required("required"),
  password: string().required("required"),
});

export default function Login() {
  const alert = useRef<AlertHandle | null>(null);

  const router = useRouter();

  //redux
  const dispatch = useAppDispatch();

  //states
  const [loading, setLoading] = useState(false);

  const initialValues: formValues = { email: "", password: "" };

  const handleSubmit = async (values: formValues) => {
    setLoading(true);
    alert.current?.showProgress("authenticating");
    try {
      const res = await fetch(`${BASE_URL}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const response = await res.json();

      setTimeout(() => {
        if (response.error) {
          alert.current?.showAlert("error", response.message);
          setLoading(false);
        }
        dispatch(setTokens(response.accessToken));
        dispatch(setUser(response.user));
        router.push("/");
      }, 2000);
    } catch (error: Error | unknown) {
      setTimeout(() => {
        if (error instanceof Error && alert.current) {
          reportErrors(alert.current, error);
        }
        setLoading(false);
      }, 2000);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-96 mx-auto">
        <div className="mb-6 text-center">
          <h3>Sign In</h3>
          <small>Login with email and password</small>
        </div>
        <Alert ref={alert} />
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ touched, errors }) => (
            <Form>
              <Grid>
                <GridItem>
                  <Field name="email">
                    {({ field }: FieldProps) => (
                      <Input
                        label="email"
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
                        label="password"
                        type="password"
                        placeholder="enter password"
                        {...field}
                        error={touched.password && errors.password}
                      />
                    )}
                  </Field>
                </GridItem>
                <GridItem>
                  <CustomButton
                    type="submit"
                    className="w-full"
                    disabled={loading}
                  >
                    Sign In
                  </CustomButton>
                  <span className="text-center text-sm block">
                    Dont have an account?
                    <Link className="font-semibold" href="/signup">
                      Signup
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
