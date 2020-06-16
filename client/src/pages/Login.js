import React from 'react'
import {
    Container,
    TextField,
    Button,
    Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../store/actions/loginUser';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

//Input fields validation schema
const LoginSchema = Yup.object().shape({
    email: Yup.string().email()
        .min(6, 'Email too short!')
        .max(100, 'Email too long!')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Password too short!')
        .max(100, 'Password too long!')
        .required('Required'),
    confirmPassword: Yup.string()
        .min(6, 'Password too short!')
        .max(100, 'Password too long!')
        .required('Required')
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: `calc(100vh - ${theme.appBar.height})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    textF: {
        minWidth: 400,
        [theme.breakpoints.down('sm')]: {
            minWidth: 300
        }
    },
    button: {
        marginTop: '8px',
        marginBottom: '4px'
    }
  }));

const Login = () => {

    const [ login, { data }] = useMutation(LOGIN_MUTATION);

    const CurrentUser = useSelector(state=>state.CurrentUser);
    const dispatch = useDispatch();
    const classes = useStyles();

    const logMeIn = ({ username, password }, setSubmitting) => {
        console.log(username, password)
        login({ variables: { username, password }});
        console.log(data)
        // dispatch(loginUser);
        setSubmitting(false);
    };

    return (
        <Container>
            <div className={classes.root}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Please Login:
                </Typography>
                <Formik 
                    initialValues={{ username: '', password: ''}}
                    validationSchema={LoginSchema}
                    onSubmit={(values, { setSubmitting,  }) => {
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
                        <form 
                            onSubmit={handleSubmit}
                            className={classes.form}
                            >
                            <TextField
                                className={classes.textF}
                                variant="outlined"
                                label="Enter your username"
                                type="username"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                                helperText={errors.username && touched.username && errors.username}
                                margin="dense"
                                error={(errors.username && touched.username && errors.username) ? true : false}
                            />
                            <TextField
                                className={classes.textF}
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
                            <Button 
                                type="submit" 
                                disabled={isSubmitting} 
                                color="primary" 
                                variant="contained"
                                className={classes.button}
                            >
                                Submit
                            </Button>
                        </form>
                    )}
                </Formik>
            </div>
        </Container>
    )
};

const LOGIN_MUTATION = gql`
    mutation LogMeIn($username: String! $password: String!) {
        login(username: $username password: $password ) {
            id username email token
        }
    }
`;

export default Login;