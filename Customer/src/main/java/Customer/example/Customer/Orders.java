package Customer.example.Customer;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Orders {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int userId;

    private List<Long> productIds;

    private double totalAmount;

    private String address;

    private String contactNo;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public List<Long> getProductIds() {
		return productIds;
	}

	public void setProductIds(List<Long> productIds) {
		this.productIds = productIds;
	}

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public Orders(Long id, int userId, List<Long> productIds, double totalAmount, String address, String contactNo) {
		super();
		this.id = id;
		this.userId = userId;
		this.productIds = productIds;
		this.totalAmount = totalAmount;
		this.address = address;
		this.contactNo = contactNo;
	}

	public Orders() {
		super();
		// TODO Auto-generated constructor stub
	}

    // Getters and setters

    // You can also add constructors and other methods as needed
}
