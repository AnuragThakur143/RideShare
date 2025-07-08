package com.ridershare.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ridershare.backend.entity.Ride;

public interface RideRepository extends JpaRepository<Ride, Long> {
    
}
