/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.response;

/**
 *
 * @author ACER
 */
public class ResponseError extends ResponseData {
    
    public ResponseError(int status, String message) {
        super(status, message);
    }
    
}
