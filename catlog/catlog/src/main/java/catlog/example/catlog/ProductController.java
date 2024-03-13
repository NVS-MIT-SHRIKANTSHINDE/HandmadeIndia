package catlog.example.catlog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productService.getProductById(id);
    }

    @PostMapping
    public Product saveProduct(@RequestParam("image") MultipartFile image,
                               @RequestParam("category") String category,
                               @RequestParam("ownerid") int ownerid,
                               @RequestParam("productName") String productName,
                               @RequestParam("state") String state,
                               @RequestParam("storyCulture") String storyCulture,
                               @RequestParam("daysRequired") String daysRequired,
                               @RequestParam("lifeOfProduct") String lifeOfProduct,
                               @RequestParam("howToUse") String howToUse,
                               @RequestParam("expectedPrice") String expectedPrice,
                               @RequestParam("confirmPrice") String confirmPrice,
                               @RequestParam("quantity") String quantity) {

        Product product = new Product();
        // Set other fields
        product.setOwnerid(ownerid);
        product.setCategory(category);
        product.setProductName(productName);
        product.setState(state);
        product.setStoryCulture(storyCulture);
        product.setDaysRequired(daysRequired);
        product.setLifeOfProduct(lifeOfProduct);
        product.setHowToUse(howToUse);
        product.setExpectedPrice(expectedPrice);
        product.setConfirmPrice(confirmPrice);
        product.setQuantity(quantity);

        // Handle image upload
        try {
            byte[] imageBytes = image.getBytes();
            product.setImage(imageBytes);
        } catch (Exception e) {
            e.printStackTrace(); // Handle the exception appropriately
        }

        return productService.saveProduct(product);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/byOwner/{ownerid}")
    public List<Product> getProductsByOwnerid(@PathVariable int ownerid) {
        return productService.getProductsByOwnerid(ownerid);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProductStatus(@PathVariable Long id,
                                                       @RequestBody Map<String, String> requestBody) {
        String status = requestBody.get("status");
        Product updatedProduct = productService.updateProductStatus(id, status);

        if (updatedProduct != null) {
            return ResponseEntity.ok(updatedProduct);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
