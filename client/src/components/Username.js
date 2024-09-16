import React from 'react';
import avatar from '../assets/User-profile.png';
import styles from '../styles/Username.module.css';
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { usernameValidate } from '../helper/Validate';
import { Link } from 'react-router-dom';
export default function Username() {

const formik = useFormik({
  initialValues: {
    username: '',
  },
  validate: usernameValidate,
  validateOnBlur: false,
  validateOnChange: false,

  onSubmit: async(values) => {
    console.log(values)
  },
})



  return (
    <div className="container mx-auto">
    
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Bonjour encore</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explorez plus en vous connectant avec nous.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">
              <div className="profile flex justify-center py-4">
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  type="text"
                  id="username"
                  placeholder='Nom d’utilisateur'
                  name="username"
                  className={styles.textbox}
                  {...formik.getFieldProps('username')}
                />
                <button className={styles.btn} type="submit">Allons-y</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Pas encore membre ? <Link className='text-red-500' to="/register">Inscrivez-vous maintenant</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
