/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.request;

import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
@Getter
public class ProductRequestDTO {

    private String productName;
    private Long price;
    private String description;
    private String categoryName;
    private String materialName;
    private MultipartFile file;

    public ProductRequestDTO(String productName, Long price, String description, String categoryName, String materialName, MultipartFile file) {
        this.productName = productName;
        this.price = price;
        this.description = description;
        this.categoryName = categoryName;
        this.materialName = materialName;
        this.file = file;
    }

}
