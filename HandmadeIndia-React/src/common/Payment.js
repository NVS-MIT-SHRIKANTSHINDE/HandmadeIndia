
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const navigate = useNavigate();
  const auth = localStorage.getItem('USER');
  const userData = JSON.parse(auth);
  const cart = localStorage.getItem('cart');
  const userCart = JSON.parse(cart);
  const shippingDetails = JSON.parse(localStorage.getItem('shippingDetails'));

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const updateProductStatus = (productIds) => {
    Promise.all(
      productIds.map((productId) =>
        fetch(`http://localhost:8082/product/products/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'sold',
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to update product status for product ID ${productId}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(`Product status updated to "sold" for product ID ${productId}`);
          })
      )
    )
      .catch((error) => {
        console.error('Error updating product status:', error.message);
        // Handle the error (e.g., display an error message to the user)
      });
  };

  const deleteCartItems = (itemIds) => {
    Promise.all(
      itemIds.map((itemId) =>
        fetch(`http://localhost:8082/cart/cart/${itemId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to delete cart item with ID ${itemId}`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(`Cart item with ID ${itemId} deleted successfully`);
          })
      )
    )
      .then(() => {
        // Clear cart storage after successful deletion
        localStorage.removeItem('cart');
        console.log('Cart storage cleared successfully');
      })
      .catch((error) => {
        console.error('Error deleting cart items:', error.message);
        // Handle the error (e.g., display an error message to the user)
      });
  };

  const displayRazorpay = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('You are offline... Failed to load Razorpay SDK');
      return;
    }

    const options = {
      key: 'rzp_test_5VSjKliP97CKhj',
      currency: 'INR',
      amount: parseFloat(userCart.expectedPrice) * 100,
      name: userData.name,
      description: 'Thanks for booking through our portal',
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert('Payment Successfully');

        // Update product status to "sold" after successful payment
        updateProductStatus(userCart.productIds);
        sendOrderDataToServer();
        // Delete cart items and clear cart storage
        deleteCartItems(userCart.itemIds);

        navigate('/placedorder');
      },
      prefill: {
        name: 'UserName',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const sendOrderDataToServer = () => {
    // Fetch the necessary data from local storage
    const userId = userData.id;
    const productIds = userCart.productIds;
    const totalAmount = userCart.expectedPrice;
    const address = shippingDetails.shippingDetails.address;
    const contactNo = shippingDetails.shippingDetails.phoneNumber;

    // Send a POST request to your server with the order data
    fetch('http://localhost:8082/order/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productIds,
        totalAmount,
        address,
        contactNo,
        
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Order data sent to server:', data);
      })
      .catch((error) => {
        console.error('Error sending order data to server:', error.message);
      });
  };

  return (
    <div className="App">
      <div className="buttons">
        <button onClick={displayRazorpay}>BUY NOW</button>
      </div>
    </div>
  );
}

export default Payment;
