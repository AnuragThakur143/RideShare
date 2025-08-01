package com.ridershare.backend.entity;

import jakarta.persistence.Id;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Ride {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String pickupLocation;
    private String dropoffLocationString;
    private Double fare;

    private Long driverId;
    private Long riderId;
    
    private String paymentMode;

    @Enumerated(EnumType.STRING)
    private Status status;

    public enum Status {
        REQUESTED,
        ACCEPTED,
        PICKED,
        COMPLETED
    }
}
