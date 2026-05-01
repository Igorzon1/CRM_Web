package com.crm.customer.service;

import com.crm.customer.domain.Customer;
import com.crm.customer.dto.CustomerRequest;
import com.crm.customer.dto.CustomerResponse;
import com.crm.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository repository;

    public CustomerResponse createCustomer(CustomerRequest request) {
        if (repository.existsByEmailOrDocument(request.email(), request.document())) {
            throw new IllegalArgumentException("Customer with this email or document already exists");
        }

        Customer customer = new Customer(
                request.name(),
                request.email(),
                request.phone(),
                request.document(),
                request.type()
        );

        customer = repository.save(customer);
        return CustomerResponse.fromEntity(customer);
    }

    public List<CustomerResponse> getAllCustomers(String nameFilter) {
        List<Customer> customers;
        if (nameFilter != null && !nameFilter.isBlank()) {
            customers = repository.findByNameContainingIgnoreCase(nameFilter);
        } else {
            customers = repository.findAll();
        }
        return customers.stream().map(CustomerResponse::fromEntity).toList();
    }
}
