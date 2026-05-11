package com.crm.deal.controller;

import com.crm.core.user.User;
import com.crm.deal.dto.DealRequest;
import com.crm.deal.dto.DealResponse;
import com.crm.deal.dto.DealStageUpdateRequest;
import com.crm.deal.service.DealService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    private DealService service;

    @PostMapping
    public ResponseEntity<DealResponse> createDeal(
            @RequestBody @Valid DealRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.createDeal(request, user));
    }

    @GetMapping
    public ResponseEntity<List<DealResponse>> getAllDeals(
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.getAllDeals(user));
    }

    @PatchMapping("/{id}/stage")
    public ResponseEntity<DealResponse> updateDealStage(
            @PathVariable UUID id,
            @RequestBody @Valid DealStageUpdateRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.updateDealStage(id, request, user));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user) {
        service.deleteDeal(id, user);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<com.crm.deal.dto.NoteResponse> addNote(
            @PathVariable UUID id,
            @RequestBody @Valid com.crm.deal.dto.NoteRequest request,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.addNoteToDeal(id, request, user));
    }

    @GetMapping("/{id}/notes")
    public ResponseEntity<List<com.crm.deal.dto.NoteResponse>> getNotes(
            @PathVariable UUID id,
            @AuthenticationPrincipal User user) {
        return ResponseEntity.ok(service.getDealNotes(id, user));
    }
}
