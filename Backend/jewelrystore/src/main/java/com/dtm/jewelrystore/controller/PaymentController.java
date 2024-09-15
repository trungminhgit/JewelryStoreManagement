/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.controller;

import com.dtm.jewelrystore.dto.request.CartRequestDTO;
import com.dtm.jewelrystore.dto.response.PaymentResponse;
import com.dtm.jewelrystore.dto.response.ResponseData;
import com.dtm.jewelrystore.dto.response.ResponseError;
import com.dtm.jewelrystore.service.PaymentService;
import com.dtm.jewelrystore.service.SaleService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ACER
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payment")
@Slf4j
public class PaymentController {

    private final PaymentService paymentService;
    private final SaleService saleService;

    @GetMapping("/vn-pay")
    public ResponseData<PaymentResponse> pay(HttpServletRequest request) {
        return new ResponseData<>(HttpStatus.OK.value(), "Pay successfully", paymentService.createPaymentVNPAY(request));
    }
    
    @GetMapping("vn-pay-callback")
    public ResponseData<?> payCallBack(HttpServletRequest request, HttpServletResponse response){
        String status = request.getParameter("vnp_ResponseCode");
        if(status.equals("00")){
            try{
                response.sendRedirect("http://localhost:5173/cart?status=success");
            }catch(IOException ex){
                Logger.getLogger(PaymentController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }else{
            try{
                response.sendRedirect("http://localhost:5173/cart?status=fail");
            }catch(IOException ex){
                Logger.getLogger(PaymentController.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return null;
    }
}
