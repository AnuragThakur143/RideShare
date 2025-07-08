package com.ridershare.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ridershare.backend.entity.Ride;
import com.ridershare.backend.entity.User;
import com.ridershare.backend.service.RideService;
import com.ridershare.backend.service.UserService;

@RestController
@RequestMapping("/rides")
@CrossOrigin(origins = { "http://localhost:5173" })
public class RideController {

    @Autowired
    private RideService rideService;
    @Autowired
    private UserService userService;

    @PostMapping("/book")
    public ResponseEntity<?> bookRide(@RequestBody Ride ride, @AuthenticationPrincipal UserDetails userDetails) {
        User rider = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        ride.setRiderId(rider.getId());
        ride.setStatus(Ride.Status.REQUESTED);
        Ride savedRide = rideService.bookRide(ride);

        return ResponseEntity.ok(savedRide);
    }

    @PostMapping("/status/{rideId}")
    public ResponseEntity<?> updateStatus(@PathVariable Long rideId, @RequestBody Map<String, String> req) {
        Ride.Status status = Ride.Status.valueOf(req.get("status"));
        String driverId = req.get("driverId");

        Ride updated = rideService.updateStatus(rideId, status, driverId);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/history")
    public ResponseEntity<?> rideHistory(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.findByEmail(userDetails.getUsername()).orElseThrow();
        List<Ride> rides = rideService.getRidesForUser(user);
        return ResponseEntity.ok(rides);
    }

    @GetMapping("/requested")
    public ResponseEntity<?> getRequestedRides() {
        return ResponseEntity.ok(rideService.getRequestedRides());
    }

    @GetMapping("/status/{rideId}")
    public ResponseEntity<?> getRideStatus(@PathVariable Long rideId) {
        Ride ride = rideService.getRideById(rideId);
        if (ride == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(ride);
    }
}
