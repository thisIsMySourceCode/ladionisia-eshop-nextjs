const { Product } = require('../db')
const { default: axios } = require("axios");
const { Op } = require("sequelize");
const fs = require('fs-extra')
const { uploadImageProduct } = require('../claudinary/claudinary')

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params

    const { winery, wine, rating, country, region, year, description, type, disabled, featured, onSale, totalSalesCurrent, stock, price } = req.body
    if (!req.files?.image) {
      image = undefined;
    }
    if (req.files?.image) {
      const result = await uploadImageProduct(req.files.image.tempFilePath)
      image = result.url
      await fs.unlink(req.files.image.tempFilePath)
    }

    const productFound = await Product.findByPk(id);

    if (productFound) {
      const productUpdated = await productFound.update(
        {
          winery: winery,
          wine: wine,
          rating: rating,
          country: country,
          region: region,
          image: image,
          year: year,
          description: description,
          type: type,
          disabled: disabled,
          featured: featured,
          onSale: onSale,
          totalSalesCurrent: totalSalesCurrent,
          stock: stock,
          price: price
        });

      return res.status(200).json(productUpdated)
    }


  } catch (err) {
    res.status(500).send({ msg: "Server error", error: err.message });
  }
}

const getAllProducts = async (req, res) => {
  try {

    let wine = req.query.wine;

    if (wine) {
      let wineFind = await Product.findAll({
        where: {
          disabled: false,
          wine: { [Op.iLike]: `%${wine}%` }
        }
      })
      if (!wineFind.length) {
        res.status(404).send('Product not found');
      } else {
        res.status(200).json(wineFind)
      }
    }
    if (!wine) {
      let allWinesDb = await Product.findAll({
        where: {
          disabled: false
        },
        attributes: ["id", "type", "price", "wine", "winery", "year", "country", "region", "rating", "image", "description", "disabled", "featured", "onSale", "totalSalesCurrent", "stock"]
      })

      if (!allWinesDb.length) {
        let dataWine = await axios.get('https://mediaciones.ar/wine/getall');
        let data = dataWine.data.map(e => {
          return {
            type: e.type,
            wine: e.wine,
            winery: e.winery,
            year: e.year,
            price: priceGen(e.rating),
            country: e.country,
            region: e.region,
            rating: rateGen(e.rating),
            image: e.image,


          }
        })
        for (let i = 0; i < data.length; i++) {
          await Product.create({
            type: data[i].type,
            wine: data[i].wine,
            winery: data[i].winery,
            year: data[i].year,
            price: data[i].price,
            country: data[i].country,
            region: data[i].region,
            rating: data[i].rating,
            image: data[i].image,
            description: "The wineries " + data[i].winery + " are located in the valleys of the " + data[i].region + " suitable for the cultivation of wine " + data[i].wine + ", producing privileged fruits for the elaboration of a good wine " + data[i].type + " . Made in " + data[i].country + " (DRINKING ALCOHOLIC BEVERAGES IN EXCESS IS HARMFUL)"
          })
        }
        allWinesDb = await Product.findAll({
          where: {
            disabled: false
          },
          attributes: ["id", "type", "price", "wine", "winery", "year", "country", "region", "rating", "image", "description", "disabled", "featured", "onSale", "totalSalesCurrent", "stock"]

        });
        return res.status(200).json(allWinesDb)
      }

      else res.status(200).json(allWinesDb);
    }
  } catch (err) {
    res.status(500).send({ msg: "Server error", error: err.message });
  }
}

const getProductsById = async (req, res) => {
  try {
    const { id } = req.params
    const productById = await Product.findByPk(id);
    if (!productById) return res.status(400).json("product not found");
    res.status(200).json(productById);
  } catch (err) {
    res.status(500).send({ msg: "Error in the server", error: err.message });
  }
};

const priceGen = (rating) => {
  const range = [1, 2, 3, 5, 18, 15, 20, 30, 9, 50, 100, 200],
    seed = Math.abs(Math.sqrt(-1 * Math.log(1 - Math.random())) * Math.cos(1 * Math.PI * Math.random())
    ),
    max = range[rating],
    min = range[rating - 1],
    price = (seed * (max - min + 1) + min).toFixed(2)

  return Math.ceil((price - 0.50) / 0.50) * 0.50 + 0.50
}


const rateGen = (rating) => {
  const
    scores = [0, 20, 40, 50, 60, 70, 80, 90, 96, 98, 100],
    max = scores[rating],
    min = scores[rating - 1],
    seed = Math.abs(
      Math.sqrt(
        -1 * Math.log(1 - Math.random())
      )
      *
      Math.cos(1 * Math.PI * Math.random())
    )
  let result = Math.floor(seed * (max - min + 1) + min)
  return (result > 100) ? 100 : result;
}



const postProduct = async (req, res) => {

  try {

    const {
      type,
      wine,
      winery,
      year,
      rating,
      country,
      region,
      description,
      stock,
      price
    } = req.body;
    // const price = priceGen(rating)

    if (req.files?.image) {
      const result = await uploadImageProduct(req.files.image.tempFilePath)
      image = result.url
      await fs.unlink(req.files.image.tempFilePath)
    }
    if (!req.body.description) {
      const productCreated = await Product.create({
        type,
        wine,
        winery,
        year,
        price,
        rating,
        country,
        region,
        image,
        stock,
        description: "The wineries " + winery + " are located in the valleys of the " + region + " suitable for the cultivation of wine " + wine + ", producing privileged fruits for the elaboration of a good wine " + type + " . Made in " + country + " (DRINKING ALCOHOLIC BEVERAGES IN EXCESS IS HARMFUL)"
      })
      return res.status(200).json(productCreated);
    }
    const productCreated = await Product.create({
      type,
      wine,
      winery,
      year,
      rating,
      price,
      country,
      region,
      image,
      stock,
      description
    });
    return res.status(200).json(productCreated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getDisabledProducts = async (req, res) => {
  try {
    const disabledProducts = await Product.findAll({
      where: { disabled: true }
    });
    res.status(200).json(disabledProducts);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getFeatured = async (req, res) => {
  try {
    const featureds = await Product.findAll({
      where: {
        featured: true,
        disabled: false

      }
    });
    res.status(200).json(featureds);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getBestRated = async (req, res) => {
  try {

    let { from, to } = req.query
    const firstValue = Number(from)
    const secondValue = Number(to)
    const array = [firstValue, secondValue]
    const [f, s] = array


    const bestRated = await Product.findAll({

      where: {
        disabled: false,
        rating: { [Op.between]: [f, s] }
      }
    });
    res.status(200).json(bestRated);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getOnSale = async (req, res) => {
  try {
    const onSale = await Product.findAll({
      where: {
        disabled: false,
        onSale: true
      }
    });
    res.status(200).json(onSale);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineTypes = async (req, res) => {
  try {
    const { type } = req.params;
    const foundWineType = await Product.findAll({

      where: {
        disabled: false,
        type: { [Op.like]: type }
      }
    });
    res.status(200).json(foundWineType);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineByCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const wineByCountry = await Product.findAll({
      where: {
        disabled: false,
        country: { [Op.like]: country }
      }
    });

    res.status(200).json(wineByCountry);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const wineByregion = await Product.findAll({
      where: {
        disabled: false,
        region: { [Op.like]: region }
      }
    });
    res.status(200).json(wineByregion);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const getWineByYear = async (req, res) => {
  try {
    let { from, to } = req.body;

    const firstValue = Number(from)
    const secondValue = Number(to)
    const array = [firstValue, secondValue]
    const [f, s] = array

    const wineYear = await Product.findAll({
      where: {
        disabled: false,
        year: { [Op.between]: [firstValue, secondValue] }
      }
    });
    res.status(200).json(wineYear);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const disableProduct = async (req, res) => {
  const { productId } = req.params
  try {
    await Product.update({ disabled: true }, { where: { id: productId } })

    res.status(200).json({ msg: 'El producto ha sido desabilitado.' })
  } catch (err) { res.status(500).json(err.message) }
}


const getAllStock = async (req, res) => {
  try {
    const productStock = await Product.findAll({
      where: { 
        disabled: false
      }});
    if(!productStock) {return res.status(400).json("Stock not existent");
  } else {
    const stockArray = [];
    productStock.map(e => stockArray.push(e.stock))
    const stockSum = stockArray.reduce((a, b) => a + b, 0)
    res.status(200).json(stockSum);
  }
  } catch (err) {
    res.status(500).send({ msg: "Error in the server", error: err.message });
  }
};



const deleteProduct = async (req, res) => {
  const { productId } = req.params
  try {
    await Product.destroy({ where: { id: productId } })

    res.status(200).json({ msg: 'El producto ha sido eliminado.' })
  } catch (err) { res.status(500).json(err.message) }
}



module.exports = {
  getAllProducts,
  postProduct,
  updateProduct,
  getDisabledProducts,
  getWineTypes,
  getOnSale,
  getBestRated,
  getFeatured,
  getWineByYear,
  getProductsById,
  getWineByCountry,
  getWineByRegion,
  disableProduct,
  getAllStock,
  deleteProduct
};