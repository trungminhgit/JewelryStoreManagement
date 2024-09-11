/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.dtm.jewelrystore.dto.request.CartRequestDTO;
import com.dtm.jewelrystore.model.Receipt;
import com.dtm.jewelrystore.model.ReceiptDetail;
import com.dtm.jewelrystore.model.User;
import com.dtm.jewelrystore.repository.ProductRepository;
import com.dtm.jewelrystore.repository.ReceiptDetailRepository;
import com.dtm.jewelrystore.repository.ReceiptRepository;
import com.dtm.jewelrystore.service.EmailService;
import com.dtm.jewelrystore.service.JwtService;
import com.dtm.jewelrystore.service.SaleService;
import com.dtm.jewelrystore.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Div;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.TextAlignment;

import jakarta.servlet.http.Cookie;
import java.io.ByteArrayOutputStream;
import java.net.URLDecoder;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
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
    private final JwtService jwtService;
    private final EmailService emailService;

    @Override
    public boolean addReceipt(Map<String, CartRequestDTO> cartItems) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        Receipt receipt = Receipt.builder()
                .createDate(new Date(System.currentTimeMillis()))
                .user(userService.getByUsername(authentication.getName()))
                .build();

        this.receiptRepo.save(receipt);

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        PdfWriter writer = new PdfWriter(byteArrayOutputStream);
        PdfDocument pdf = new PdfDocument(writer);
        Document document = new Document(pdf);

        Paragraph title = new Paragraph("RECEIPT CONFIRMATION")
                .setFontSize(20)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER);
        document.add(title);

        Paragraph storeInfo = new Paragraph("JEWELRY STORE\n325 Dinh Bo Linh - District 10 - HCM")
                .setTextAlignment(TextAlignment.CENTER);
        document.add(storeInfo);

        Paragraph dateParagraph = new Paragraph("Date: " + LocalDateTime.now().format(dateTimeFormatter))
                .setTextAlignment(TextAlignment.CENTER);
        document.add(dateParagraph);

        Table table = new Table(new float[]{3, 2, 2})
                .setWidth(pdf.getDefaultPageSize().getWidth() * 0.9f)
                .setTextAlignment(TextAlignment.CENTER);
        table.addHeaderCell("Product name");
        table.addHeaderCell("Quantity");
        table.addHeaderCell("Price");

        double totalPrice = 0.0;
        int totalQuantity = 0;
        for (CartRequestDTO c : cartItems.values()) {
            ReceiptDetail receiptDetail = new ReceiptDetail();
            receiptDetail.setQuantity(c.getQuantity());
            receiptDetail.setPrice(c.getPrice());
            receiptDetail.setReceipt(receipt);
            receiptDetail.setProduct(productRepo.findByProductID(c.getProductID()));
            this.receiptDetailRepo.save(receiptDetail);

            double price = receiptDetail.getPrice().doubleValue();
            totalPrice += price;
            totalQuantity += receiptDetail.getQuantity();
            table.addCell(receiptDetail.getProduct().getProductName());
            table.addCell(String.valueOf(receiptDetail.getQuantity()));
            table.addCell(String.format("%.2f", price));
        }
        table.addCell("Total");
        table.addCell(String.valueOf(totalQuantity));
        table.addCell(String.format("%.2f", totalPrice));

        document.add(table);
        document.close();

        try {
            User user = userService.getByUsername(authentication.getName());
            emailService.sendEmailWithAttachment(
                    "Receipt Confirmation",
                    "Please find attached the receipt for your purchase.",
                    (long) user.getUserID(),
                    byteArrayOutputStream.toByteArray(),
                    "receipt_detail.pdf"
            );
        } catch (Exception e) {
            e.printStackTrace(); // Handle email sending error
            return false;
        }
        return true;
    }
}
