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
public class TokenResponse implements Serializable {

    private String token;
    private String message;
}
