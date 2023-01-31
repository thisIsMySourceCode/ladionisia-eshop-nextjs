const { Router } = require("express");
const { getAllProducts, getProductsById, getAllStock, disableProduct, postProduct, updateProduct, getDisabledProducts, getFeatured, getBestRated, getWineByYear, getWineTypes, getWineByCountry, getWineByRegion, deleteProduct } = require("../controllers/productControllers");


const router = Router();

router.get('/', getAllProducts)
router.get('/disabled', getDisabledProducts)
router.get('/allStock', getAllStock)
router.get('/featured', getFeatured)
router.get('/wineTypes/:type', getWineTypes)
router.get('/wineByYear', getWineByYear)
router.get('/region/:region', getWineByRegion)
router.get('/country/:country', getWineByCountry)
router.get('/:id', getProductsById)
router.get('/bestRated', getBestRated)
router.patch('/disable/:productId', disableProduct)
router.delete('/delete/:productId', deleteProduct)
router.post('/', postProduct)
router.put('/:id', updateProduct)

// .delete(archiveProduct);
module.exports = router;