package org.example.backend.services;

import org.example.backend.entities.cart.Cart;
import org.example.backend.entities.cart.CartItem;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {
    Cart createCart();
    Cart getCart(String cartId);
    Cart addCartProduct(String cartId, String productId, int quantity);
    Cart removeCartProduct(String cartId, String productId);
    Cart clearCart(String cartId);
    List<CartItem> getAllCartItems(String cartId);
}
