/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.dtm.jewelrystore.dto.request.CartRequestDTO;
import com.dtm.jewelrystore.model.Receipt;
import com.dtm.jewelrystore.model.ReceiptDetail;
import com.dtm.jewelrystore.repository.ProductRepository;
import com.dtm.jewelrystore.repository.ReceiptDetailRepository;
import com.dtm.jewelrystore.repository.ReceiptRepository;
import com.dtm.jewelrystore.service.SaleService;
import com.dtm.jewelrystore.service.UserService;
import java.util.Date;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 *
 * @author ACER
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class SaleServiceImpl implements SaleService {

    private final UserService userService;
    private final ReceiptRepository receiptRepo;
    private final ReceiptDetailRepository receiptDetailRepo;
    private final ProductRepository productRepo;

    @Override
    public boolean addReceipt(Map<String, CartRequestDTO> cartItems) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        StringBuilder receiptDetails = new StringBuilder();
//        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        Receipt receipt = Receipt.builder()
                .createDate(new Date(System.currentTimeMillis()))
                .user(userService.getByUsername(authentication.getName()))
                .build();

        this.receiptRepo.save(receipt);

//        receiptDetails.append("RECEIPT DETAILS: \n\n");
//        receiptDetails.append(String.format("%-15s\t%-26s\t\t%-26s\t\t%-12s\n", "Room", "Start time", "Finish time", "Price"));
        for (CartRequestDTO c : cartItems.values()) {
            ReceiptDetail receiptDetail = new ReceiptDetail();
            receiptDetail.setQuantity(c.getQuantity());
            receiptDetail.setPrice(c.getPrice());
            receiptDetail.setReceipt(receipt);
            receiptDetail.setProduct(productRepo.findByProductID(c.getProductID()));
            this.receiptDetailRepo.save(receiptDetail);
            //Thêm chi tiết đơn hàng vào nội dung mail
//            double price = (double) receiptDetail.getPrice();
//            String startTime = receiptDetail.getStartTime().format(dateTimeFormatter);  
//            String finishTime = receiptDetail.getFinishTime().format(dateTimeFormatter); 
//            receiptDetails.append(String.format(
//                "%-15s\t%-25s\t%-25s\t%12.2f\n",
//                receiptDetail.getRoomID().getRoomName(),
//                startTime,
//                finishTime,
//                price
//            ));
        }
        //Gửi email sau khi lưu đơn hàng
//        User user = (User) this.userDetailServiceImpl.findByUserName(authentication.getName());
//        emailService.sendEmailToUser(
//                "Receipt Confirmation",
//                receiptDetails.toString(),
//                user.getUserID()
//        );
        return true;
    }

}
