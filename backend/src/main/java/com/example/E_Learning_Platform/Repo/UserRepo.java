package com.example.E_Learning_Platform.Repo;

import com.example.E_Learning_Platform.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@EnableJpaRepositories
@Repository
public interface UserRepo extends JpaRepository<User,Integer>
{
    Optional<User> findOneByEmailAndPassword(String role, String email);

    User findByEmail(String email);
}