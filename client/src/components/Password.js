import React from 'react';
import avatar from '../assets/User-profile.png';
import styles from '../styles/Username.module.css';
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/Validate';
import { Link, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';


export default function Password() {

  const navigate = useNavigate();
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch()
  
  const formik = useFormik({
    initialValues: {
      password: 'Lionel320816#',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      let loginPromise = verifyPassword({username, password : values.password})
      toast.promise(loginPromise,{
        loading : 'Checking...',
        success : <b>Login Successfully</b>,
        error : <b>Password Not match!</b>
      });
      loginPromise.then(res =>{
        let { token } =  res.data;
        localStorage.setItem('token', token);
        navigate('/profile');
      })      
    },
  })


  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError) return <h1 className="text-xl text-re-500">{serverError.message}</h1>;
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Bonjour {apiData?.prenom || apiData?.username}</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explorez plus en vous connectant avec nous.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">
              <div className="profile flex justify-center py-4">
                <img src={apiData?.profile || avatar} className={styles.profile_img} alt="avatar" />
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  type="password"
                  id="password"
                  placeholder='Mot de passe'
                  name="password"
                  className={styles.textbox}
                  {...formik.getFieldProps('password')}
                />
                <button className={styles.btn} type="submit">Se connecter</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Mot de passe oublié ? <Link className='text-red-500' to="/recovery">Rénitialisez</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
