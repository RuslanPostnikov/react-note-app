import {useFormik} from "formik";
import axios from 'axios';
import {URL} from '../shared/url'

const Registration = () => {

  const signUp = async values => {
    try {
      const {data} = await axios.post(URL + '/api/auth/register',values);
      alert(data.message);

    } catch (e) {
      if(e.code === '400') {
        alert('Username already exists');
      }
      console.log(e.status);
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
    onSubmit: signUp
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
        >Sign up</button>
      </form>
    </div>
  );
};

export default Registration;

