/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.repository.specification;

import com.dtm.jewelrystore.model.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.jpa.domain.Specification;

/**
 *
 * @author ACER
 */
public class UserSpecification {

    public static Specification<User> hasFirstName(String firstName) {
        return (root, query, cb) -> {
            if (!StringUtils.isEmpty(firstName)) {
                return cb.like(cb.lower(root.get("firstName")), "%" + firstName.toLowerCase() + "%");
            }
            return null;
        };
    }
}
