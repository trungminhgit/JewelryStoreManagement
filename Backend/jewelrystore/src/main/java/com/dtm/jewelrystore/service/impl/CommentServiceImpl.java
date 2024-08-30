/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.dtm.jewelrystore.dto.request.CommentRequestDTO;
import com.dtm.jewelrystore.dto.response.CommentResponse;
import com.dtm.jewelrystore.exception.ResourceNotFoundException;
import com.dtm.jewelrystore.model.Comment;
import com.dtm.jewelrystore.model.Product;
import com.dtm.jewelrystore.repository.CommentRepository;
import com.dtm.jewelrystore.repository.ProductRepository;
import com.dtm.jewelrystore.service.CommentService;
import com.dtm.jewelrystore.service.UserService;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 *
 * @author ACER
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CommentServiceImpl implements CommentService {

    private final ProductRepository productRepo;
    private final UserService userService;
    private final CommentRepository commentRepo;

    @Override
    public List<CommentResponse> getListComments(long productID) {
        Product product = getProductByID(productID);
        return product.getListComments().stream()
                .sorted((c1, c2) -> c2.getCreateDate().compareTo(c1.getCreateDate()))
                .map(comment -> CommentResponse.builder()
                .commentID(comment.getCommentID())
                .description(comment.getDescription())
                .createDate(comment.getCreateDate())
                .userID(comment.getUser().getUserID())
                .productID(productID)
                .build())
                .collect(Collectors.toList());
    }

    @Override
    public Long addComment(long productID, CommentRequestDTO request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Comment comment = Comment.builder()
                .description(request.getDescription())
                .product(getProductByID(productID))
                .user(userService.getByUsername(authentication.getName()))
                .build();
        commentRepo.save(comment);
        return comment.getCommentID();
    }

    private Product getProductByID(long productID) {
        return productRepo.findById(productID)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

}
