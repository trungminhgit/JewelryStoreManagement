/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.dtm.jewelrystore.dto.request.UserRequestDTO;
import com.dtm.jewelrystore.dto.response.PageResponse;
import com.dtm.jewelrystore.dto.response.UserDetailResponse;
import com.dtm.jewelrystore.exception.ResourceNotFoundException;
import com.dtm.jewelrystore.model.Role;
import com.dtm.jewelrystore.model.User;
import com.dtm.jewelrystore.repository.RoleRepository;
import com.dtm.jewelrystore.repository.UserRepository;
import com.dtm.jewelrystore.repository.specification.UserSpecification;
import com.dtm.jewelrystore.service.UserService;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
@Service
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final Cloudinary cloudinary;
    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User getByUsername(String userName) {
        return userRepository.findByUsername(userName).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public User getByUserID(long userID) {
        return userRepository.findByUserID(userID).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    public long saveUser(UserRequestDTO request) {
        Optional<User> oUser = userRepository.findByUsername(request.getUsername());
        if (oUser.isPresent()) {
            return -1;
        }
        Role role = roleRepository.findById((long) 2).orElseThrow(() -> new ResourceNotFoundException("Role not found"));
        User user = User.builder()
                .username(request.getUsername())
                .password(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .role(role)
                .build();

        userRepository.save(user);
        log.info("Save user successfully, userID = {}", user.getUserID());
        return user.getUserID();
    }

    @Override
    public void updateUser(long userID, UserRequestDTO request) {
        User user = getUserById(userID);
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhone(request.getPhone());
        user.setEmail(request.getEmail());
        userRepository.save(user);

        log.info("User has updated successfully, userId={}", userID);
    }

    @Override
    public void deleteUser(long userID) {
        userRepository.delete(getUserById(userID));
    }

    @Override
    public UserDetailResponse getDetailUser(long userID) {
        User user = getUserById(userID);
        return UserDetailResponse.builder()
                .userID(userID)
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .avatar(user.getAvatar())
                .build();

    }

    @Override
    public PageResponse<?> getAllUsers(int pageNo, int pageSize) {
        Page<User> page = userRepository.findAll(PageRequest.of(pageNo, pageSize));

        return convertToPageResponse(page, PageRequest.of(pageNo, pageSize));
    }

    @Override
    public void updateAvatar(long userID, MultipartFile avatar) {
        User user = getUserById(userID);
        if (!avatar.isEmpty()) {
            try {
                Map res = this.cloudinary.uploader().upload(avatar.getBytes(),
                        ObjectUtils.asMap("resource_type", "auto"));
                user.setAvatar(res.get("secure_url").toString());
            } catch (IOException ex) {
                log.error("Error about avtar, error = {}", ex.getCause());
            }
        }
        userRepository.save(user);
    }

    private User getUserById(long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    @Override
    public PageResponse<?> searchUsers(String firstName, int pageNo, int pageSize) {
        Specification<User> spec = Specification.where(null);
        Pageable pageable = PageRequest.of(pageNo, pageSize);
        if (!StringUtils.isEmpty(firstName)) {
            spec = spec.and(UserSpecification.hasFirstName(firstName));
            Page<User> userPage = userRepository.findAll(spec, pageable);
            return convertToPageResponse(userPage, pageable);
        }

        return convertToPageResponse(userRepository.findAll(pageable), pageable);
    }

    private PageResponse<?> convertToPageResponse(Page<User> users, Pageable pageable) {
        List<UserDetailResponse> response = users.stream().map(user -> UserDetailResponse.builder()
                .userID(user.getUserID())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhone())
                .email(user.getEmail())
                .avatar(user.getAvatar())
                .build()).toList();
        return PageResponse.builder()
                .pageNo(pageable.getPageNumber())
                .pageSize(pageable.getPageSize())
                .totalPage(users.getTotalPages())
                .items(response)
                .build();
    }
}
