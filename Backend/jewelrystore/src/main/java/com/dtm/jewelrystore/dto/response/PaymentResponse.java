/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.response;

import lombok.Builder;
import lombok.Getter;

/**
 *
 * @author ACER
 */
@Getter
@Builder
public class PaymentResponse {

    private String code;
    private String message;
    private String paymentUrl;
}
