/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.dtm.jewelrystore.service;

import com.dtm.jewelrystore.dto.request.UserRequestDTO;
import com.dtm.jewelrystore.dto.response.PageResponse;
import com.dtm.jewelrystore.dto.response.UserDetailResponse;
import com.dtm.jewelrystore.model.User;
import java.util.Map;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
public interface UserService {

    //UserDetailsService userDetailsService();
    //User getByUsername(String userName);
    long saveUser(UserRequestDTO request);

    void updateAvatar(long userID, MultipartFile avatar);

    void updateUser(long userID, UserRequestDTO request);

    void deleteUser(long userID);

    UserDetailResponse getDetailUser(long userID);

    PageResponse<?> getAllUsers(int pageNo, int pageSize);

    PageResponse<User> searchUsers(Map<String, String> params, int pageNo, int pageSize);

}
