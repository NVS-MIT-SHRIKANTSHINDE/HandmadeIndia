package Seller.example.Seller;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class SellerApplication {

	public static void main(String[] args) {
		SpringApplication.run(SellerApplication.class, args);
		System.out.println("user service started ");
	}
	 @Bean
	    public WebMvcConfigurer corsConfigurer()
	    {
	        return new WebMvcConfigurer() {
	            @Override
	            public void addCorsMappings(CorsRegistry registry) {
	                registry.addMapping("/**").allowedOrigins("*");
	            }
	        };
	    }
	
	
}
