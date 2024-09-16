import { Router } from "express"

const router = Router();

/** import all controllers */
import * as controller from '../controllers/appController.js';
import Auth from '../middleware/auth.js'


/** POST METHODE */
router.route('/register').post(controller.register); //register user
// router.route('/registerMail').post(); // send the mail
router.route('/authenticate').post((req, res) => res.end()); // authenticate user
router.route('/login').post( controller.verifyUser ,controller.login); // login in app

/** GET METHODE */
router.route('/user/:username').get(controller.getUser); // user with username
router.route('/generateOPT').get(controller.generateOPT); // generate random OPT
router.route('/verifyOPT').get(controller.verifyOPT); // verify generated OPT
router.route('/createResetSession').get(controller.createResetSession); // reset all the variables
/** PUT METHODE */
router.route('/updateuser').put(Auth, controller.updateUser); // is use to update the user profile
router.route('/resetPassword').put(controller.resetPassword); // use to reset password

export default router;