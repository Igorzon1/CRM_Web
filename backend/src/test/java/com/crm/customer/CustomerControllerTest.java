package com.crm.customer;

import com.crm.IntegrationTestBase;
import com.crm.core.auth.dto.LoginRequest;
import com.crm.core.auth.dto.RegisterRequest;
import com.crm.customer.domain.CustomerType;
import com.crm.customer.dto.CustomerRequest;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
public class CustomerControllerTest extends IntegrationTestBase {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private String validToken = "";

    @BeforeEach
    void setupAuth() throws Exception {
        // Register a test user if not exists
        try {
            String registerJson = objectMapper.writeValueAsString(new RegisterRequest("Cust User", "cust@crm.com", "pass123"));
            mockMvc.perform(post("/api/auth/register")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(registerJson));
        } catch (Exception ignored) {}

        // Login to get token
        String loginJson = objectMapper.writeValueAsString(new LoginRequest("cust@crm.com", "pass123"));
        String response = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andReturn().getResponse().getContentAsString();
        
        // Extract token roughly (assumes {"token":"xyz..."})
        validToken = response.substring(response.indexOf(":") + 2, response.lastIndexOf("\""));
    }

    @Test
    void shouldDenyAccessWithoutToken() throws Exception {
        mockMvc.perform(get("/api/customers"))
                .andExpect(status().isForbidden());
    }

    @Test
    void shouldCreateCustomerWithToken() throws Exception {
        CustomerRequest request = new CustomerRequest(
                "Acme Corp", "contact@acme.com", "1199999999", "12345678901234", CustomerType.PJ
        );

        mockMvc.perform(post("/api/customers")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Acme Corp"));
    }

    @Test
    void shouldListCustomersWithToken() throws Exception {
        mockMvc.perform(get("/api/customers")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray());
    }
}
