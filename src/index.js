import './assets/scss/style.scss';
import Product from './assets/js/product';

(
    function() {
        const product = new Product();
        product.populateProduct();
        product.cartListShow();
        product.showDetail();
    }
)();


