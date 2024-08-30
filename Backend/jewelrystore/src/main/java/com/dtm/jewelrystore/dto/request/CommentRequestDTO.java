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
public class CommentRequestDTO implements Serializable {

    @NotBlank(message = "Description must be not blank")
    private String description;
}
