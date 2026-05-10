package com.crm.customer.service;

import com.crm.customer.domain.Customer;
import com.crm.customer.dto.CustomerRequest;
import com.crm.customer.dto.CustomerResponse;
import com.crm.customer.repository.CustomerRepository;
import com.crm.core.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    public CustomerResponse createCustomer(CustomerRequest request, User user) {
        if (repository.existsByEmailAndUser(request.email(), user)) {
            throw new IllegalArgumentException("Customer with this email already exists");
        }
        if (repository.existsByDocumentAndUser(request.document(), user)) {
            throw new IllegalArgumentException("Customer with this document already exists");
        }

        Customer customer = new Customer(
                request.name(),
                request.email(),
                request.phone(),
                request.document(),
                request.type(),
                user
        );

        customer = repository.save(customer);
        return CustomerResponse.fromEntity(customer);
    }

    public List<CustomerResponse> getAllCustomers(String nameFilter, User user) {
        List<Customer> customers;
        if (nameFilter != null && !nameFilter.isBlank()) {
            customers = repository.findByNameContainingIgnoreCaseAndUser(nameFilter, user);
        } else {
            customers = repository.findAllByUser(user);
        }
        return customers.stream().map(CustomerResponse::fromEntity).toList();
    }

    public CustomerResponse updateCustomer(UUID id, CustomerRequest request, User user) {
        Customer customer = repository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        if (repository.existsByEmailAndIdNotAndUser(request.email(), id, user)) {
            throw new IllegalArgumentException("Email already in use by another customer");
        }
        if (repository.existsByDocumentAndIdNotAndUser(request.document(), id, user)) {
            throw new IllegalArgumentException("Document already in use by another customer");
        }

        customer.updateData(
                request.name(),
                request.email(),
                request.phone(),
                request.document(),
                request.type()
        );

        customer = repository.save(customer);
        return CustomerResponse.fromEntity(customer);
    }

    public void deleteCustomer(UUID id, User user) {
        if (!repository.existsByIdAndUser(id, user)) {
            throw new IllegalArgumentException("Customer not found");
        }
        repository.deleteById(id);
    }
}
