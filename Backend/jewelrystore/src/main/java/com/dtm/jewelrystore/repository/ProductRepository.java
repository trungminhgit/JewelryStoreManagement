/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.repository;

import com.dtm.jewelrystore.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ACER
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    Product findByProductName(String categoryName);

    Product findByProductID(Long productID);

}
