/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.service;

import com.dtm.jewelrystore.dto.request.ProductRequestDTO;
import com.dtm.jewelrystore.dto.response.PageResponse;
import com.dtm.jewelrystore.dto.response.ProductDetailResponse;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
public interface ProductService {

    long addProduct(ProductRequestDTO requestProduct);

    void updateProduct(long productID, ProductRequestDTO requestProduct);

    void deleteProduct(long productID);

    ProductDetailResponse getDetailProduct(long productID);

    PageResponse<?> getAllProducts(int pageNo, int pageSize);
    
    //Search by params
}
