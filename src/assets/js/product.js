import utility from './lib';
import { products } from './data';
import DOMCreation from './domUtility';
import Cart from './cart';
import Details from './details';


export default function Product() {
    const util = utility();
    const productListDom = util.domQuery.getDomByQuery('.product-list');
    const cart = new Cart(util);
    const details = new Details(util);
    const cartProduct = util.storage.getData('cart-product', []);
    let newProducts = [];

    this.populateProduct = () => {
        let proDom = '';
        const ids = cartProduct.map ( m => m.id);
        newProducts = products.map( pro => {
            const index = ids.indexOf(pro.id);
            return index > -1 ? cartProduct[index] : pro;
        });
        newProducts.forEach(pro => {
            proDom += DOMCreation.createCardDom(pro);
        });
        util.domQuery.setDomInnerHTML(productListDom, proDom);
        cart.addCart(newProducts);
    };

    this.cartListShow = () => {
        const cartListDom = util.domQuery.getDomByQuery('.show-cart-items');
        const cartIconDom = util.domQuery.getDomByQuery('.cart-image img');
        const cartCloseDom = util.domQuery.getDomByQuery('.cart-close');
        const cartCounterDom = util.domQuery.getDomByQuery('.counter');
        util.event.addClickEvent([cartIconDom, cartCloseDom, cartCounterDom], 'click', (e) => {
            util.classManipulation.toggle(cartListDom, 'display-block');
        });
    }

    this.showDetail = () => {
        const detailBtnDom = util.domQuery.getAllDomByQuery('.details-btn');
        const modalDom = util.domQuery.getDomByQuery('#productModal');
        const modalCloseDom = util.domQuery.getDomByQuery('.modal-close');
        util.event.addClickEvent([...detailBtnDom,  modalCloseDom], 'click', (e) => {
            const {id} = e.target.dataset;
            if(id) {
                const product = newProducts.find( pro => pro.id === parseInt(id));
                details.createDetailPage(product);
            }
            util.classManipulation.toggle(modalDom, 'display-block');
        });
    }

}