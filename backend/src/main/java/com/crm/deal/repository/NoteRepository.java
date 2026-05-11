package com.crm.deal.repository;

import com.crm.core.user.User;
import com.crm.deal.domain.Deal;
import com.crm.deal.domain.Note;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.UUID;

public interface NoteRepository extends JpaRepository<Note, UUID> {
    List<Note> findAllByDealAndUserOrderByCreatedAtDesc(Deal deal, User user);
}
