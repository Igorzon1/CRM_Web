package com.crm.customer.domain;

import com.crm.core.user.User;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String phone;

    @Column(nullable = false)
    private String document; // CPF ou CNPJ

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CustomerType type;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Customer() {
    }

    public Customer(String name, String email, String phone, String document, CustomerType type, User user) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.document = document;
        this.type = type;
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public void updateData(String name, String email, String phone, String document, CustomerType type) {
        if (name != null) this.name = name;
        if (email != null) this.email = email;
        if (phone != null) this.phone = phone;
        if (document != null) this.document = document;
        if (type != null) this.type = type;
    }

    // Getters
    public UUID getId() { return id; }
    public User getUser() { return user; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getPhone() { return phone; }
    public String getDocument() { return document; }
    public CustomerType getType() { return type; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
