/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dtm.jewelrystore.dto.request.ProductRequestDTO;
import com.dtm.jewelrystore.dto.response.PageResponse;
import com.dtm.jewelrystore.dto.response.ProductDetailResponse;
import com.dtm.jewelrystore.exception.ResourceNotFoundException;
import com.dtm.jewelrystore.model.Category;
import com.dtm.jewelrystore.model.Material;
import com.dtm.jewelrystore.model.Product;
import com.dtm.jewelrystore.repository.CategoryRepository;
import com.dtm.jewelrystore.repository.MaterialRepository;
import com.dtm.jewelrystore.repository.ProductRepository;
import com.dtm.jewelrystore.repository.RoleRepository;
import com.dtm.jewelrystore.service.ProductService;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;
    private final MaterialRepository materialRepo;
    private final Cloudinary cloudinary;

    @Override
    public long addProduct(ProductRequestDTO requestProduct) {
        Product oProduct = productRepo.findByProductName(requestProduct.getProductName());
        if (oProduct != null) {
            return -1;
        }

        Category category = categoryRepo.findByCategoryName(requestProduct.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        Material material = materialRepo.findByMaterialName(requestProduct.getMaterialName())
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));

        Product product = Product.builder()
                .productName(requestProduct.getProductName())
                .price(requestProduct.getPrice().longValue())
                .description(requestProduct.getDescription())
                .category(category)
                .material(material)
                .build();
        if (!requestProduct.getFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(requestProduct.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                product.setProductImage(res.get("secure_url").toString());
            } catch (IOException ex) {
                log.error("Error about avtar, error = {}", ex.getCause());
            }
        }
        productRepo.save(product);
        log.info("Save product successfully, productID = {}", product.getProductID());
        return product.getProductID();
    }

    @Override
    public void updateProduct(long productID, ProductRequestDTO requestProduct) {
        Product product = getProductById(productID);
        Category category = categoryRepo.findByCategoryName(requestProduct.getCategoryName())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        Material material = materialRepo.findByMaterialName(requestProduct.getMaterialName())
                .orElseThrow(() -> new ResourceNotFoundException("Material not found"));
        product.setProductName(requestProduct.getProductName());
        product.setPrice(requestProduct.getPrice());
        product.setDescription(requestProduct.getDescription());
        product.setCategory(category);
        product.setMaterial(material);
        if (!requestProduct.getFile().isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(requestProduct.getFile().getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                product.setProductImage(res.get("secure_url").toString());
            } catch (IOException ex) {
                log.error("Error about avtar, error = {}", ex.getCause());
            }
        }
        productRepo.save(product);
    }

    @Override
    public void deleteProduct(long productID) {
        productRepo.deleteById(productID);
    }

    @Override
    public ProductDetailResponse getDetailProduct(long productID) {
        Product product = getProductById(productID);
        return ProductDetailResponse.builder()
                .productID(product.getProductID())
                .productName(product.getProductName())
                .price(product.getPrice())
                .description(product.getDescription())
                .categoryName(product.getCategory().getCategoryName())
                .materialName(product.getMaterial().getMaterialName())
                .productImage(product.getProductImage())
                .build();
    }

    @Override
    public PageResponse<?> getAllProducts(int pageNo, int pageSize) {
        Page<Product> page = productRepo.findAll(PageRequest.of(pageNo, pageSize));

        List<ProductDetailResponse> list = page.stream().map(product -> ProductDetailResponse.builder()
                .productID(product.getProductID())
                .productName(product.getProductName())
                .price(product.getPrice())
                .description(product.getDescription())
                .categoryName(product.getCategory().getCategoryName())
                .materialName(product.getMaterial().getMaterialName())
                .productImage(product.getProductImage())
                .build())
                .toList();
        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPage(page.getTotalPages())
                .items(list)
                .build();

    }

    private Product getProductById(long productID) {
        return productRepo.findById(productID).orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }

}
