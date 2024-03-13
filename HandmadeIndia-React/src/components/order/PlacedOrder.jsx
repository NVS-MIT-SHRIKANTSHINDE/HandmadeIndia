import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PlacedOrder.css";

const PlacedOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [productId, setProductId] = useState("");
  const auth = localStorage.getItem('USER');
  const userData = JSON.parse(auth);
  const userId = userData.id;

  const handleInputChange = (e) => {
    setProductId(e.target.value);
  };

  useEffect(() => {
    // Fetch order data for the specific userId from the server
    fetch(`http://localhost:8082/order/orders/user/${userId}`)
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, [userId]);

  const handleTrackOrder = (orderId) => {
    console.log(`Track Order clicked for Order ID: ${orderId}`);
    // Implement tracking logic or navigation to the order tracking page
  };

  const handleDownloadReceipt = (orderId) => {
    // Implement logic to download the receipt for the specified order
    console.log(`Download Receipt clicked for Order ID: ${orderId}`);
  };

  const handlePrintReceipt = (orderId) => {
    const order = orders.find(order => order.id === orderId);

    // Generate the receipt content with enhanced formatting
    const receiptContent = `
        <div style="text-align: center; font-family: 'Arial', sans-serif;">
            <h2>Handmade India - Crafting Dreams</h2>
            <hr style="border: 1px dashed #000;">

            <h3>Receipt for Order ID: ${orderId}</h3>
            <p><strong>User ID:</strong> ${order.userId}</p>
            <p><strong>Product IDs:</strong> ${order.productIds.join(", ")}</p>
            <p><strong>Total Amount:</strong> Rs ${order.totalAmount.toFixed(2)}</p>
            <p><strong>Address:</strong> ${order.address}</p>
            <p><strong>Contact No:</strong> ${order.contactNo}</p>

            <hr style="border: 1px dashed #000;">
            <p>Thank you for shopping with us!</p>
            <p>We hope you enjoy your handmade products from Handmade India.</p>
        </div>
    `;

    // Open a new window with the receipt content and print it
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
        <html>
            <head>
                <title>Receipt</title>
            </head>
            <body>
                <div style="padding: 20px;">
                    ${receiptContent}
                </div>
            </body>
        </html>`
    );
    printWindow.document.close();
    printWindow.print();
};

// Example usage:
// handlePrintReceipt(123);


  return (
    <div className="placed-order">
      <label>
        Enter Product ID:
        <input type="text" value={productId} onChange={handleInputChange} />
      </label>
      <Link to={`/viewproduct/${productId}`}>View Product</Link>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>Product IDs</th>
              <th>Total Amount</th>
              <th>Address</th>
              <th>Contact No</th>
              <th>Action</th>
              {/* <th>Download Receipt</th> */}
              <th>Print Receipt</th> {/* New column for Print Receipt */}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="order-item">
                <td>YvEcH{order.id}</td>
                <td>{order.userId}</td>
                <td><Link to={`/viewproduct/${order.productIds}`}>{order.productIds.join(", ")}</Link></td>
                
                <td>Rs:{order.totalAmount}</td>
                <td>{order.address}</td>
                <td>{order.contactNo}</td>
                <td>
                  <button
                    className="track-order-button"
                    onClick={() => handleTrackOrder(order.id)}
                  >
                    Track Order
                  </button>
                </td>
                {/* <td>
                  <button
                    className="download-receipt-button"
                    onClick={() => handleDownloadReceipt(order.id)}
                  >
                    Download Receipt
                  </button>
                </td> */}
                <td>
                  <button
                    className="track-order-button"
                    onClick={() => handlePrintReceipt(order.id)}
                  >
                    Print Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p>Ordered through Handmade India - Crafting Dreams!</p>
    </div>
  );
};

export default PlacedOrder;
