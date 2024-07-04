package com.example.restfulapistudent.controller;

import com.example.restfulapistudent.entity.User;
import com.example.restfulapistudent.exception.CustomServiceException;
import com.example.restfulapistudent.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
public class UserController {

    @Autowired
    private UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @GetMapping("/users")
    public ResponseEntity<List<User>> showUserList() {
        logger.info("Request to list all users received");
        try {
            List<User> users = userService.listAll();
            if (users == null || users.isEmpty()) {
                logger.info("No users found");
                return ResponseEntity.noContent().build();
            }
            logger.info("Returning list of users: {}", users);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error retrieving users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/users/addnewuser")
    public ResponseEntity<String> addNewUser(@RequestBody User user) {
        logger.info("Request to add new user: {}", user);
        try {
            userService.addUser(user);
            logger.info("User added successfully: {}", user);
            return ResponseEntity.ok("User added successfully");
        } catch (CustomServiceException e) {
            logger.error("CustomServiceException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error while adding user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @GetMapping("/users/edit/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id) {
        logger.info("Request to get user by ID: {}", id);
        try {
            Optional<User> user = userService.findById(id);
            if (user.isPresent()) {
                logger.info("User found: {}", user.get());
                return ResponseEntity.ok(user.get());
            }
            logger.warn("User not found with ID: {}", id);
            throw new CustomServiceException("User not found");
        } catch (CustomServiceException e) {
            logger.error("CustomServiceException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @PutMapping("/users/edit/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User userDetail) {
        logger.info("Request to update user with ID: {} and details: {}", id, userDetail);
        try {
            User updatedUser = userService.updateUser(id, userDetail);
            logger.info("User updated successfully: {}", updatedUser);
            return ResponseEntity.ok(updatedUser);
        } catch (CustomServiceException e) {
            logger.error("CustomServiceException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error while updating user", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @GetMapping("/users/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        logger.info("Request to delete user with ID: {}", id);
        try {
            userService.deleteById(id);
            logger.info("User deleted successfully with ID: {}", id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (CustomServiceException e) {
            logger.error("CustomServiceException: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam Map<String, String> params) {
        logger.info("Request to search users with parameters: {}", params);
        try {
            // Xử lý các tham số từ params
            String fullName = params.get("fullName");
            String gender = params.get("gender");
            String homeTown = params.get("homeTown");
            String className = params.get("className");
            String major = params.get("major");
            Float minAverageMark = params.containsKey("minAverageMark") ? Float.parseFloat(params.get("minAverageMark")) : null;
            Float maxAverageMark = params.containsKey("maxAverageMark") ? Float.parseFloat(params.get("maxAverageMark")) : null;
            String fromDate = params.get("fromDate");
            String toDate = params.get("toDate");
            String query = params.get("query");

            // Gọi tới service để tìm kiếm
            List<User> users = userService.searchUsers(fullName, gender, homeTown, className, major,
                    minAverageMark, maxAverageMark, fromDate, toDate, query);
            logger.info("Search result: {}", users);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error searching users", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/users/happybirthday")
    public ResponseEntity<List<User>> getBirthdayWishes() {
        logger.info("Request to get users with birthdays today");
        try {
            List<User> users = userService.findUsersByBirthdayToday();
            logger.info("Users with birthdays today: {}", users);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            logger.error("Error fetching users with birthdays today", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
