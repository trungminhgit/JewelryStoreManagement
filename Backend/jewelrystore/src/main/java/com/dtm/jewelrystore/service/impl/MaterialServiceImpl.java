/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.dtm.jewelrystore.model.Material;
import com.dtm.jewelrystore.repository.MaterialRepository;
import com.dtm.jewelrystore.service.MaterialService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 *
 * @author ACER
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class MaterialServiceImpl implements MaterialService {

    private final MaterialRepository materialRepo;

    @Override
    public List<Material> getAllMaterials() {
        return materialRepo.findAll(Sort.by("materialID"));
    }

}
