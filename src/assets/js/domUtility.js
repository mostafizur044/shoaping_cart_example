export default class DOMCreation {
    static createCardDom(product) {
        return `
        <div class="card">
            <div class="product-image">
                <img src="${product.img}" alt="Denim Jeans">
                <div class="black-cover">
                    <button class="details-btn" data-id="${product.id}">Show Details</button>
                </div>
            </div>
            <div class="product-info">
                <h4 class="title">${product.title}</h4>
                <h4 class="price">$${product.price}</h4>
            </div>
            <h5 class="product-qty">Available Quantity: <span class="update-qty-${product.id}"> ${product.qty}</span></h5>  
            <p class="description">${product.des}</p>
            <div class="add-cart-action">
                <button class="add-cart-btn ${product.cartQty === 0? 'display-block' : 'display-none'} button-${product.id}" data-id="${product.id}">Add to Cart</button>
                <div class="btn-cart-action ${product.cartQty !== 0? 'display-flex' : 'display-none'} btn-cart-${product.id}">
                  <span class="btn-inc-dec" data-id="${product.id}" data-type="dec">-</span>
                  <span class="qty cart-qty-${product.id}">${product.cartQty}</span>
                  <span class="btn-inc-dec" data-id="${product.id}" data-type="inc">+</span>
                </div>
            </div>
        </div>
        `;
    }


    static createCartDom(product) {
        return `
        <div class="cart-item">
            <div class="image">
                <img src="${product.img}" alt="">
            </div>
            <div class="info">
                <h5>${product.title}</h5>
                <p class="product-price-${product.id}">$${product.price * product.cartQty}</p>
                <div class="btn-cart-action">
                  <span class="btn-cart-inc-dec" data-id="${product.id}" data-type="dec">-</span>
                  <span class="qty cart-qty-${product.id}">${product.cartQty}</span>
                  <span class="btn-cart-inc-dec" data-id="${product.id}" data-type="inc">+</span>
                </div>
            </div>
            <div class="delete" data-id="${product.id}">
                <span data-id="${product.id}">&#10006;</span>
            </div>
        </div>
        `;
    }

    static createDetailDom(product) {
        return `
        <div class="detail-container">
            <div class="d-image">
                <img class="d-img" src="${product.img}" alt="" />
            </div>
            <div class="details">
                <h3 class="title">${product.title}</h3>
                <h4>Price: $${product.price}</h4>
                <h4> Review: 
                    <span>&#9733;</span> <span>&#9733;</span>
                    <span>&#9733;</span> <span>&#9733;</span>
                </h4>
                <div class="description">${product.des}</div>
            </div>
        </div>
        `;
    }
}