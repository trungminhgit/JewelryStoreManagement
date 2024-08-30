/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.dtm.jewelrystore.controller;

import com.dtm.jewelrystore.dto.request.UserRequestDTO;
import com.dtm.jewelrystore.dto.response.PageResponse;
import com.dtm.jewelrystore.dto.response.ResponseData;
import com.dtm.jewelrystore.dto.response.ResponseError;
import com.dtm.jewelrystore.dto.response.UserDetailResponse;
import com.dtm.jewelrystore.service.UserService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author ACER
 */
@RestController
@RequestMapping("/api/user")
@Slf4j
@RequiredArgsConstructor
@Validated
public class UserController {

    private final UserService userService;

    @PostMapping(path = "/register", consumes = {
        MediaType.MULTIPART_FORM_DATA_VALUE,
        MediaType.APPLICATION_JSON_VALUE
    })
    public ResponseData<?> register(@RequestBody @Valid UserRequestDTO userRequest) {
        try {

            long result = userService.saveUser(userRequest);
            log.info("Result: {}",result);
            if (result != -1) {
                log.info("Request add user, {} {}", userRequest.getFirstName(), userRequest.getLastName());
                return new ResponseData<>(HttpStatus.CREATED.value(), "Add user successfully", result);
            } else {
                log.error("Username already exits, {}", userRequest.getUsername());
                return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Username already exits");
            }
        } catch (Exception e) {
            log.error("Add user failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Add user failed");
        }
    }

    @PutMapping("/{userID}/avatar")
    public ResponseData<?> updateAvatar(@PathVariable @Min(1) long userID, @RequestPart(required = true) MultipartFile avatar) {
        try {
            log.info("Request update avatar for userID = {}", userID);
            userService.updateAvatar(userID, avatar);
            return new ResponseData<>(HttpStatus.ACCEPTED.value(), "Update avatar successfully");
        } catch (Exception e) {
            log.error("Update avatar failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Update avatar failed");
        }
    }

    @PutMapping("/{userID}")
    public ResponseData<?> updateUser(@PathVariable @Min(1) long userID, @RequestBody @Valid UserRequestDTO userRequest) {
        try {
            log.info("Request update user, userID = {}", userID);
            userService.updateUser(userID, userRequest);
            return new ResponseData<>(HttpStatus.ACCEPTED.value(), "Updated user successfully");
        } catch (Exception e) {
            log.error("Updated user failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Updated user failed");
        }
    }

    @DeleteMapping("/{userID}")
    public ResponseData<?> deleteUser(@PathVariable @Min(1) long userID) {
        try {
            log.info("Request delete user, userID = {}", userID);
            userService.deleteUser(userID);
            return new ResponseData<>(HttpStatus.NO_CONTENT.value(), "Deleted user successfully");
        } catch (Exception e) {
            log.error("Delete user failed");
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Delete user failed");
        }
    }

    @GetMapping("/{userID}")
    public ResponseData<?> getDetailUser(@PathVariable @Min(1) long userID) {
        try {
            log.info("Request get detail user, userID = {}", userID);
            UserDetailResponse userDetail = userService.getDetailUser(userID);
            return new ResponseData<>(HttpStatus.OK.value(), "Get detail user successfully", userDetail);
        } catch (Exception e) {
            log.error("Get detail user failed, error message = {}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get detail user failed");
        }
    }

    @GetMapping("/list")
    public ResponseData<?> getAllUsers(@RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize) {
        try {
            log.info("Request get all users");
            PageResponse<?> users = userService.getAllUsers(pageNo, pageSize);
            return new ResponseData<>(HttpStatus.OK.value(), "Get list users successfully", users);
        } catch (Exception e) {
            log.error("Get list users failed, error message={}", e.getMessage(), e.getCause());
            return new ResponseError(HttpStatus.BAD_REQUEST.value(), "Get list users failed");
        }
    }
//----------------------------------------Cần sửa lại------------------------

    @GetMapping("/search")
    public ResponseData<?> getUserByParam(@RequestParam Map<String, String> params,
            @RequestParam(defaultValue = "0", required = false) int pageNo,
            @Min(10) @RequestParam(defaultValue = "20", required = false) int pageSize) {
        log.info("Request search user by params");
        return new ResponseData<>(HttpStatus.OK.value(), "Search user by params successfully", userService.searchUsers(params, pageNo, pageSize));
    }
}
