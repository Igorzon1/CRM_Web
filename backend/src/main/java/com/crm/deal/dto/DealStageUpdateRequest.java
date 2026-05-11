package com.crm.deal.dto;

import com.crm.deal.domain.DealStage;
import jakarta.validation.constraints.NotNull;

public record DealStageUpdateRequest(
        @NotNull(message = "Stage is required")
        DealStage stage
) {}
