package com.crm.deal.dto;

import com.crm.deal.domain.Deal;
import com.crm.deal.domain.DealStage;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

public record DealResponse(
        UUID id,
        String name,
        BigDecimal amount,
        DealStage stage,
        LocalDateTime createdAt,
        UUID customerId,
        String customerName
) {
    public static DealResponse fromEntity(Deal deal) {
        return new DealResponse(
                deal.getId(),
                deal.getName(),
                deal.getAmount(),
                deal.getStage(),
                deal.getCreatedAt(),
                deal.getCustomer().getId(),
                deal.getCustomer().getName()
        );
    }
}
