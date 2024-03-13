package order.example.order;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private Date orderedDate;
    private double total;
    private int userId;

    // Constructors, getters, setters, and other methods

    // Getters and Setters

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Date getOrderedDate() {
        return orderedDate;
    }

    public void setOrderedDate(Date orderedDate) {
        this.orderedDate = orderedDate;
    }

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

	public Order(Long orderId, Date orderedDate, double total, int userId) {
		super();
		this.orderId = orderId;
		this.orderedDate = orderedDate;
		this.total = total;
		this.userId = userId;
	}

	public Order() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}
