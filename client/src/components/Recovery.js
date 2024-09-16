import React from 'react';
import avatar from '../assets/profile.jpeg';
import styles from '../styles/Username.module.css';
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { passwordValidate } from '../helper/Validate';

export default function Recovery() {

  return (
    <div className="container mx-auto">
    
      <Toaster position='top-center' reverseOrder={false}></Toaster>
      
      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recupération</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Entrez votre code de confirmation
            </span>
          </div>

          <form className='pt-20' >
            <div className="flex flex-col mb-6">
             
              <div className="textbox flex flex-col items-center gap-6">
              <span className='py-2 text-sm text-left text-gray-500'>
                Entrez 6 chiffres que vous avez recu sur votre adresse email
              </span>
                <input
                  type="text"
                  id="OTP"
                  placeholder='Code de confirmation'
                  name="password"
                  className={styles.textbox}
                />
                <button className={styles.btn} type="submit">Se connecter</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>Vous n'avez pas recu votre code ? <button className='text-red-500'>Renvoyer</button></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
