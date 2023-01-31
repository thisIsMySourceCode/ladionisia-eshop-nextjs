const controllers = require("../controllers/auth0EndPointsControllers");
const express = require('express');

const router = express.Router();

const { getToken, getUserRoles, getUsers, getUserById, getRoles, addUserRole, removeUserRole, updateUser } = controllers;

router.route('/token').get(getToken)
router.route('/user/roles/:sub').get(getUserRoles)
router.route('/user/:sub').get(getUserById)
router.route('/user/addrole').post(addUserRole)
router.route('/user/removerole').delete(removeUserRole)
router.route('/users').get(getUsers)
router.route('/roles').get(getRoles)
router.route('/user/update').patch(updateUser)

module.exports = router;