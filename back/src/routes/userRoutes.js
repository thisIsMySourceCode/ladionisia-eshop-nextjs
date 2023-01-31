const controllers = require("../controllers/userControllers");
const express = require('express');

const router = express.Router();

const { getUsers, registerUser, loginUser, deleteFavorite, PurchaseHistoryToDb, deleteAllFavorites, favoritesToDb, getAllDisabledUsers, deleteUser, disableUser, getUserById, updateUser } = controllers;


router.get('/:userId', getUserById)
router.get('/', getUsers)
router.get('/disabled', getAllDisabledUsers)
router.patch('/purchase_history/:userId',PurchaseHistoryToDb)
router.patch('/favorite/:userId',favoritesToDb)
// router.patch('/favorite/delete/:userId', deleteFavorite)
router.patch('/favorites/delete/:userId', deleteAllFavorites)
router.patch('/disable/:userId',disableUser)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.delete('/:id', deleteUser)
router.delete('/favorite/:userId', deleteFavorite)
router.put('/:id', updateUser)


module.exports = router;