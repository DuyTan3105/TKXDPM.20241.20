package org.example.backend.utils;

import java.io.IOException;
import java.util.HashMap;

public class Validates {
    public static void validateDeliveryInfo(HashMap<String, String> info) throws IOException {
        if (!isAlpha(info.get("customerName")) ||
                !isPhoneNumber(info.get("customerPhone")) ||
                !isAddress(info.get("customerAddress"))) {
            throw new IOException("Invalid delivery information");
        }
    }

    public static boolean isPhoneNumber(String phoneNumber) {
        return phoneNumber.length() == 10 && phoneNumber.startsWith("0") && phoneNumber.matches("\\d+");
    }

    public static boolean isAlpha(String name) {
        return name != null && name.matches("[\\sA-Za-z]+");
    }

    public static boolean isAddress(String address) {
        return address != null && address.matches("[\\sa-zA-Z0-9]+");
    }
}