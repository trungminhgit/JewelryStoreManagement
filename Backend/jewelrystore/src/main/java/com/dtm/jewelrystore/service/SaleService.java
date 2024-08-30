/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.service;

import com.dtm.jewelrystore.dto.request.CartRequestDTO;
import java.util.Map;

/**
 *
 * @author ACER
 */
public interface SaleService {
    boolean addReceipt(Map<String, CartRequestDTO> cartItems);
}
