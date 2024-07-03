package com.example.restfulapistudent.controller;

import com.example.restfulapistudent.entity.User;
import com.example.restfulapistudent.exception.CustomServiceException;
import com.example.restfulapistudent.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173")
@Controller
public class UserController {
    @Autowired private UserService userService;

    @GetMapping("/users")
    public ResponseEntity<List<User>> showUserList(){

        try{
            List<User> users= userService.listAll();
            if(users==null || users.isEmpty()){
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(users);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/users/addnewuser")
    public ResponseEntity<String> addNewUser(User user, BindingResult bindingResult){
        try{
            userService.addUser(user);
            //201
            return ResponseEntity.ok("User added successfully");
        }catch (CustomServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @GetMapping("/users/edit/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Integer id){
        Optional<User> user = userService.findById(id);
        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }
        throw new CustomServiceException("User not found");
    }

    @PutMapping("/users/edit/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody User userDetail) {
        try {
            User updatedUser = userService.updateUser(id, userDetail);
            return ResponseEntity.ok(updatedUser);
        } catch (CustomServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An unexpected error occurred");
        }
    }

    @GetMapping("/users/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id){
        try {
            userService.deleteById(id);
            return ResponseEntity.ok("User deleted successfully");
        } catch (CustomServiceException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/users/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam Map<String, String> params) {
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
        return ResponseEntity.ok(users);
    }

    @GetMapping("/users/happybirthday")
    public ResponseEntity<List<User>> getBirthdayWishes(){
        List<User> users = userService.findUsersByBirthdayToday();
        return ResponseEntity.ok(users);
    }
}