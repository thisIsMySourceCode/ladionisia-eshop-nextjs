const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const Products = require('./productRoutes')
const auth0EndPointsRoutes = require('./auth0EndPointsRoutes');
const userRoutes = require('./userRoutes');
const Comment = require('./commentRoutes')
const Emailer = require("./mailerRoutes")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/products', Products)
router.use('/auth0', auth0EndPointsRoutes);
router.use('/users', userRoutes);
router.use('/comments', Comment)
router.use('/sendEmail', Emailer)


module.exports = router;
