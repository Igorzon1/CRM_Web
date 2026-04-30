package com.crm.core.auth;

import com.crm.IntegrationTestBase;
import com.crm.core.auth.dto.LoginRequest;
import com.crm.core.auth.dto.RegisterRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class AuthControllerTest extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void shouldRegisterAndLoginSuccessfully() throws Exception {
        // 1. Register User
        String registerJson = """
                {
                    "name": "Test User",
                    "email": "test@crm.com",
                    "password": "password123"
                }
                """;

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson))
                .andExpect(status().isOk());

        // 2. Login
        String loginJson = """
                {
                    "email": "test@crm.com",
                    "password": "password123"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists());
    }

    @Test
    void shouldReturnBadRequestAndRFC7807OnInvalidLoginFormat() throws Exception {
        String invalidLoginJson = """
                {
                    "email": "not-an-email",
                    "password": ""
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidLoginJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation Failed"))
                .andExpect(jsonPath("$.invalid_params").exists());
    }

    @Test
    void shouldReturnUnauthorizedOnWrongPassword() throws Exception {
        // Needs a user first
        String registerJson = """
                {
                    "name": "Test User 2",
                    "email": "test2@crm.com",
                    "password": "password123"
                }
                """;
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerJson));

        // Attempt login with wrong password
        String wrongLoginJson = """
                {
                    "email": "test2@crm.com",
                    "password": "wrongpassword"
                }
                """;

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(wrongLoginJson))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.title").value("Authentication Failed"));
    }
}
