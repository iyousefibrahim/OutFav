const sanitizeCart = (cart) => {
    const totalPrice = cart.products.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
    );

    return {
        cartId: cart._id,
        userId: cart.userId,
        numOfCartItems: cart.products.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice,
        products: cart.products.map((item) => ({
            productId: item.productId._id,
            title: item.productId.title,
            price: item.productId.price,
            sizes: item.productId.sizes,
            stockStatus: item.productId.stockStatus,
            categoryId: item.productId.category,
            productImage: item.productId.productImage,
            colors: item.productId.colors,
            availableQuantity: item.productId.availableQuantity,
            quantity: item.quantity
        })),
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt
    };
};

module.exports = sanitizeCart;