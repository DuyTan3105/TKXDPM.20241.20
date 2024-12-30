package org.example.backend.constants;

public class Constants {
    public final static String ROLE_ADMIN = "admin";
    public final static String ROLE_PRODUCT_MANAGER = "product_manager";

    public final static int SUCCESS_CODE = 1;
    public final static int ERROR_CODE = 0;

    public final static String ORDER_STATUS_PENDING = "pending";
    public final static String ORDER_STATUS_REJECTED = "rejected";
    public final static String ORDER_STATUS_PROCESSING = "processing";
    public final static String ORDER_STATUS_CANCELLED = "cancelled";
    public final static String ORDER_STATUS_DELIVERED = "delivered";


    public final static int PERCENT_VAT = 10;
    public final static int FREE_SHIPPING_THRESHOLD = 100_000;
    public final static int MAX_FREE_SHIPPING = 25_000;
    public final static int INNER_CITY_BASE_FEE = 22_000;
    public final static int OUTER_CITY_BASE_FEE = 30_000;
    public final static int ADDITIONAL_FEE = 2_500;
    public final static int RUSH_ORDER_FEE = 10_000;

    // Northern Vietnam
    public static final String[] NORTHERN_VIETNAM = {
            "HaNoi", "HaGiang", "CaoBang", "BacKan", "TuyenQuang", "LaoCai",
            "DienBien", "LaiChau", "SonLa", "YenBai", "HoaBinh", "ThaiNguyen",
            "LangSon", "QuangNinh", "BacGiang", "PhuTho", "VinhPhuc", "BacNinh",
            "HaiDuong", "HaiPhong", "HungYen", "ThaiBinh", "HaNam", "NamDinh",
            "NinhBinh"
    };

    // Central Vietnam
    public static final String[] CENTRAL_VIETNAM = {
            "ThanhHoa", "NgheAn", "HaTinh", "QuangBinh", "QuangTri", "ThuaThien-Hue",
            "DaNang", "QuangNam", "QuangNgai", "BinhDinh", "PhuYen", "KhanhHoa",
            "NinhThuan", "BinhThuan", "KonTum", "GiaLai", "DakLak", "DakNong", "LamDong"
    };

    // Southern Vietnam
    public static final String[] SOUTHERN_VIETNAM = {
            "BinhPhuoc", "TayNinh", "BinhDuong", "DongNai", "BaRiaVungTau", "HoChiMinhCity",
            "LongAn", "TienGiang", "BenTre", "TraVinh", "VinhLong", "DongThap",
            "AnGiang", "KienGiang", "CanTho", "HauGiang", "SocTrang", "BacLieu",
            "CaMau"
    };
}
