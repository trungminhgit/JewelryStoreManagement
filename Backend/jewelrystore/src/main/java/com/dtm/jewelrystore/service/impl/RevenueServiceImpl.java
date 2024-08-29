/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.dtm.jewelrystore.repository.ReceiptDetailRepository;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import com.dtm.jewelrystore.service.RevenueService;
import lombok.RequiredArgsConstructor;

/**
 *
 * @author ACER
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class RevenueServiceImpl implements RevenueService {

    private final ReceiptDetailRepository receiptDetailRepo;

    @Override
    public Long getTotalRevenueByWeek(int year, int week) {
        return receiptDetailRepo.getTotalRevenueByWeek(year, week);
    }

    @Override
    public Long getTotalRevenueByMonth(int year, int month) {
        return receiptDetailRepo.getTotalRevenueByMonth(year, month);
    }

    @Override
    public Long getTotalRevenueByQuarter(int year, int quarter) {
        return receiptDetailRepo.getTotalRevenueByQuarter(year, quarter);
    }

    @Override
    public Long getTotalRevenueByYear(int year) {
        return receiptDetailRepo.getTotalRevenueByYear(year);
    }

}
