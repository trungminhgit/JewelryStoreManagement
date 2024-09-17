/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.repository.specification;

import com.dtm.jewelrystore.model.Category;
import com.dtm.jewelrystore.model.Material;
import com.dtm.jewelrystore.model.Product;
import jakarta.persistence.criteria.Join;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

/**
 *
 * @author ACER
 */
public class ProductSpecification {

    public static Specification<Product> hasPrice(String price) {
        return (root, query, cb) -> {
            if (price != null) {
                try {
                    Long priceValue = Long.valueOf(price); // Hoặc Double.parseDouble(price) nếu price là kiểu Double
                    return cb.equal(root.get("price"), priceValue);
                } catch (NumberFormatException e) {
                    // Nếu chuỗi không thể chuyển đổi thành số, có thể xử lý lỗi hoặc trả về null
                    return cb.conjunction();
                }

            }
            return null;
        };
    }

    public static Specification<Product> hasProductName(String productName) {
        return (root, query, cb) -> {
            if (!StringUtils.isEmpty(productName)) {
                return cb.like(cb.lower(root.get("productName")), "%" + productName.toLowerCase() + "%");
            }
            return null;
        };
    }

    public static Specification<Product> hasCategoryName(String categoryName) {
        return (root, query, cb) -> {
            if (StringUtils.isEmpty(categoryName)) {
                return null;
            }
            Join<Product, Category> categoryJoin = root.join("category");
            return cb.like(cb.lower(root.get("category").get("categoryName")), "%" + categoryName.toLowerCase() + "%");
        };
    }

    public static Specification<Product> hasMaterialName(String materialName) {
        return (root, query, cb) -> {
            if (StringUtils.isEmpty(materialName)) {
                return null;
            }
            Join<Product, Material> materialJoin = root.join("material");
            return cb.like(cb.lower(root.get("material").get("materialName")), "%" + materialName.toLowerCase() + "%");
        };
    }
}
