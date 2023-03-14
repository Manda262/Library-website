import express from 'express'
import { AdminController } from '../controllers/adminController'

const adminRouter = express.Router();

adminRouter.route('/login').post(
    (req, res)=> new AdminController().login(req, res)
)

adminRouter.route('/promeniBrDana').post(
    (req, res) => new AdminController().promeniBrDana(req, res)
)

export default adminRouter;