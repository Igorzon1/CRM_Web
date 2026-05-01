package com.crm.customer.dto;

import com.crm.customer.domain.Customer;
import com.crm.customer.domain.CustomerType;
import java.util.UUID;

public record CustomerResponse(
        UUID id,
        String name,
        String email,
        String phone,
        String document,
        CustomerType type
) {
    public static CustomerResponse fromEntity(Customer customer) {
        return new CustomerResponse(
                customer.getId(),
                customer.getName(),
                customer.getEmail(),
                customer.getPhone(),
                customer.getDocument(),
                customer.getType()
        );
    }
}
