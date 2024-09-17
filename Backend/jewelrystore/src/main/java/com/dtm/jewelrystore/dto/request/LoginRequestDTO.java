/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.request;

import jakarta.validation.constraints.NotBlank;
import java.io.Serializable;
import lombok.Getter;

/**
 *
 * @author ACER
 */
@Getter
public class LoginRequestDTO implements Serializable{
    
    @NotBlank(message = "username must be not blank")
    private String username;
    
    @NotBlank(message = "password must be not blank")
    private String password;
    
}
