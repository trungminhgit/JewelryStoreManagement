/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.service;

/**
 *
 * @author ACER
 */
public interface EmailService {
    public void sendEmailWithAttachment(String subject, String text, long userID, byte[] attachmentBytes, String attachmentFilename);
}
