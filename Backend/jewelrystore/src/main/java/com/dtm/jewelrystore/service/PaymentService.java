/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.service;

import com.dtm.jewelrystore.dto.response.PaymentResponse;
import jakarta.servlet.http.HttpServletRequest;

/**
 *
 * @author ACER
 */
public interface PaymentService {

    public PaymentResponse createPaymentVNPAY(HttpServletRequest request);
}
