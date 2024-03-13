package User.user;

//UserRepository.java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
 // You can add custom queries or methods here if needed
}
