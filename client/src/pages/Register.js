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
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/userActions';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';

//Input fields validation schema
const RegisterSchema = Yup.object().shape({
	email: Yup.string().email()
        .min(6, 'Email too short!')
        .max(100, 'Email too long!')
        .required('Required'),
    username: Yup.string()
        .min(6, 'Username too short!')
        .max(100, 'Username too long!')
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

const Register = () => {

    const [ register, { data }] = useMutation(REGISTER_MUTATION);
    const history = useHistory();

    const dispatch = useDispatch();
    const classes = useStyles();

    const registerMe = async ({username, email, password, confirmPassword}, setSubmitting, resetForm ) => {
    	const res = await register({variables: {username, email, password, confirmPassword}})
    	resetForm();
    	dispatch(registerUser(res))
    	setSubmitting(false);
        history.push('/');
    };

    return (
        <Container>
            <div className={classes.root}>
                <Typography variant="h3" component="h1" gutterBottom>
                    Please Register:
                </Typography>
                <Formik 
                    initialValues={{ email: '', username: '', password: '', confirmPassword: ''}}
                    validationSchema={RegisterSchema}
                    onSubmit={(values, { setSubmitting, resetForm  }) => {
                    	registerMe(values, setSubmitting, resetForm )
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
                                label="Enter your email"
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
                                className={classes.textF}
                                variant="outlined"
                                label="Enter your username"
                                type="text"
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
                            <TextField
                                className={classes.textF}
                                variant="outlined"
                                label="Confirm password."
                                type="password"
                                name="confirmPassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmPassword}
                                helperText={errors.confirmPassword && touched.confirmPassword && errors.confirmPassword}
                                margin="dense"
                                error={(errors.confirmPassword && touched.confirmPassword && errors.confirmPassword) ? true : false}
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

const REGISTER_MUTATION = gql`
    mutation registerUser($username: String! $email: String! $password: String! $confirmPassword: String!) {
        register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
        ) {
        	id email username createdAt token
        }
    }
`;

export default Register;