import React from 'react'
import { withFormik, Form, Field } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

function LoginForm() {
    return (
        <div>
            <h1>Login Form</h1>
            <Form>
                <Field
                    type="name"
                    name="name"
                    placeholder="Name"
                />
                <Field
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <Field 
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <label>
                    <Field 
                        type="checkbox"
                        name="tos"
                        checked={values.tos}
                    />
                    {console.log(values.tos)}
                    Accept TOS
                </label>
                <button>Submit Form</button>
            </Form> 
        </div>
    )
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos}) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        }
    }
})

export default LoginForm