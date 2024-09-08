///*
// * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
// * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
// */
//package com.dtm.jewelrystore.controller;
//
//import com.dtm.jewelrystore.dto.request.CartRequestDTO;
//import com.dtm.jewelrystore.dto.response.ResponseData;
//import com.dtm.jewelrystore.dto.response.ResponseError;
//import com.dtm.jewelrystore.service.SaleService;
//import jakarta.validation.Valid;
//import java.util.Map;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
///**
// *
// * @author ACER
// */
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/api/sale")
//@Validated
//@Slf4j
//public class SaleController {
//
//    private final SaleService saleService;
//
//    @PostMapping(path = "/add-receipt", produces = MediaType.APPLICATION_JSON_VALUE)
//    public ResponseData<?> addReceipt(@RequestBody @Valid Map<String, CartRequestDTO> cartItems) {
//        try {
//            log.info("Request add receipt");
//            if (saleService.addReceipt(cartItems)) {
//                return new ResponseData<>(HttpStatus.ACCEPTED.value(), "Add receipt successfully");
//            } else {
//                return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Add receipt failed");
//            }
//        } catch (Exception e) {
//            log.error("Add receipt failed, error message = {}", e.getMessage(), e.getCause());
//            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Add receipt failed");
//        }
//    }
//}
