/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.response;

import jakarta.persistence.Transient;
import java.io.Serializable;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
@Getter
@Builder
public class UserDetailResponse implements Serializable {

    private Long userID;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String avatar;
    @Transient
    private MultipartFile file;

}
