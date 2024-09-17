/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.service;

import com.dtm.jewelrystore.dto.request.LoginRequestDTO;
import com.dtm.jewelrystore.dto.response.TokenResponse;

/**
 *
 * @author ACER
 */
public interface AuthenticationService {

    TokenResponse authentication(LoginRequestDTO request);

}
