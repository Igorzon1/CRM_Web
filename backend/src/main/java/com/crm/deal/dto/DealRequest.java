package com.crm.deal.dto;

import com.crm.deal.domain.DealStage;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.UUID;

public record DealRequest(
        @NotBlank(message = "Name is required")
        String name,

        @NotNull(message = "Amount is required")
        BigDecimal amount,

        @NotNull(message = "Stage is required")
        DealStage stage,

        @NotNull(message = "Customer is required")
        UUID customerId
) {}
