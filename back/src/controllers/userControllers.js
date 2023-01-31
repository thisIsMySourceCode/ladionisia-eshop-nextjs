const axios = require("axios").default;
const { User, Product } = require('../db')
const { Op } = require("sequelize");

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users)
  } catch (err) { res.status(500).json(err.message) }
}

const getUserById = async (req, res) => {
  try {
    const { userId } = req.params
    const userFound = await User.findByPk(userId);
    if (!userFound) return res.status(400).json("user not found");
    res.status(200).json(userFound);
  } catch (err) {
    res.status(500).send({ msg: "Error in the server", error: err.message });
  }
};

const getAllDisabledUsers = async (req, res) => {
  try {
    const disabledUsers = await User.findAll({ where: { disabled: true } });
    if (!disabledUsers) { res.status(400).json("no existen usuarios desabilitados") }
    else { res.status(200).json(disabledUsers) }
  } catch (err) { res.status(500).json(err.message) }
}

const registerUser = async (req, res) => {
  const disabled = false
  console.log(req.body)
  const { sub } = req.body
  const userAuth0 = await axios.get(`https://ladionisiaback-js-production.up.railway.app/auth0/user/${sub}`)
  const { user_id, name, nickname, picture, email, family_name, given_name, logins_count } = userAuth0.data

  try {
    if (name && user_id && email) {
      const user = await User.create({ user_id, name, nickname, picture, email, family_name, given_name, logins_count, disabled })
      res.status(201).json({ msg: 'El usuario se creó correctamente.', user })
    } else res.status(400).json({ msg: 'El nombre no puede estar vacío.' })
  } catch (err) {
    // console.log(err.message)
    res.status(500).json(err.message)
  }
}

const loginUser = async (req, res) => {
  try {
    res.status(503).json({ msg: 'Lo sentimos. Ruta en construcción...' })
  } catch (err) { res.status(500).json(err.message) }
}


const deleteUser = async (req, res) => {
  try {
    let { id } = req.params;
    let findUser = await User.findByPk(id);
    if (!findUser) throw new Error("User not found");
    await findUser.destroy();
    res.status(200).json({ msg: "User deleted" });

  } catch (err) { res.status(500).json(err.message) }
};

const disableUser = async (req, res) => {
  const { userId } = req.params
  try {
    await User.update({ disabled: true }, { where: { id: userId } })

    res.status(200).json({ msg: 'El Usuario ha sido desabilitado.' })
  } catch (err) { res.status(500).json(err.message) }
}

const updateUser = async (req, res) => {
  const { id } = req.params
  const { name, nickname, email, family_name, given_name } = req.body

  try {
    const userDb = await User.findByPk(id)

    if (userDb) {
      const userDb = await userDb.update({
        name: name,
        nickname: nickname,
        email: email,
        family_name: family_name,
        given_name: given_name,
      })
      return res.status(200).json("Usuario modificado con exito!")
    }
  } catch (err) {
    res.status(500).send(err)
  }
}


const favoritesToDb = async (req, res) => {
  const { userId } = req.params
  const { product } = req.body
  try {
    const user = await User.findByPk(userId)
    const favorites = user.favorites || []
    const favorite = user.favorites.find(f => f.id === product.id)
    if (!favorite) {
      favorites.push(product)
      await User.update({ favorites: favorites }, { where: { id: userId } })
    }
    res.status(200).json({ msg: 'Product succesfully added to favorites!.' })
  } catch (err) { res.status(500).json(err.message) }
}

const deleteFavorite = async (req, res) => {
  const { userId } = req.params
  const { productId } = req.query
  console.log(productId)

  try {
    const user = await User.findOne({ where: { id: userId } });
    const updatedFavorites = user.favorites.filter(fav => fav.id !== parseInt(productId));
    if (updatedFavorites.length > 0) {
      await User.update({ favorites: updatedFavorites }, { where: { id: userId } });
    } else {
      await User.update({ favorites: [] }, { where: { id: userId } });
    }
    res.status(200).json({ msg: "Favorite deleted from the list!." });

  } catch (err) { res.status(500).json(err.message) }
};

const deleteAllFavorites = async (req, res) => {
  const { userId } = req.params
  try {
    await User.update({ favorites: [] }, { where: { id: userId } })
    res.status(200).json({ msg: "All Favorites deleted from the list!." });

  } catch (err) { res.status(500).json(err.message) }
};

const PurchaseHistoryToDb = async (req, res) => {
  const { userId } = req.params
  const { saleData } = req.body
  try {
    const userPH = await User.findByPk(userId)
    const purchase_history = userPH.purchase_history || []
    purchase_history.push(saleData)

    await User.update({ purchase_history: purchase_history }, { where: { id: userId } })
    res.status(200).json({ msg: 'Sale succesfully added to history!.' })
  } catch (err) { res.status(500).json(err.message) }
}

module.exports = {
  getUsers,
  registerUser,
  loginUser,
  deleteUser,
  getAllDisabledUsers,
  disableUser,
  getUserById,
  updateUser,
  favoritesToDb,
  deleteFavorite,
  deleteAllFavorites,
  PurchaseHistoryToDb
}