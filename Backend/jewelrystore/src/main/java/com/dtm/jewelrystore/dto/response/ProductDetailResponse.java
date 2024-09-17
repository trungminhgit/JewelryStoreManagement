/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.response;

import java.io.Serializable;
import lombok.Builder;
import lombok.Getter;

/**
 *
 * @author ACER
 */
@Getter
@Builder
public class ProductDetailResponse implements Serializable {

    private Long productID;
    private String productName;
    private Long price;
    private String description;
    private String productImage;
    private String categoryName;
    private String materialName;

}
