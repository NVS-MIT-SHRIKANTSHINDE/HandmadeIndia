package productcatalogservice.example.productcatalogservice;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductCatalogRepository extends JpaRepository<ProductCatalog, Long> {

    // You can add custom query methods if needed

}

