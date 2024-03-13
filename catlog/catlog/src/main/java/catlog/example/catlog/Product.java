package catlog.example.catlog;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int ownerid;
    private String category;
    private String productName;
    private String state;
    private String storyCulture;
    private String daysRequired;
    private String lifeOfProduct;
    private String howToUse;
    private String expectedPrice;
    private String confirmPrice;
    private String quantity;
    @Column(columnDefinition = "VARCHAR(255) DEFAULT 'unsold'")
    private String status;


    @Lob
    private byte[] image;

    // Constructors
    public Product() {
        // Default constructor
    	this.status = "unsold"; // Set default value
    }

    public Product(int ownerid ,String category, String productName, String state, String storyCulture, String daysRequired,
                   String lifeOfProduct, String howToUse, String expectedPrice, String confirmPrice, String quantity,
                   byte[] image,String status) {
    	this.status=status;
    	this.ownerid=ownerid;
        this.category = category;
        this.productName = productName;
        this.state = state;
        this.storyCulture = storyCulture;
        this.daysRequired = daysRequired;
        this.lifeOfProduct = lifeOfProduct;
        this.howToUse = howToUse;
        this.expectedPrice = expectedPrice;
        this.confirmPrice = confirmPrice;
        this.quantity = quantity;
        this.image = image;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getStoryCulture() {
        return storyCulture;
    }

    public void setStoryCulture(String storyCulture) {
        this.storyCulture = storyCulture;
    }

    public String getDaysRequired() {
        return daysRequired;
    }

    public void setDaysRequired(String daysRequired) {
        this.daysRequired = daysRequired;
    }

    public String getLifeOfProduct() {
        return lifeOfProduct;
    }

    public void setLifeOfProduct(String lifeOfProduct) {
        this.lifeOfProduct = lifeOfProduct;
    }

    public String getHowToUse() {
        return howToUse;
    }

    public void setHowToUse(String howToUse) {
        this.howToUse = howToUse;
    }

    public String getExpectedPrice() {
        return expectedPrice;
    }

    public void setExpectedPrice(String expectedPrice) {
        this.expectedPrice = expectedPrice;
    }

    public String getConfirmPrice() {
        return confirmPrice;
    }

    public void setConfirmPrice(String confirmPrice) {
        this.confirmPrice = confirmPrice;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    
    public int getOwnerid() {
        return ownerid;
    }

    public void setOwnerid(int ownerid) {
        this.ownerid = ownerid;
    }
    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
