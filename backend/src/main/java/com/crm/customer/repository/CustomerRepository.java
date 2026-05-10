package com.crm.customer.repository;

import com.crm.core.user.User;
import com.crm.customer.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    List<Customer> findAllByUser(User user);
    List<Customer> findByNameContainingIgnoreCaseAndUser(String name, User user);
    Optional<Customer> findByIdAndUser(UUID id, User user);
    boolean existsByEmailAndUser(String email, User user);
    boolean existsByDocumentAndUser(String document, User user);
    boolean existsByEmailAndIdNotAndUser(String email, UUID id, User user);
    boolean existsByDocumentAndIdNotAndUser(String document, UUID id, User user);
    boolean existsByIdAndUser(UUID id, User user);
}
