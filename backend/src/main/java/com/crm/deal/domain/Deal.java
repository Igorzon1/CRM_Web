package com.crm.deal.domain;

import com.crm.core.user.User;
import com.crm.customer.domain.Customer;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "tb_deal")
public class Deal {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private BigDecimal amount;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private DealStage stage;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    public Deal() {}

    public Deal(String name, BigDecimal amount, DealStage stage, Customer customer, User user) {
        this.name = name;
        this.amount = amount;
        this.stage = stage;
        this.customer = customer;
        this.user = user;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public void updateStage(DealStage newStage) {
        this.stage = newStage;
    }

    // Getters
    public UUID getId() { return id; }
    public String getName() { return name; }
    public BigDecimal getAmount() { return amount; }
    public DealStage getStage() { return stage; }
    public Customer getCustomer() { return customer; }
    public User getUser() { return user; }
    public LocalDateTime getCreatedAt() { return createdAt; }
}
