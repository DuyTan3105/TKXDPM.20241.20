package org.example.backend.mappers;


import org.example.backend.dtos.requests.user.RegisterAccountRequest;
import org.example.backend.entities.user.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring", nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface UserMapper {
    User mapToEntity(RegisterAccountRequest request);

    void updateFromDTO(RegisterAccountRequest request, @MappingTarget User user);
}
