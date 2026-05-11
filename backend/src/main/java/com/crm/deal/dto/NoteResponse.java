package com.crm.deal.dto;

import com.crm.deal.domain.Note;
import java.time.LocalDateTime;
import java.util.UUID;

public record NoteResponse(
        UUID id,
        String content,
        LocalDateTime createdAt,
        String authorName
) {
    public static NoteResponse fromEntity(Note note) {
        return new NoteResponse(
                note.getId(),
                note.getContent(),
                note.getCreatedAt(),
                note.getUser().getName()
        );
    }
}
