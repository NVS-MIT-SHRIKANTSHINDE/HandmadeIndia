package productcatalogservice.example.productcatalogservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/products")
public class ProductCatalogController {

    private final ProductCatalogService productCatalogService;

    @Autowired
    public ProductCatalogController(ProductCatalogService productCatalogService) {
        this.productCatalogService = productCatalogService;
    }

    @GetMapping
    public List<ProductCatalog> getAllProducts() {
        return productCatalogService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCatalog> getProductById(@PathVariable Long id) {
        Optional<ProductCatalog> product = productCatalogService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProductCatalog> addProduct(@RequestBody ProductCatalog product) {
        ProductCatalog savedProduct = productCatalogService.saveProduct(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productCatalogService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
