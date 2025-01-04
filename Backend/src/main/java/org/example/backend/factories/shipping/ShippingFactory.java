package org.example.backend.factories.shipping;

public class ShippingFactory {

    // Interface chung cho các chiến lược tính khối lượng
    public interface WeightCalculator {
        double calculateWeight(double weight, double length, double width, double height);
    }

    // Tính khối lượng thực tế
    public static class ActualWeightCalculator implements WeightCalculator {
        @Override
        public double calculateWeight(double weight, double length, double width, double height) {
            return weight;
        }
    }

    // Tính khối lượng quy đổi
    public static class VolumetricWeightCalculator implements WeightCalculator {
        @Override
        public double calculateWeight(double weight, double length, double width, double height) {
            return (length * width * height) / 6000;
        }
    }

    // Factory Method để chọn chiến lược tính khối lượng
    public static class WeightCalculatorFactory {
        public WeightCalculator getCalculator(double weight, double length, double width, double height) {
            double volumetricWeight = (length * width * height) / 6000;
            if (weight >= volumetricWeight) {
                return new ActualWeightCalculator(); // Sử dụng khối lượng thực tế
            } else {
                return new VolumetricWeightCalculator(); // Sử dụng khối lượng quy đổi
            }
        }
    }
}

