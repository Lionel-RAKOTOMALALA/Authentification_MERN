import React from 'react';
import avatar from '../assets/profile.jpeg';
import styles from '../styles/Username.module.css';
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/Validate';


export default function Reset() {

const formik = useFormik({
  initialValues: {
    password: '',
    confirm_pwd: '',
  },
  validate: passwordValidate,
  validateOnBlur: false,
  validateOnChange: false,

  onSubmit: async(values) => {
    console.log(values.password)
  },
})



  return (
    <div className="container mx-auto">
    
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Reset</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Entrez un nouveau mot de passe
            </span>
          </div>

          <form className='py-20' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">
              
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  type="password"
                  id="password"
                  placeholder='Nouveau mot de passe'
                  name="password"
                  className={styles.textbox}
                  {...formik.getFieldProps('password')}
                />
                <input
                  type="password"
                  id="password"
                  placeholder='confirmer le mot de passe'
                  name="confirm_pwd"
                  className={styles.textbox}
                  {...formik.getFieldProps('confirm_pwd')}
                />
                <button className={styles.btn} type="submit">Reset</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
