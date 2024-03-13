package Customer.example.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    public Orders getOrderById(Long id) {
        return orderRepository.findById(id).orElse(null);
    }

    public List<Orders> getOrdersByUserId(Long userId) {
        return orderRepository.findByUserId(userId);
    }

    public Orders createOrder(Orders order) {
        return orderRepository.save(order);
    }

    // Other service methods as needed
}
