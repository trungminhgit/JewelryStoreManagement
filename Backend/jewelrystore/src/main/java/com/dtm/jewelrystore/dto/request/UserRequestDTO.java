/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
@Getter
public class UserRequestDTO implements Serializable {

    private String username;

    private String password;
    @NotNull(message = "first name must be not null")
    @NotEmpty(message = "first name must be not empty")
    @NotBlank(message = "first name must be not blank")
    private String firstName;
    @NotNull(message = "last name must be not null")
    @NotEmpty(message = "last name must be not empty")
    @NotBlank(message = "last name must be not blank")
    private String lastName;
    @Email(message = "email invalid format")
    @NotEmpty(message = "email must be not empty")
    @NotBlank(message = "email must be not blank")
    private String email;
    @Pattern(regexp = "^\\d{10}$", message = "phone invalid format")
    @NotEmpty(message = "phone must be not empty")
    @NotBlank(message = "phone must be not blank")
    @NotNull(message = "phone must be not null")
    private String phone;
    private String roleName;
}
