package productcatalogservice.example.productcatalogservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductCatalogService {

    private final ProductCatalogRepository productCatalogRepository;

    @Autowired
    public ProductCatalogService(ProductCatalogRepository productCatalogRepository) {
        this.productCatalogRepository = productCatalogRepository;
    }

    public List<ProductCatalog> getAllProducts() {
        return productCatalogRepository.findAll();
    }

    public Optional<ProductCatalog> getProductById(Long id) {
        return productCatalogRepository.findById(id);
    }

    public ProductCatalog saveProduct(ProductCatalog product) {
        return productCatalogRepository.save(product);
    }

    public void deleteProduct(Long id) {
        productCatalogRepository.deleteById(id);
    }
}
