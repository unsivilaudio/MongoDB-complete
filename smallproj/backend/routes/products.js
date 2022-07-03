const Router = require('express').Router;
const router = Router();

const {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} = require('../controllers/products');

// Get list of products products
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

router.route('/').post(createProduct);
router.route('/:id').patch(updateProduct).delete(deleteProduct);

module.exports = router;
