import React from 'react';
import avatar from '../assets/User-profile.png';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/store';
import { verifyPassword } from '../helper/helper';
import { usernameValidate, passwordValidate } from '../helper/Validate';  // Import validation functions

export default function AuthForm() {
  
  const navigate = useNavigate();
  const setUsername = useAuthStore(state => state.setUsername);
console.log(username);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },

    // Logique de validation personnalisée
    validate: async (values) => {
      let errors = {};
      const usernameErrors = await usernameValidate(values);
      const passwordErrors = await passwordValidate(values);

      errors = { ...usernameErrors, ...passwordErrors };

      return errors;
    },

    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: async (values) => {
      setUsername(values.username);
      
      // Appel à la fonction verifyPassword et gestion des promesses
      try {
        const loginResponse = await verifyPassword({ username: values.username, password: values.password });
        
        if (loginResponse.error) {
          if (loginResponse.username) {
            // Username trouvé mais mot de passe incorrect
            setUsername(loginResponse.username);
            toast.error("Mot de passe incorrect pour l'utilisateur " + loginResponse.username);
          } else {
            toast.error(loginResponse.error);
          }
        } else {
          // Connexion réussie
          let { token } = loginResponse;
          localStorage.setItem('token', token);
          navigate('/profile');
        }
        
      } catch (error) {
        // Afficher le message d'erreur
        toast.error(error.message || "Erreur inconnue");
      }
    },
  });

  return (
    <div className="container mx-auto">
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Bienvenue</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Connectez-vous pour explorer plus.
            </span>
          </div>

          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">
              <div className="profile flex justify-center py-4">
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              {/* Champ pour le nom d'utilisateur */}
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  type="text"
                  id="username"
                  placeholder='Nom d’utilisateur'
                  name="username"
                  className={styles.textbox}
                  {...formik.getFieldProps('username')}
                />
                {formik.errors.username && <div className="text-red-500">{formik.errors.username}</div>}

                {/* Champ pour le mot de passe */}
                <input
                  type="password"
                  id="password"
                  placeholder='Mot de passe'
                  name="password"
                  className={styles.textbox}
                  {...formik.getFieldProps('password')}
                />
                {formik.errors.password && <div className="text-red-500">{formik.errors.password}</div>}

                <button className={styles.btn} type="submit">Se connecter</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>
                  Mot de passe oublié ? <Link className='text-red-500' to="/recovery">Rénitialisez</Link>
                </span>
                <br/>
                <span className='text-gray-500'>
                  Pas encore membre ? <Link className='text-red-500' to="/register">Inscrivez-vous maintenant</Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
