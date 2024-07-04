package com.example.restfulapistudent.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@Component
@Entity
@Table(name ="users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String fullName;

    @Column(nullable = false)
    private LocalDate birthday;

    @Column(nullable = false, length = 30)
    private String className;

    @Column(nullable = false, length = 30)
    private String major;

    @Column(nullable = false, length = 50)
    private String homeTown;

    @Column(nullable = false, length = 10)
    private String gender;

    public User() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    @Column(nullable = false)
    private Float averageMark;



    @Override
    public String toString() {
        return "User{" +
                "Id:" + id +
                " Họ tên:" + fullName +
                " Ngày sinh:" + birthday +
                " Tên lớp:" + className +
                " Tên ngành:" + major +
                " Địa chỉ:" + homeTown +
                " Giới tính:" + gender +
                " Điểm:" + averageMark +
                "}";
    }
}
