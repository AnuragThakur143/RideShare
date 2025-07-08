package com.ridershare.backend.repository;
import com.ridershare.backend.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    
    Optional<User> findByEmail(String email);

    User save(org.springframework.security.core.userdetails.User user);

}
