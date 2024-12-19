package org.example.backend.controllers;

import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.cart.Cart;
import org.example.backend.services.CartService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{cartId}")
    public ResponseEntity<AIMSResponse<Object>> getCart(@PathVariable String cartId) {
        Cart cart =cartService.getCart(cartId);
        return ResponseUtil.success200Response("Get cart successfully", cart);
    }

    @GetMapping("/new")
    public ResponseEntity<AIMSResponse<Object>> createCart() {
        Cart cart = cartService.createCart();
        return ResponseUtil.success200Response("Get cart successfully", cart);
    }

    @PostMapping("/{cartId}/add")
    public ResponseEntity<AIMSResponse<Object>> addCartProduct(@PathVariable String cartId, @RequestParam String productId, @RequestParam int quantity) {
        Cart cart = cartService.addCartProduct(cartId, productId, quantity);
        return ResponseUtil.success200Response("Get cart successfully", cart);
    }

    @DeleteMapping("/{cartId}/remove")
    public ResponseEntity<AIMSResponse<Object>> removeCartProduct(@PathVariable String cartId, @RequestParam String productId) {
        Cart cart =  cartService.removeCartProduct(cartId, productId);
        return ResponseUtil.success200Response("Get cart successfully", cart);
    }

    @PostMapping("/{cartId}/clear")
    public ResponseEntity<AIMSResponse<Object>> clearCart(@PathVariable String cartId) {
        Cart cart = cartService.clearCart(cartId);
        return ResponseUtil.success200Response("Get cart successfully", cart);
    }

}
