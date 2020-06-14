import React from 'react'
import {
    Container,
    TextField,
    Button
} from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/loginUser';

//Input fields validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email()
        .min(6, 'Email too short!')
        .max(100, 'Email too long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password too short!')
        .max(100, 'Password too long!')
        .required('Required')
})

const Register = () => {

    const CurrentUser = useSelector(state=>state.CurrentUser);
    const dispatch = useDispatch();

    const logMeIn = (values, setSubmitting) => {
        console.log(values);
        dispatch(loginUser);
        setSubmitting(false);
    };

    return (
        <Container>
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={values => {
                    const errors = {};
                    if (!values.email) {
                    errors.email = 'Required';
                    } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                    errors.email = 'Invalid email address';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                   logMeIn(values, setSubmitting);
                }}
                >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            label="Enter your email address"
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            helperText={errors.email && touched.email && errors.email}
                            margin="dense"
                            error={(errors.email && touched.email && errors.email) ? true : false}
                        />
                    <TextField
                        variant="outlined"
                        label="Enter your password."
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        helperText={errors.password && touched.password && errors.password}
                        margin="dense"
                        error={(errors.password && touched.password && errors.password) ? true : false}
                    />
                    <Button type="submit" disabled={isSubmitting} color="primary" variant="contained">
                        Submit
                    </Button>
                    </form>
                )}
            </Formik>
        </Container>
    )
};

export default Register;