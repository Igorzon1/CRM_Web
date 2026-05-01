package com.crm.customer.domain;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String phone;

    @Column(nullable = false, unique = true)
    private String document; // CPF ou CNPJ

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CustomerType type;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Customer() {
    }

    public Customer(String name, String email, String phone, String document, CustomerType type) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.document = document;
        this.type = type;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // Getters
    public UUID getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getDocument() { return document; }
    public CustomerType getType() { return type; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
