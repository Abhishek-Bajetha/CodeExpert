package com.bajetha.codeexpert.repository;

import com.bajetha.codeexpert.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String email);
}
