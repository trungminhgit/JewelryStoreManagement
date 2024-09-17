/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.dto.response;

import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import java.io.Serializable;
import java.util.Date;
import lombok.Builder;
import lombok.Getter;

/**
 *
 * @author ACER
 */
@Getter
@Builder
public class CommentResponse implements Serializable {

    private Long commentID;
    private String description;
    @Temporal(TemporalType.TIMESTAMP)
    private Date createDate;
    private Long userID;
    private Long productID;
}
