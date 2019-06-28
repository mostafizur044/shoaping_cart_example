import DOMCreation from './domUtility';

export default function Cart (utiliy) {
    const counterDom = utiliy.domQuery.getDomByQuery('.counter');
    let cartProduct = utiliy.storage.getData('cart-product', []);
    let counter = cartProduct.length;
    let products = [];
    const cartListContainerDom = utiliy.domQuery.getDomByQuery('.cart-container');
    const totalPriceDom = utiliy.domQuery.getDomByQuery('.total-amount-section .total-cart-amount');
    
    utiliy.domQuery.setDomInnerHTML(counterDom, counter);

    this.addCart = (list) => {
        products = list;
        const btn = utiliy.domQuery.getDomByClass('add-cart-btn');
        if(btn) utiliy.event.addClickEvent(btn, 'click', addToCartEvent);
        products.forEach( product => {
            if(product.cartQty) {
                product['isIncDecEvent'] = true;
                incrementDecrement(`.btn-cart-${product.id} .btn-inc-dec`);
            }
        });
        updateCartList();
    }

    function addToCartEvent (e) {
        const {id} = e.target.dataset;
        const product = products.find( pro => pro.id === parseInt(id));
        manipulateAddToCartBtn({
            hideBtnClass: `.button-${product.id}`,
            showBtnClass: `.btn-cart-${product.id}`,
            removeClass: 'display-block',
            addClass: 'display-flex'
        });

        if(!product.isIncDecEvent) {
            product['isIncDecEvent'] = true;
            incrementDecrement(`.btn-cart-${product.id} .btn-inc-dec`);
        }
            
        incrementDecrementCalculation({type: 'inc'}, product);
    }

    function manipulateAddToCartBtn ({hideBtnClass, showBtnClass, removeClass, addClass}) {
        const disBtn = utiliy.domQuery.getDomByQuery(hideBtnClass);
        utiliy.classManipulation.addRemove(disBtn, removeClass, 'display-none');
        const cartBtn = utiliy.domQuery.getDomByQuery(showBtnClass);
        utiliy.classManipulation.addRemove(cartBtn, 'display-none', addClass);
    }

    function incrementDecrement (className) {
        const cartInDEBtn = utiliy.domQuery.getAllDomByQuery(className);
        if(cartInDEBtn)
            utiliy.event.addClickEvent(cartInDEBtn, 'click', productIncrementDecrement);
    };

    function setLocalStorageCartListCounter (product) { 
        const index = cartProduct.findIndex( pro => pro.id === product.id);
        if(index > -1) {
            cartProduct[index] = product;
        } else {
            cartProduct = [...cartProduct, product];
        }
        cartProduct = cartProduct.filter( f => f.cartQty > 0);
        updateCounterDomWithStorage();
        updateCartList();
    };

    function updateCounterDomWithStorage() {
        utiliy.storage.setData('cart-product', cartProduct);
        counter = cartProduct.length;
        utiliy.domQuery.setDomInnerHTML(counterDom, counter);
    }

    function productIncrementDecrement(e) {
        const {id, type} = e.target.dataset;
        const product = products.find( pro => pro.id === parseInt(id));
        incrementDecrementCalculation({id, type},product);
    }

    function incrementDecrementCalculation ({type},product) {
        if(type === 'dec') {
            if(product.cartQty > 0) {
                product.qty += 1;
                product.cartQty -= 1; 
                if(product.cartQty === 0) {
                    manipulateAddToCartBtn({
                        hideBtnClass: `.btn-cart-${product.id}`,
                        showBtnClass: `.button-${product.id}`,
                        removeClass: 'display-flex',
                        addClass: 'display-block'
                    });
                }
            }
        } else {
            if(product.qty === 0) return;
            else {
                product.qty -= 1;
                product.cartQty += 1; 
            }
        }
        updateQty(product);
        setLocalStorageCartListCounter(product);
    }

    function updateQty({id, cartQty, qty}) {
        const cartQtyDom = utiliy.domQuery.getAllDomByQuery(`.cart-qty-${id}`);
        const listQtyDom = utiliy.domQuery.getDomByQuery(`.update-qty-${id}`);
        utiliy.domQuery.setDomInnerHTML(cartQtyDom, cartQty);
        utiliy.domQuery.setDomInnerHTML(listQtyDom, qty);
    }

    function updateCartList () {
        let cartListDom = '', total = 0;
        cartProduct.forEach(pro => {
            cartListDom += DOMCreation.createCartDom(pro);
            total += (pro.price * pro.cartQty);
        });
        utiliy.domQuery.setDomInnerHTML(cartListContainerDom, cartListDom);
        utiliy.domQuery.setDomInnerHTML(totalPriceDom, total);
        incrementDecrement(`.btn-cart-action .btn-cart-inc-dec`);
        deleteCartItem();
    }

    function deleteCartItem() {
        const deleteDom = utiliy.domQuery.getAllDomByQuery('.delete');
        utiliy.event.addClickEvent(deleteDom, 'click', (e) => {
            const {id} = e.target.dataset;
            let product;
            cartProduct = cartProduct.filter( pro => pro.id !== parseInt(id));
            products = products.map ( pro => {
                if(pro.id === parseInt(id)) {
                  let { cartQty, qty } = pro;
                  qty = qty + cartQty;
                  cartQty = 0;
                  product = pro = {...pro, cartQty, qty};
                }
                return pro;
            });
            updateQty(product);
            manipulateAddToCartBtn({
                hideBtnClass: `.btn-cart-${product.id}`,
                showBtnClass: `.button-${product.id}`,
                removeClass: 'display-flex',
                addClass: 'display-block'
            });
            updateCounterDomWithStorage();  
            updateCartList();
        });
    }


}