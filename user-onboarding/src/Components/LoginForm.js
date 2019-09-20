import React, { useState, useEffect } from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

// Adding destructured 'errors' prop to the form. The 'errors' prop gets passed down from the 'withFormik' component.
function LoginForm({ status, errors, touched }) {
    // set state
    const [users, setUsers] = useState([])

    // useEffect hook
    useEffect(() => {
        if (status) {
            setUsers([...users, status])
        }
    }, [status])

    return (
        <Form>
            <div>
                {touched.name && errors.name && <p>{errors.name}</p>}
                <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                />
            </div>
            <div>
                {touched.email && errors.email && <p>{errors.email}</p>}
                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                />
            </div>
            <div>
                {touched.password && errors.password && <p>{errors.password}</p>}
                <Field 
                    type="password"
                    name="password"
                    placeholder="Password"
                />
            </div>
            {touched.tos && errors.tos && <p>{errors.tos}</p>}
            <label>
                <Field 
                    type="checkbox"
                    name="tos"
                    value="false"
                    // checked={values.tos}
                />
                {/* {console.log(values.tos)} */}
                Accept TOS
            </label>
            <button type="submit">Submit Form</button>

            {users.map(user => {
                return (
                    <div key={user.name}>Name: {user.name}</div>
                )
            })}

        </Form> 
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || "false"
        }
    },

    // VALIDATION SCHEMA
    validationSchema: Yup.object().shape({
        name: Yup.string()
        .required("Name is required to submit form"),
        email: Yup.string()
        .email("Email not valid")
        .required("Email is required to submit form"),
        password: Yup.string()
        .min(6, "Password must be 6 characters or longer")
        .required("Password is required to submit form"),
        tos: Yup.boolean()
        .oneOf([true], "Please accept our TOS before submitting your form")
    }),
    // END VALIDATION SCHEMA

    // create submit handler 
    handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
        console.log(values)

        axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
                console.log(res)
                resetForm()
                setStatus(res.data)
                // setSubmitting(false)
            })
            .catch(err => {
                console.log(err)
                // setSubmitting(false)
            })
    }
})(LoginForm)

export default FormikLoginForm