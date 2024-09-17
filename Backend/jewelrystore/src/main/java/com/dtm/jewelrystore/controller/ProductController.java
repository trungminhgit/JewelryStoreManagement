/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.controller;

import com.dtm.jewelrystore.dto.request.CommentRequestDTO;
import com.dtm.jewelrystore.dto.request.ProductRequestDTO;
import com.dtm.jewelrystore.dto.response.CommentResponse;
import com.dtm.jewelrystore.dto.response.PageResponse;
import com.dtm.jewelrystore.dto.response.ProductDetailResponse;
import com.dtm.jewelrystore.dto.response.ResponseData;
import com.dtm.jewelrystore.dto.response.ResponseError;
import com.dtm.jewelrystore.model.Comment;
import com.dtm.jewelrystore.service.CommentService;
import com.dtm.jewelrystore.service.ProductService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.websocket.server.PathParam;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.annotations.PartitionKey;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
@RestController
@Slf4j
@Validated
@RequestMapping("/api/product")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;
    private final CommentService commentService;

    @PostMapping(path = "/add-product", consumes = {
        MediaType.MULTIPART_FORM_DATA_VALUE
    })
    public ResponseData<?> addProduct(@ModelAttribute @Valid ProductRequestDTO requestProductDTO) {

        try {
            long result = productService.addProduct(requestProductDTO);
            if (result != -1) {
                log.info("Request add product, productName = {}", requestProductDTO.getProductName());
                return new ResponseData<>(HttpStatus.CREATED.value(), "Add product successfully", result);
            } else {
                log.error("Product name already exits, productName = {}", requestProductDTO.getProductName());
                return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Product name already exits");
            }
        } catch (Exception e) {
            log.error("Add product failed, error massage = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Add product failed");
        }
    }

    @PutMapping("/{productID}")
    public ResponseData<?> updateProduct(@PathVariable @Min(1) long productID, @ModelAttribute @Valid ProductRequestDTO requestProductDTO) {
        try {
            log.info("Request update product, productID = {}", productID);
            productService.updateProduct(productID, requestProductDTO);
            return new ResponseData<>(HttpStatus.ACCEPTED.value(), "Update product successfully");
        } catch (Exception e) {
            log.error("Update product failed, error massage = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Update product failed");
        }
    }

    @DeleteMapping("/{productID}")
    public ResponseData<?> deleteProduct(@PathVariable @Min(1) long productID) {
        try {
            log.info("Request delete product, productID = {}", productID);
            productService.deleteProduct(productID);
            return new ResponseData<>(HttpStatus.NO_CONTENT.value(), "Delete product successfully");
        } catch (Exception e) {
            log.error("Delete product failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Delete product failed");
        }
    }

    @GetMapping("/{productID}")
    public ResponseData<?> getDetailProduct(@PathVariable @Min(1) long productID) {
        try {
            log.info("Request get detail product, productID = {}", productID);
            ProductDetailResponse productDetailResponse = productService.getDetailProduct(productID);
            return new ResponseData<>(HttpStatus.OK.value(), "Get detail product successfully", productDetailResponse);
        } catch (Exception e) {
            log.error("Get detail product failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get detail product failed");
        }
    }

    @GetMapping("/list-product")
    public ResponseData<?> getAllProducts(@RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize) {
        try {
            log.info("Request get all products");
            PageResponse<?> products = productService.getAllProducts(pageNo, pageSize);
            return new ResponseData<>(HttpStatus.OK.value(), "Get all products successfully", products);
        } catch (Exception e) {
            log.error("Get all products failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get all products failed");
        }
    }

    @GetMapping("/comments/{productID}")
    public ResponseData<?> getListComments(@PathVariable @Min(1) long productID) {
        try {
            log.info("Request get list comments, productID = {}", productID);
            List<CommentResponse> listComments = commentService.getListComments(productID);
            if (!listComments.isEmpty()) {
                return new ResponseData<>(HttpStatus.OK.value(), "Get list comments successfully", listComments);
            } else {
                log.info("There are no comment for this product, productID = {}", productID);
                return new ResponseData<>(HttpStatus.OK.value(), "There are no comment for this product");
            }
        } catch (Exception e) {
            log.error("Get list comments failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get list comments failed");
        }
    }

    @PostMapping("/add-comment/{productID}")
    public ResponseData<?> addComment(@RequestBody @Valid CommentRequestDTO request, @PathVariable @Min(1) long productID) {
        try {
            log.info("Request add comment for product, productID = {}", productID);
            long commentID = commentService.addComment(productID, request);
            return new ResponseData<>(HttpStatus.CREATED.value(), "Add comment successfully", commentID);
        } catch (Exception e) {
            log.error("Add comment failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Add comment failed");
        }
    }

    @GetMapping(path = "/search-product")
    public ResponseData<?> searchProductByParams(@RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize,
            @RequestParam(required = false) Map<String, String> params) {
        log.info("Price, {}",params.get("price"));
        return new ResponseData<>(HttpStatus.OK.value(), "Search product successfully", productService.searchProductByParams(params, pageNo, pageSize));
    }
}
