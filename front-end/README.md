
# SnapNBuy - E-commerce Platform

**SnapNBuy** is a fully functional e-commerce platform designed to provide an efficient and seamless shopping experience. The platform allows users to browse products, manage their shopping cart, track orders, and enjoy exclusive offers based on their subscription tier. The website is fully responsive, accessible, and scalable for future growth.

---

## **Features**

### **User Features**
- **Product Listings:** 
  - Browse products displayed in a grid format with images, names, prices, and an "Add to Cart" button.
  - Featured and trending products based on sales volume, user ratings, and popularity.
  
- **Search Functionality:**
  - A search bar to quickly find products by name or category.

- **Global Filters:** 
  - Users can filter products by price, category, brand, ratings, and availability. Filters are dynamic and can be adjusted without reloading the page.

- **Shopping Cart:**
  - Add, remove, and modify products in the cart.
  - Display total cart value and update in real-time as items are added or removed.

- **Wishlist:** 
  - Save items for later purchases and view them in the profile.

- **Product Reviews and Ratings:** 
  - Leave product reviews and ratings to help other customers make informed decisions.

- **Order Tracking:** 
  - Users can track their past and current orders in their profile section.

- **Subscription Management:**
  - Two-tier subscription: Normal and Premium. Premium users get exclusive access to discounts, free shipping, and early access to sales.

---

### **Admin Features**
- **Product Management:** 
  - Admin can add, update, and delete products.
  
- **Order Management:** 
  - Admins can manage and monitor user orders, ensuring smooth processing.

---

## **Tech Stack**

- **Frontend:** React.js, HTML, CSS, JavaScript
- **Backend:** ASP.NET
- **Database:** MongoDB / SQL
- **State Management:** Redux for global state handling
- **Authentication:** JWT (JSON Web Tokens) for user authentication
- **Styling:** TailwindCSS, Bootstrap, or custom CSS for responsive design

---

## **Installation**

1. **Clone the repository:**

   ```bash
   git clone https://github.com/khushboosinghal25/SnapNBuy.git
   cd SnapNBuy
   ```

2. **Frontend Setup:**

   Navigate to the `/frontend` directory and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. **Backend Setup:**

   Navigate to the `/backend` directory and install dependencies:

   ```bash
   cd backend
   dotnet restore
   dotnet run
   ```

4. **Running the Application:**

   Start the frontend and backend backends:

   - **Frontend:** 
     ```bash
     cd frontend
     npm start
     ```

   - **Backend:**
     ```bash
     cd backend
     dotnet run
     ```

   The application will be available at `http://localhost:3000` (for the frontend) and `http://localhost:5000` (for the backend).

---

## **Environment Variables**

In the root directory, create a `.env` file for environment configurations:

For **frontend** (`/frontend`), set the API endpoint:

```
REACT_APP_API_URL=http://localhost:5000/api
```

For **backend** (`/backend`), set up database and secret keys:

```
# SQL Database setup (for SQL Server or SQLite)
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## **Features in Development**
- **Mobile-First Design:** Fully responsive design to work across mobile, tablet, and desktop.
- **SEO Optimization:** Product listings and categories are structured for SEO.
- **Animations:** Subtle hover effects, smooth transitions for modals and cart updates.

---

## **Design & Usability**

- **Accessibility:** The app follows WCAG 2.1 standards for accessibility, including proper color contrast, semantic HTML, and ARIA attributes.
- **Keyboard Navigation:** Ensure all interactive elements can be accessed with the keyboard (Tab, Enter, and Space).
- **User-friendly UI:** Designed for simplicity and ease of use across devices.

---

## **Deployment**

You can deploy this platform to a scalable cloud service such as Heroku, AWS, or DigitalOcean. Ensure to configure the environment variables properly and secure database connections.

---

## **Testing & QA**

- **Functional Testing:** Ensure features like product listings, cart management, and subscriptions work as expected.
- **Integration Testing:** Validate the interaction between the frontend, backend, and database.
- **Edge Case Testing:** Handle scenarios like empty cart, invalid input, and nonexistent products.

---

## **Contributing**

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes.
4. Commit (`git commit -am 'Add feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Submit a pull request.

---

## **License**

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## **Contact**

**Developer:** Khushboo Singhal  
📬 [khushboos2594@gmail.com](mailto:khushboos2594@gmail.com)  
🔗 [GitHub](https://github.com/khushboosinghal25)