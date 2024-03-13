package Seller.example.Seller;

//UserRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

  // Existing methods...

  User findByEmailAndAccountTypeAndPassword(String email, String accountType, String password);
}

