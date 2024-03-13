package Customer.example.Customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders, Long> {
    
    // Custom method to find orders by user ID
    List<Orders> findByUserId(Long userId);

    // You can add more custom queries if needed
}
