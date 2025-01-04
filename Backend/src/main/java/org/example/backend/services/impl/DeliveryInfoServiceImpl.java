package org.example.backend.services.impl;

import lombok.RequiredArgsConstructor;
import org.example.backend.constants.Constants;
import org.example.backend.dtos.responses.AIMSResponse;
import org.example.backend.dtos.responses.ResponseUtil;
import org.example.backend.entities.cart.Cart;
import org.example.backend.entities.cart.CartItem;
import org.example.backend.entities.delivery.DeliveryInfo;
import org.example.backend.entities.order.Order;
import org.example.backend.entities.order.OrderItem;
import org.example.backend.repositories.CartRepo;
import org.example.backend.repositories.DeliveryInfoRepo;
import org.example.backend.services.CartService;
import org.example.backend.services.DeliveryInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

import static org.example.backend.constants.Constants.*;

@Service
@RequiredArgsConstructor
public class DeliveryInfoServiceImpl implements DeliveryInfoService {
    private final DeliveryInfoRepo deliveryInfoRepo;
    private final CartService cartService;
    @Override
    public ResponseEntity<AIMSResponse<Object>> createDeliveryInfo(DeliveryInfo deliveryInfo) {
        try {
            deliveryInfoRepo.save(deliveryInfo);
            return ResponseUtil.success201Response("Delivery info created successfully");
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error creating delivery info");
        }
    }

    @Override
    public ResponseEntity<AIMSResponse<Object>> getDeliveryInfo(String id) {
        try {
            DeliveryInfo deliveryInfo = deliveryInfoRepo.findById(id).orElse(null);
            if (deliveryInfo == null) {
                return ResponseUtil.error404Response("Delivery info not found");
            }
            return ResponseUtil.success200Response("Delivery info retrieved successfully", deliveryInfo);
        } catch (Exception e) {
            return ResponseUtil.error500Response("Error retrieving delivery info");
        }
    }

    private boolean isInnerProvince(String province) {
        return province.equals("HaNoi") || province.equals("HoChiMinhCity");
    }

    // Vấn đề: vi phạm tính O trong SOLID và control coupling
    // Giải pháp: Áp dụng Factory Method (Xem trong ShippingFactory)
    // Giải pháp đã được triển khai
    @Override
    public ResponseEntity<AIMSResponse<Object>> calculateShippingFee(String cartId, String province, boolean isRushDelivery) {
//        int shippingFee = 0;
//        for (String provinceName : Constants.NORTHERN_VIETNAM) {
//            if (province.equalsIgnoreCase(provinceName)) {
//                shippingFee = Constants.SHIPPING_FEE_NORTHERN_VIETNAM;
//                break;
//            }
//        }
//        if (province.equalsIgnoreCase("HaNoi") && isRushDelivery) {
//            shippingFee = Constants.RUSH_SHIPPING_FEE;
//        }
//        for (String provinceName : Constants.CENTRAL_VIETNAM) {
//            if (province.equalsIgnoreCase(provinceName)) {
//                shippingFee = Constants.SHIPPING_FEE_CENTRAL_VIETNAM;
//                break;
//            }
//        }
//        for (String provinceName : Constants.SOUTHERN_VIETNAM) {
//            if (province.equalsIgnoreCase(provinceName)) {
//                shippingFee = Constants.SHIPPING_FEE_SOUTHERN_VIETNAM;
//                break;
//            }
//        }
//        return shippingFee;
        Cart cart = cartService.getCart(cartId);
        List<CartItem> listItems = cart.getListCartItem();
        double totalWeight = listItems.stream()
                .mapToInt(CartItem::getWeight)
                .sum();

        int baseFee;
        if (isInnerProvince(province)) {
            baseFee = INNER_CITY_BASE_FEE;
            if (totalWeight > 3) {
                baseFee += (int) (Math.ceil((totalWeight - 3) / 0.5) * ADDITIONAL_FEE);
            }
        } else {
            baseFee = OUTER_CITY_BASE_FEE;
            if (totalWeight > 0.5) {
                baseFee += (int) (Math.ceil((totalWeight - 0.5) / 0.5) * ADDITIONAL_FEE);
            }
        }

        if (isRushDelivery) {
            baseFee += RUSH_ORDER_FEE * listItems.size();
        }

        if (!isRushDelivery && cart.getTotalPrice() > FREE_SHIPPING_THRESHOLD) {
            baseFee -= Math.min(baseFee, MAX_FREE_SHIPPING);
        }

        baseFee =  Math.max(baseFee, 0);
        return ResponseUtil.success200Response("Shipping fee calculated successfully", baseFee);
    }
}
