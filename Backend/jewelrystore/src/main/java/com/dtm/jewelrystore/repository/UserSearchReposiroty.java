/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.repository;

import com.dtm.jewelrystore.dto.response.PageResponse;
import com.dtm.jewelrystore.model.User;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

/**
 *
 * @author ACER
 */
@Component
@Slf4j
public class UserSearchReposiroty {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public PageResponse searchUser(Map<String, String> params, int pageNo, int pageSize) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<User> cq = cb.createQuery(User.class);
        Root<User> userRoot = cq.from(User.class);

        List<Predicate> predicates = new ArrayList<>();

        if (params != null) {
            String kw = params.get("kw");
            if (kw != null && !kw.isEmpty()) {
                Expression<String> fullName = cb.concat(cb.lower(userRoot.get("firstName")), " ");
                fullName = cb.concat(fullName, cb.lower(userRoot.get("lastName")));

                Predicate fullNameMatch = cb.like(fullName, "%" + kw.toLowerCase() + "%");

                predicates.add(fullNameMatch);
            }
        }

        if (!predicates.isEmpty()) {
            cq.where(predicates.toArray(new Predicate[0]));
        }

        cq.orderBy(cb.desc(userRoot.get("userID")));

        // Đảm bảo pageNo không âm
        if (pageNo < 1) {
            pageNo = 1;
        }

        Query query = entityManager.createQuery(cq);
        query.setMaxResults(pageSize);
        query.setFirstResult((pageNo - 1) * pageSize);

        List<User> users = query.getResultList();

        CriteriaQuery<Long> countQuery = cb.createQuery(Long.class);
        Root<User> countRoot = countQuery.from(User.class);
        countQuery.select(cb.count(countRoot));
        if (!predicates.isEmpty()) {
            countQuery.where(predicates.toArray(new Predicate[0]));
        }
        Long totalResults = entityManager.createQuery(countQuery).getSingleResult();

        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);
        Page<User> userPage = new PageImpl<>(users, pageable, totalResults);

        return PageResponse.builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPage(userPage.getTotalPages())
                .items(users)
                .build();
    }
}
