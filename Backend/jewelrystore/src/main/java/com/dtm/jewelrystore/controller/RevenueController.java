/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.controller;

import com.dtm.jewelrystore.dto.response.ResponseData;
import com.dtm.jewelrystore.dto.response.ResponseError;
import com.dtm.jewelrystore.service.RevenueService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ACER
 */
@RestController
@RequestMapping("/api/revenue")
@RequiredArgsConstructor
@Slf4j
public class RevenueController {

    private final RevenueService revenueService;

    @GetMapping("/week")
    public ResponseData<?> getTotalRevenueWeek(@RequestParam(value = "year") int year,
            @RequestParam(value = "week") int week) {
        try {
            log.info("Request get total revenue by week, week = {}, year = {}", week, year);
            Long totalRevenue = revenueService.getTotalRevenueByWeek(year, week);
            return new ResponseData<>(HttpStatus.OK.value(), "Get total revenue by week successfully", totalRevenue);
        } catch (Exception e) {
            log.error("Get total revenue by week failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get total revenue by week failed");
        }

    }

    @GetMapping("/month")
    public ResponseData<?> getTotalRevenueMonth(@RequestParam(value = "year") int year,
            @RequestParam(value = "month") int month) {
        try {
            log.info("Request get total revenue by month, month = {}, year = {}", month, year);
            Long totalRevenue = revenueService.getTotalRevenueByMonth(year, month);
            return new ResponseData<>(HttpStatus.OK.value(), "Get total revenue by month successfully", totalRevenue);
        } catch (Exception e) {
            log.error("Get total revenue by month failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get total revenue by month failed");
        }

    }

    @GetMapping("/quarter")
    public ResponseData<?> getTotalRevenueQuarter(@RequestParam(value = "year") int year,
            @RequestParam(value = "quarter") int quarter) {
        try {
            log.info("Request get total revenue by quarter, quarter = {}, year = {}", quarter, year);
            Long totalRevenue = revenueService.getTotalRevenueByQuarter(year, quarter);
            return new ResponseData<>(HttpStatus.OK.value(), "Get total revenue by quarter successfully", totalRevenue);
        } catch (Exception e) {
            log.error("Get total revenue by quarter failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get total revenue by quarter failed");
        }

    }

    @GetMapping("/year")
    public ResponseData<?> getTotalRevenueQuarter(@RequestParam(value = "year") int year) {
        try {
            log.info("Request get total revenue by year, year = {}", year);
            Long totalRevenue = revenueService.getTotalRevenueByYear(year);
            return new ResponseData<>(HttpStatus.OK.value(), "Get total revenue by year successfully", totalRevenue);
        } catch (Exception e) {
            log.error("Get total revenue by year failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get total revenue by year failed");
        }

    }
}
