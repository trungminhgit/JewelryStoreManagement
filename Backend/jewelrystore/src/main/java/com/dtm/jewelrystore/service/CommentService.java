/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.service;

import com.dtm.jewelrystore.dto.request.CommentRequestDTO;
import com.dtm.jewelrystore.dto.response.CommentResponse;
import java.util.List;

/**
 *
 * @author ACER
 */
public interface CommentService {

    List<CommentResponse> getListComments(long productID);

    Long addComment(long productID, CommentRequestDTO request);
}
