package com.crm.deal.dto;

import jakarta.validation.constraints.NotBlank;

public record NoteRequest(
        @NotBlank(message = "Content is required")
        String content
) {}
