package Seller.example.Seller;

//UserController.java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class UserController {

 @Autowired
 private UserService userService;

 @GetMapping
 public List<User> getAllUsers() {
     return userService.getAllUsers();
 }

 @GetMapping("/{id}")
 public User getUserById(@PathVariable Long id) {
     return userService.getUserById(id);
 }

 @PostMapping
 public User saveUser(@RequestBody User user) {
     return userService.saveUser(user);
 }

 @DeleteMapping("/{id}")
 public void deleteUser(@PathVariable Long id) {
     userService.deleteUser(id);
 }
 @GetMapping("/login")
 public User getUserByCredentials(@RequestParam String email,
                                  @RequestParam String accountType,
                                  @RequestParam String password) {
     return userService.getUserByEmailAccountTypeAndPassword(email, accountType, password);
 }

}
