package com.crm.core.auth.dto;

public record AuthResponse(String token, UserDTO user) {
    public record UserDTO(String name, String email) {}
}
