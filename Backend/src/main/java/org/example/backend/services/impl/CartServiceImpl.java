package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.entities.cart.Cart;
import org.example.backend.entities.cart.CartItem;
import org.example.backend.entities.product.Product;
import org.example.backend.exceptions.ProductNotAvailableException;
import org.example.backend.repositories.CartRepo;
import org.example.backend.repositories.ProductRepo;
import org.example.backend.services.CartService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {
    private final CartRepo cartRepository;
    private final ProductRepo productRepository;

    @Override
    public Cart createCart() {
        return cartRepository.save(new Cart());
    }

    @Override
    public Cart getCart(String cartId) {
        // Ensure the cart is properly initialized
        return cartRepository.findById(cartId).orElse(new Cart(cartId, new ArrayList<>(), 0));
    }

    @Override
    public Cart addCartProduct(String cartId, String productId, int quantity) {
        Cart cart = getCart(cartId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductNotAvailableException("Product not found"));

        if (cart.getListCartItem() == null) {
            cart.setListCartItem(new ArrayList<>());
        }

        // Vấn đề: Thao tác trực tiếp trên listCartItem làm tăng Stamp Coupling.
        // Giải pháp: Chuyển logic này vào phương thức của class Cart ( cart.addItem()).
        Optional<CartItem> existingItem = cart.getListCartItem().stream()
                .filter(item -> item.getProduct().getId().equals(product.getId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            cart.getListCartItem().add(new CartItem(product, quantity));
        }

        // Vấn đề: Logic tính tổng giá đang lặp lại ở nhiều nơi, làm giảm Cohesion.
        // Giải pháp: Di chuyển logic này vào class Cart (cart.updateTotalPrice())
        cart.setTotalPrice(cart.getListCartItem().stream()
                .mapToInt(item -> item.getProduct().getSellPrice() * item.getQuantity())
                .sum());
        return cartRepository.save(cart);
    }

    @Override
    public Cart removeCartProduct(String cartId, String productId) {
        Cart cart = getCart(cartId);
        // Vấn đề: Thao tác xóa sản phẩm trực tiếp từ listCartItem làm tăng Coupling.
        // Giải pháp: Tạo phương thức cart.removeItem(productId) trong class Cart.
        cart.getListCartItem().removeIf(item -> item.getProduct().getId().equals(productId));
        cart.setTotalPrice(cart.getListCartItem().stream()
                .mapToInt(item -> item.getProduct().getSellPrice() * item.getQuantity())
                .sum());
        return cartRepository.save(cart);
    }

    @Override
    public Cart clearCart(String cartId) {
        Cart cart = getCart(cartId);
        cart.getListCartItem().clear();
        cart.setTotalPrice(0);
        return cartRepository.save(cart);
    }

    @Override
    public List<CartItem> getAllCartItems(String cartId) {
        Cart cart = getCart(cartId);
        return cart.getListCartItem();
    }
}
