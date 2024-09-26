import React, { useState } from 'react';
import avatar from '../assets/User-profile.png';
import styles from '../styles/Username.module.css';
import extend from '../styles/Profile.module.css';
import toast, { ToastBar, Toaster } from 'react-hot-toast'
import { useFormik } from 'formik';
import { profileValidation } from '../helper/Validate';
import { Link } from 'react-router-dom';
import convertToBase64 from '../helper/convert';
import useFetch from '../hooks/fetch.hook';
import { useAuthStore } from '../store/store';
import { updateUser } from '../helper/helper';

// Déclaration du composant fonctionnel Register (formulaire d'inscription)
export default function Profile() {

  // useState pour gérer l'état du fichier (avatar)
  const [file, setFile] = useState();
  const { username } = useAuthStore(state => state.auth)
  const [{ isLoading, apiData, serverError }] = useFetch(`/user/${username}`)

  // Initialisation de Formik pour gérer le formulaire
  const formik = useFormik({
    // Valeurs initiales des champs du formulaire
    initialValues: {
      prenom: apiData?.prenom || '',
      nom: apiData?.nom || '',
      email: apiData?.email || '',
      mobile: apiData?.mobile || '',
      address: apiData?.address || '',
    },
    enableReinitialize : true,
    // Utilisation de la fonction de validation pour les mots de passe
    validate: profileValidation,
    // Désactivation de la validation à la perte de focus
    validateOnBlur: false,
    // Désactivation de la validation à chaque changement de champ
    validateOnChange: false,

    // Fonction qui s'exécute lors de la soumission du formulaire
    onSubmit: async(values) => {
      // Assignation du fichier (avatar) au profil, ou d'une chaîne vide si aucun fichier n'est sélectionné
      values = await Object.assign(values, {profile: file || ''})
      let updatePromise = updateUser(values);

      toast.promise(updatePromise, {
        loading : 'Updating...',
        success : <b>Update Successfully...!</b>,
        error : <b>Could not update </b>
      })
      console.log(values); // Affichage du mot de passe dans la console (à des fins de debug)
    },
  })

  /** Gestion de l'upload de fichier avec Formik */
  const onUpload = async e => {
    // Conversion du fichier en Base64
    const base64 = await convertToBase64(e.target.files[0]);
    // Mise à jour de l'état avec la chaîne Base64 du fichier
    setFile(base64);
  }

  if (isLoading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError) return <h1 className="text-xl text-re-500">{serverError.message}</h1>;
  // Rendu du composant Profile
  return (
    <div className="container mx-auto">
      
      {/* Toaster pour afficher les notifications */}
      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div className={`${styles.glass}`} style={{ width:"45%" }}>
          
          {/* Titre de la page d'inscription */}
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Profile</h4>
            <span className='py-1 text-xl w-2/3 text-center text-gray-500'>
              Vous pouvez modifier les détails
            </span>
          </div>

          {/* Formulaire d'inscription */}
          <form className='py-1' onSubmit={formik.handleSubmit}>
            <div className="flex flex-col mb-6">

              {/* Zone pour uploader et afficher l'image de profil */}
              <div className="profile flex justify-center py-4">
                <label htmlFor="profile">
                  {/* Affichage de l'avatar sélectionné ou de l'avatar par défaut */}
                  <img src={apiData?.profile || file || avatar} className={extend.profile_img} alt="avatar" />
                </label>
                {/* Input pour uploader un fichier (image de profil) */}
                <input onChange={onUpload} type="file" id="profile"/>
              </div>

              {/* Champs de texte pour l'email, le nom d'utilisateur et le mot de passe */}
              <div className="textbox flex flex-col items-center gap-6">
                <div class="name flex w-3/4 gap-10">
                <input
                  type="text"
                  id="prenom"
                  placeholder='Prenom'
                  name="prenom"
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps('prenom')}
                />
                <input
                  type="text"
                  id="nom"
                  placeholder='Nom'
                  name="nom"
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps('nom')}
                />
                </div>
                <div class="name flex w-3/4 gap-10">
                <input
                  type="text"
                  id="mobile"
                  placeholder='contact'
                  className={`${styles.textbox} ${extend.textbox}`}
                  name="contact"
                  {...formik.getFieldProps('mobile')}
                />
                <input
                  type="email"
                  id="email"
                  placeholder='Adresse email*'
                  className={`${styles.textbox} ${extend.textbox}`}
                  name="email"
                  {...formik.getFieldProps('email')}
                />
                </div>
                <div class="name flex w-3/4 gap-10">
                <input
                  type="text"
                  id="address"
                  placeholder='Adresse'
                  className={`${styles.textbox} ${extend.textbox}`}
                  name="address"
                  {...formik.getFieldProps('address')}
                />
                {/* Bouton de soumission du formulaire */}
                <button className={styles.btn} type="submit">Modifier</button>
                </div>
              </div>

              {/* Lien pour les utilisateurs déjà inscrits pour se connecter */}
              <div className="text-center py-4">
                <span className='text-gray-500'>Vous voulez vous déconnecter ? <Link className='text-red-500' to="/">Se deconnecter</Link></span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
