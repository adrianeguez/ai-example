AI Trial Task: Supplement Store Project
Assignment Overview
● You are tasked with building a dual-interface web application for a supplement
store, consisting of a customer-facing storefront and an administrative
provider portal. The purpose of this assignment is to evaluate your AI usage
skills in modern web development.
● Try to complete as much as possible within approximately 2 hours and record a
video showcasing your work process.
● Once the assignment is complete, provide the source code (Git, zip archive,
etc.) and project setup instructions.
Evaluation Criteria (in order of importance)
1. AI Usage
2. Speed of implementation
3. UI/UX quality
Technical Stack
● Framework: Next.js + TypeScript
● UI Components: shadcn/ui
● Styling: TailwindCSS
● Backend: No backend or authentication, all data must be dummy
● Data Persistence: Developer's choice
Layout Requirements
● Header with a navigation menu
● Footer with relevant links and information
● Responsive design
1. Storefront Section
1.1 Homepage
● Display a carousel with best-selling products (dummy data).
● Display a FAQ section with expandable questions.
1.2 All Products Page
● Display all products (dummy data) in a grid layout.
● Filtering capabilities:
○ By category
○ By price range
○ By best sellers
● Searching capabilities:
○ By product name
○ By product description
● Sorting capabilities:
○ Price: High to low, low to high
○ Alphabetical order
○ Best sellers first
1.3 Product Details Page
● Each product must have a dynamic routing page.
● Display all product details.
● Add to cart functionality.
1.4 Shopping Cart
● Cart contents don’t need to be persistent.
● Limit products to a single quantity per product.
● Allow adding or removing products from the cart.
● Display a cart summary.
● Clear cart option.
● Proceed to the checkout button.
1.5 Checkout
● Users can proceed to checkout from the cart.
● The checkout page must include:
○ Required fields for shipping information.
○ A summary of the order.
● User-created orders should be stored and displayed in the Provider Portal but do
not need to persist between page refreshes.
2. Provider Portal Section
2.1 All Orders Page
● Paginated table of orders.
● Default populated with dummy data.
● Pagination required.
● Searching capabilities:
○ By order ID
○ By product name
○ By customer name
● Filtering capabilities:
○ By date range
○ By status
2.2 Order Details Page
● Each order must have a dynamic routing page.
● Display comprehensive order information, including:
○ Order summary
○ Customer details
○ Product list
● Ability to change the order’s status.