package com.crm.deal.service;

import com.crm.core.user.User;
import com.crm.customer.domain.Customer;
import com.crm.customer.repository.CustomerRepository;
import com.crm.deal.domain.Deal;
import com.crm.deal.dto.DealRequest;
import com.crm.deal.dto.DealResponse;
import com.crm.deal.dto.DealStageUpdateRequest;
import com.crm.deal.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class DealService {

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private com.crm.deal.repository.NoteRepository noteRepository;

    public DealResponse createDeal(DealRequest request, User user) {
        Customer customer = customerRepository.findByIdAndUser(request.customerId(), user)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found or access denied"));

        if (dealRepository.existsByCustomerIdAndUserAndStageNotIn(
                customer.getId(), user, List.of(com.crm.deal.domain.DealStage.WON, com.crm.deal.domain.DealStage.LOST))) {
            throw new IllegalArgumentException("Este cliente já possui uma oportunidade em andamento no funil.");
        }

        Deal deal = new Deal(
                request.name(),
                request.amount(),
                request.stage(),
                customer,
                user
        );

        deal = dealRepository.save(deal);
        return DealResponse.fromEntity(deal);
    }

    public List<DealResponse> getAllDeals(User user) {
        List<Deal> deals = dealRepository.findAllByUserOrderByCreatedAtDesc(user);
        return deals.stream().map(DealResponse::fromEntity).toList();
    }

    public DealResponse updateDealStage(UUID id, DealStageUpdateRequest request, User user) {
        Deal deal = dealRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));

        deal.updateStage(request.stage());
        deal = dealRepository.save(deal);
        return DealResponse.fromEntity(deal);
    }

    public void deleteDeal(UUID id, User user) {
        if (!dealRepository.existsByIdAndUser(id, user)) {
            throw new IllegalArgumentException("Deal not found");
        }
        dealRepository.deleteById(id);
    }

    public com.crm.deal.dto.NoteResponse addNoteToDeal(UUID dealId, com.crm.deal.dto.NoteRequest request, User user) {
        Deal deal = dealRepository.findByIdAndUser(dealId, user)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));

        com.crm.deal.domain.Note note = new com.crm.deal.domain.Note(request.content(), deal, user);
        note = noteRepository.save(note);
        return com.crm.deal.dto.NoteResponse.fromEntity(note);
    }

    public List<com.crm.deal.dto.NoteResponse> getDealNotes(UUID dealId, User user) {
        Deal deal = dealRepository.findByIdAndUser(dealId, user)
                .orElseThrow(() -> new IllegalArgumentException("Deal not found"));

        List<com.crm.deal.domain.Note> notes = noteRepository.findAllByDealAndUserOrderByCreatedAtDesc(deal, user);
        return notes.stream().map(com.crm.deal.dto.NoteResponse::fromEntity).toList();
    }
}
