package com.crm.customer.controller;

import com.crm.core.user.User;
import com.crm.customer.dto.CustomerRequest;
import com.crm.customer.dto.CustomerResponse;
import com.crm.customer.service.CustomerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    @PostMapping
    public ResponseEntity<CustomerResponse> createCustomer(
            @RequestBody @Valid CustomerRequest request,
            @AuthenticationPrincipal User user) {
        CustomerResponse response = service.createCustomer(request, user);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<CustomerResponse>> getCustomers(
            @RequestParam(required = false) String name,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.getAllCustomers(name, user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CustomerResponse> updateCustomer(
            @PathVariable java.util.UUID id,
            @RequestBody @Valid CustomerRequest request,
            @AuthenticationPrincipal User user) {
        CustomerResponse response = service.updateCustomer(id, request, user);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(
            @PathVariable java.util.UUID id,
            @AuthenticationPrincipal User user) {
        service.deleteCustomer(id, user);
        return ResponseEntity.noContent().build();
    }
}
