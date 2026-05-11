package com.crm.deal.repository;

import com.crm.core.user.User;
import com.crm.deal.domain.Deal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface DealRepository extends JpaRepository<Deal, UUID> {
    List<Deal> findAllByUserOrderByCreatedAtDesc(User user);
    Optional<Deal> findByIdAndUser(UUID id, User user);
    boolean existsByIdAndUser(UUID id, User user);
    boolean existsByCustomerIdAndUserAndStageNotIn(UUID customerId, User user, List<com.crm.deal.domain.DealStage> stages);
}
