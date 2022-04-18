import {useFormik} from "formik";
import {useAuth} from "../shared/AuthContext";
import axios from 'axios';
import {URL} from '../shared/url';

const Auth = () => {
    const {setAuth} = useAuth();

    const signIn = async values => {
        try {
            const {data} = await axios.post(URL + '/api/auth/login',values);
            console.log(data);

            localStorage.setItem('jwt_token', data.jwt_token);
            window.localStorage.setItem('auth', 'true');
            setAuth(true);

            document.location.reload();
        } catch (e) {
            console.log(e);
            alert('Wrong Username or password')
        }

    }


    const validate = values => {
        const errors = {};

        if (!values.username)  errors.username = 'Required';

        if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 6) {
            errors.password = 'Must be 6 characters or more'
        }

        return errors
    }

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: signIn
    })

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className={'form-group'}>
                    <label htmlFor="username">Username</label>
                    <input
                        className={'form-control'}
                        value={formik.values.email}
                        type="text" id={'username'} name={'username'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.username && formik.errors.username ? <div className='alert alert-danger p-1'>{formik.errors.username}</div> : null}
                </div>

                <div className={'form-group'}>
                    <label htmlFor="password">Password</label>
                    <input
                        className={'form-control'}
                        value={formik.values.password}
                        type="password" id={'password'} name={'password'}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                    />
                    {formik.touched.password && formik.errors.password ? <p className='alert alert-danger p-1'>{formik.errors.password}</p> : null}
                </div>

                <button
                  type={"submit"}
                  className={'btn btn-primary mt-3'}
                  disabled={!(formik.isValid && formik.dirty)}
                >Sign in</button>
            </form>
        </div>
    );
};

export default Auth;

