package order.example.order;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId).orElse(null);
    }

    public Order createOrder(Order order) {
        // You can add validation or business logic here if needed
        return orderRepository.save(order);
    }

    public Order updateOrder(Long orderId, Order updatedOrder) {
        // You can add validation or business logic here if needed
        updatedOrder.setOrderId(orderId);
        return orderRepository.save(updatedOrder);
    }

    public void deleteOrder(Long orderId) {
        orderRepository.deleteById(orderId);
    }
}
