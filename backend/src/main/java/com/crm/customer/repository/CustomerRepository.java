package com.crm.customer.repository;

import com.crm.customer.domain.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface CustomerRepository extends JpaRepository<Customer, UUID> {
    List<Customer> findByNameContainingIgnoreCase(String name);
    boolean existsByEmailOrDocument(String email, String document);
}
