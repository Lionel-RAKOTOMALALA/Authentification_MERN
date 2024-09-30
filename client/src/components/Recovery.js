import React, { useState, useEffect } from 'react';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export default function Recovery() {
  const { username } = useAuthStore(state => state.auth); // Récupérer l'username
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  // Utiliser useEffect pour générer l'OTP au premier rendu
  useEffect(() => {
    if (username) {
      generateOTP(username).then((OTP) => {
        if (OTP) {
          toast.success('OTP has been sent to your email!');
        } else {
          toast.error('Problem while generating OTP');
        }
      });
    } else {
      toast.error('No username found!');
    }
  }, [username]);

  // Fonction pour gérer la soumission du formulaire
  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verified Successfully');
        navigate('/reset');
      } else {
        toast.error('Wrong OTP! Check your email again!');
      }
    } catch (error) {
      toast.error('Error while verifying OTP!');
    }
  }

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false} />

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recuperation</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter your confirmation code
            </span>
          </div>

          <form className='pt-20' onSubmit={onSubmit}>
            <div className="flex flex-col mb-6">
              <div className="textbox flex flex-col items-center gap-6">
                <span className='py-2 text-sm text-left text-gray-500'>
                  Enter the 6-digit code sent to your email
                </span>
                <input
                  type="text"
                  value={OTP}
                  onChange={(e) => setOTP(e.target.value)}
                  id="OTP"
                  placeholder='Confirmation Code'
                  className={styles.textbox}
                />
                <button className={styles.btn} type="submit">Verify</button>
              </div>
              <div className="text-center py-4">
                <span className='text-gray-500'>
                  Didn't receive your code? <button className='text-red-500'>Resend</button>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
