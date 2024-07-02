package com.example.restfulapistudent.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.annotation.Rollback;

import java.time.LocalDate;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Rollback(false)

public class UserReponsitoryTests {
    @Autowired private UserRepository userRepository;
    @Test
    public void testAddNew(){
        User user = new User();
        user.setFullName("Lưu Đình Luyện");
        user.setAverageMark(8.7f);
        user.setBirthday(LocalDate.parse("2003-02-15"));

        user.setClassName("CNTT");
        user.setMajor("CNPM");
        user.setHomeTown("Ninh Bình");
        user.setGender("Nam");

        User savedUser = userRepository.save(user);

        Assertions.assertNotNull(savedUser);
        Assertions.assertTrue(savedUser.getId() > 0);
    }

    @Test
    public void testListAll(){
        Iterable<User> users = userRepository.findAll();
        Assertions.assertNotNull(users);
        for(User user : users){
            System.out.println(user);
        }
    }
}
