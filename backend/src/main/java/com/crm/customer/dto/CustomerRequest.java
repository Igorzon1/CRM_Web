package com.crm.customer.dto;

import com.crm.customer.domain.CustomerType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CustomerRequest(
        @NotBlank(message = "Name is required")
        String name,

        @NotBlank(message = "Email is required")
        @Email(message = "Invalid email format")
        String email,

        String phone,

        @NotBlank(message = "Document (CPF/CNPJ) is required")
        String document,

        @NotNull(message = "Customer type (PF/PJ) is required")
        CustomerType type
) {}
