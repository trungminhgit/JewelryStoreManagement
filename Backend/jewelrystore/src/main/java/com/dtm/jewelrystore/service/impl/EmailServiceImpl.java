/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.dtm.jewelrystore.model.User;
import com.dtm.jewelrystore.repository.UserRepository;
import com.dtm.jewelrystore.service.EmailService;
import com.dtm.jewelrystore.service.UserService;
import jakarta.mail.internet.MimeMessage;
import jakarta.mail.util.ByteArrayDataSource;
import java.io.ByteArrayInputStream;
import java.io.InputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

/**
 *
 * @author ACER
 */
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;
    private final UserService userService;

    @Override
    public void sendEmailWithAttachment(String subject, String text, long userID, byte[] attachmentBytes, String attachmentFilename) {
        User user = userService.getByUserID(userID);
        sendEmailWithAttachment(user.getEmail(), subject, text, attachmentBytes, attachmentFilename);
    }

    private void sendEmailWithAttachment(String to, String subject, String text, byte[] attachmentBytes, String attachmentFilename) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);

            messageHelper.setTo(to);
            messageHelper.setSubject(subject);
            messageHelper.setText(text);

            InputStream attachmentStream = new ByteArrayInputStream(attachmentBytes);
            messageHelper.addAttachment(attachmentFilename, new ByteArrayDataSource(attachmentStream, "application/pdf"));

            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            e.printStackTrace(); 
        }
    }
}
