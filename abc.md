COMPREHENSIVE BACKEND SDE1 PREPARATION GUIDE
===========================================

This in-depth guide covers all essential topics for SDE1 (Backend Developer) positions at Zolve and similar companies.

===========================================
1. PROGRAMMING LANGUAGES
===========================================

## PYTHON
- Core concepts:
  * Data types: 
    - Lists: Mutable ordered collections 
      Example: `my_list = [1, 2, 3]`, `my_list.append(4)` → [1, 2, 3, 4]
    - Tuples: Immutable ordered collections
      Example: `coordinates = (10.5, 20.8)` 
    - Dictionaries: Key-value pairs
      Example: `user = {'name': 'John', 'age': 30}`
    - Sets: Unordered collections of unique items
      Example: `unique_numbers = {1, 2, 3, 3}` → {1, 2, 3}
  
  * List/dictionary comprehensions: Concise way to create collections
    Example: `squares = [x*x for x in range(10)]` → [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]
    Example: `name_lengths = {name: len(name) for name in ['John', 'Mary', 'Bob']}` → {'John': 4, 'Mary': 4, 'Bob': 3}
  
  * Iterators and generators: 
    - Iterator: Object implementing __iter__ and __next__
    - Generator: Functions that yield values
      Example: 
      ```python
      def count_up_to(max):
          count = 1
          while count <= max:
              yield count
              count += 1
      
      for number in count_up_to(5):  # Uses minimal memory
          print(number)  # Prints 1, 2, 3, 4, 5
      ```
  
  * Context managers: Resources with guaranteed cleanup
    Example:
    ```python
    with open('file.txt', 'w') as f:  # File automatically closed after block
        f.write('Hello, world!')
    ```
  
  * Decorators and closures: Functions that modify other functions
    Example:
    ```python
    def log_function_call(func):
        def wrapper(*args, **kwargs):
            print(f"Calling {func.__name__} with {args}, {kwargs}")
            return func(*args, **kwargs)
        return wrapper
    
    @log_function_call
    def add(a, b):
        return a + b
    
    add(3, 5)  # Prints: "Calling add with (3, 5), {}" and returns 8
    ```
  
  * Exception handling: Gracefully handle errors
    Example:
    ```python
    try:
        result = 10 / 0
    except ZeroDivisionError:
        result = float('inf')  # Handle specific error
    finally:
        print("Operation attempted")  # Always executes
    ```

- Advanced concepts:
  * Asynchronous programming:
    Example:
    ```python
    import asyncio
    
    async def fetch_data(delay):
        await asyncio.sleep(delay)  # Non-blocking sleep
        return f"Data after {delay} seconds"
    
    async def main():
        # Run tasks concurrently
        results = await asyncio.gather(
            fetch_data(1),
            fetch_data(2),
            fetch_data(3)
        )
        print(results)  # After ~3 seconds (not 6), prints all results
    
    asyncio.run(main())
    ```
  
  * Multithreading vs multiprocessing:
    - Multithreading: Good for I/O-bound tasks
      ```python
      import threading
      
      def process_file(filename):
          # I/O bound task
          with open(filename, 'r') as f:
              data = f.read()
          # Process data...
      
      threads = []
      for file in filenames:
          t = threading.Thread(target=process_file, args=(file,))
          threads.append(t)
          t.start()
      
      for t in threads:
          t.join()  # Wait for all threads to complete
      ```
    
    - Multiprocessing: Good for CPU-bound tasks
      ```python
      import multiprocessing
      
      def compute_intensive_task(data):
          # CPU intensive calculations
          result = 0
          for i in range(10000000):
              result += data * i
          return result
      
      if __name__ == "__main__":
          pool = multiprocessing.Pool(processes=4)  # 4 worker processes
          results = pool.map(compute_intensive_task, [1, 2, 3, 4])
          pool.close()
          pool.join()
      ```
  
  * GIL (Global Interpreter Lock): Limitation preventing true multithreading
    - Only one thread can execute Python code at once
    - Workarounds: multiprocessing, C extensions, alternative interpreters (PyPy)

- Web frameworks:
  * Django: Full-featured framework with ORM, admin panel, authentication
    Example:
    ```python
    # models.py
    from django.db import models
    
    class Product(models.Model):
        name = models.CharField(max_length=100)
        price = models.DecimalField(max_digits=10, decimal_places=2)
        description = models.TextField(blank=True)
        created_at = models.DateTimeField(auto_now_add=True)
        
        def __str__(self):
            return self.name
    
    # views.py
    from django.shortcuts import render
    from rest_framework import viewsets
    from .models import Product
    from .serializers import ProductSerializer
    
    class ProductViewSet(viewsets.ModelViewSet):
        queryset = Product.objects.all()
        serializer_class = ProductSerializer
    ```
  
  * Flask: Lightweight microframework with extensions
    Example:
    ```python
    from flask import Flask, jsonify, request
    
    app = Flask(__name__)
    
    # In-memory database for example
    products = [
        {"id": 1, "name": "Laptop", "price": 999.99},
        {"id": 2, "name": "Smartphone", "price": 699.99}
    ]
    
    @app.route('/products', methods=['GET'])
    def get_products():
        return jsonify(products)
    
    @app.route('/products/<int:product_id>', methods=['GET'])
    def get_product(product_id):
        product = next((p for p in products if p["id"] == product_id), None)
        if product:
            return jsonify(product)
        return jsonify({"error": "Product not found"}), 404
    
    if __name__ == '__main__':
        app.run(debug=True)
    ```

## NODE.JS
- Core concepts:
  * JavaScript/TypeScript fundamentals:
    Example (TypeScript):
    ```typescript
    // Type definitions
    interface User {
        id: number;
        name: string;
        email: string;
        isActive: boolean;
    }
    
    // Function with type annotations
    function getUserById(id: number): User | undefined {
        return users.find(user => user.id === id);
    }
    
    // Optional parameters and default values
    function updateUser(
        id: number, 
        data: Partial<User>, 
        notify: boolean = false
    ): boolean {
        const user = getUserById(id);
        if (!user) return false;
        
        Object.assign(user, data);
        
        if (notify) {
            sendNotification(user.email, "Profile updated");
        }
        
        return true;
    }
    ```
  
  * Event loop and non-blocking I/O:
    Example:
    ```javascript
    const fs = require('fs');
    
    console.log("Start reading file...");
    
    // Non-blocking file read
    fs.readFile('large-file.txt', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file:", err);
            return;
        }
        console.log(`File read complete. Size: ${data.length} bytes`);
    });
    
    console.log("Continue executing while file is being read");
    
    // This demonstrates how Node.js continues execution while I/O operations
    // are handled in the background
    ```
  
  * Promises, async/await:
    Example:
    ```javascript
    // Function returning a Promise
    function fetchUserData(userId) {
        return new Promise((resolve, reject) => {
            // Simulating API call
            setTimeout(() => {
                if (userId > 0) {
                    resolve({ id: userId, name: `User ${userId}` });
                } else {
                    reject(new Error("Invalid user ID"));
                }
            }, 1000);
        });
    }
    
    // Using Promises
    fetchUserData(123)
        .then(user => {
            console.log("User data:", user);
            return fetchUserData(456);
        })
        .then(anotherUser => {
            console.log("Another user:", anotherUser);
        })
        .catch(error => {
            console.error("Error fetching user:", error);
        });
    
    // Using async/await (cleaner syntax)
    async function getMultipleUsers() {
        try {
            const user1 = await fetchUserData(123);
            console.log("User 1:", user1);
            
            const user2 = await fetchUserData(456);
            console.log("User 2:", user2);
        } catch (error) {
            console.error("Error in getMultipleUsers:", error);
        }
    }
    
    getMultipleUsers();
    ```

- Web frameworks:
  * Express.js: Routing, middleware, error handling
    Example:
    ```javascript
    const express = require('express');
    const app = express();
    
    // Middleware for parsing JSON requests
    app.use(express.json());
    
    // Custom middleware for logging
    app.use((req, res, next) => {
        console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
        next();  // Pass control to next middleware
    });
    
    // Routes
    app.get('/api/users', (req, res) => {
        // Get query parameters
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        
        // Return mock data
        res.json({
            users: [
                { id: 1, name: "Alice", email: "alice@example.com" },
                { id: 2, name: "Bob", email: "bob@example.com" }
            ],
            limit,
            offset,
            total: 2
        });
    });
    
    // Route with path parameter
    app.get('/api/users/:id', (req, res) => {
        const userId = parseInt(req.params.id);
        
        // Error handling
        if (userId !== 1 && userId !== 2) {
            return res.status(404).json({ error: "User not found" });
        }
        
        const user = userId === 1 
            ? { id: 1, name: "Alice", email: "alice@example.com" }
            : { id: 2, name: "Bob", email: "bob@example.com" };
            
        res.json(user);
    });
    
    // Error handling middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: "Something went wrong!" });
    });
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
    ```

## JAVA
- Core concepts:
  * OOP principles:
    - Inheritance: Extending functionality of classes
      ```java
      public class Animal {
          public void makeSound() {
              System.out.println("Some sound");
          }
      }
      
      public class Dog extends Animal {
          @Override
          public void makeSound() {
              System.out.println("Bark");  // Overriding parent method
          }
          
          public void fetch() {
              System.out.println("Fetching");  // Adding new behavior
          }
      }
      ```
    
    - Polymorphism: Objects taking multiple forms
      ```java
      Animal myPet = new Dog();  // Animal reference to Dog object
      myPet.makeSound();  // Calls Dog's implementation: "Bark"
      // myPet.fetch();  // Error - Animal type doesn't have fetch()
      ((Dog)myPet).fetch();  // OK after casting
      ```
    
    - Encapsulation: Data hiding and access control
      ```java
      public class Account {
          private double balance;  // Private field not accessible outside
          
          public double getBalance() {  // Public getter method
              return balance;
          }
          
          public void deposit(double amount) {
              if (amount > 0) {  // Validation logic
                  balance += amount;
              }
          }
      }
      ```
    
    - Abstraction: Focusing on essential features
      ```java
      public abstract class Shape {
          public abstract double area();  // Abstract method, no implementation
          
          public void describe() {
              System.out.println("This is a shape with area: " + area());
          }
      }
      
      public class Circle extends Shape {
          private double radius;
          
          public Circle(double radius) {
              this.radius = radius;
          }
          
          @Override
          public double area() {
              return Math.PI * radius * radius;  // Implementation of abstract method
          }
      }
      ```

  * Collections framework:
    ```java
    import java.util.*;
    
    public class CollectionsExample {
        public static void main(String[] args) {
            // List example - ordered, allows duplicates
            List<String> names = new ArrayList<>();
            names.add("Alice");
            names.add("Bob");
            names.add("Alice");  // Duplicate allowed
            System.out.println(names);  // [Alice, Bob, Alice]
            
            // Set example - no duplicates
            Set<String> uniqueNames = new HashSet<>(names);
            System.out.println(uniqueNames);  // [Alice, Bob]
            
            // Map example - key-value pairs
            Map<Integer, String> employees = new HashMap<>();
            employees.put(1001, "John Doe");
            employees.put(1002, "Jane Smith");
            
            // Iterating through a Map
            for (Map.Entry<Integer, String> entry : employees.entrySet()) {
                System.out.println(
                    "ID: " + entry.getKey() + ", Name: " + entry.getValue()
                );
            }
        }
    }
    ```

  * Spring Boot:
    ```java
    // Application class
    @SpringBootApplication
    public class EcommerceApplication {
        public static void main(String[] args) {
            SpringApplication.run(EcommerceApplication.class, args);
        }
    }
    
    // Entity class
    @Entity
    @Table(name = "products")
    public class Product {
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        
        @NotBlank
        private String name;
        
        @Positive
        private BigDecimal price;
        
        @Column(length = 1000)
        private String description;
        
        // Getters and setters
    }
    
    // Repository interface
    public interface ProductRepository extends JpaRepository<Product, Long> {
        List<Product> findByPriceIsLessThanEqual(BigDecimal price);
    }
    
    // REST Controller
    @RestController
    @RequestMapping("/api/products")
    public class ProductController {
        
        @Autowired
        private ProductRepository productRepository;
        
        @GetMapping
        public List<Product> getAllProducts() {
            return productRepository.findAll();
        }
        
        @GetMapping("/{id}")
        public ResponseEntity<Product> getProductById(@PathVariable Long id) {
            return productRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
        }
        
        @PostMapping
        @ResponseStatus(HttpStatus.CREATED)
        public Product createProduct(@Valid @RequestBody Product product) {
            return productRepository.save(product);
        }
    }
    ```

===========================================
2. DATABASE MANAGEMENT SYSTEMS
===========================================

## SQL DATABASES
- Fundamentals:
  * SQL syntax:
    - SELECT with JOIN: Combining data from multiple tables
      ```sql
      SELECT users.name, orders.order_date, products.product_name
      FROM users
      INNER JOIN orders ON users.id = orders.user_id
      INNER JOIN order_items ON orders.id = order_items.order_id
      INNER JOIN products ON order_items.product_id = products.id
      WHERE orders.order_date > '2023-01-01'
      ORDER BY orders.order_date DESC;
      ```
    
    - GROUP BY with HAVING: Aggregating data with conditions
      ```sql
      SELECT 
          category_id,
          COUNT(*) as product_count,
          AVG(price) as avg_price
      FROM products
      GROUP BY category_id
      HAVING COUNT(*) > 5 AND AVG(price) < 100;
      ```
    
    - Subqueries: Nested queries for complex conditions
      ```sql
      SELECT name, salary
      FROM employees
      WHERE department_id IN (
          SELECT id 
          FROM departments 
          WHERE location = 'New York'
      )
      AND salary > (
          SELECT AVG(salary) FROM employees
      );
      ```
  
  * Database normalization:
    - 1NF: Eliminate repeating groups
      Before: 
      ```
      | OrderID | Products                  |
      |---------|---------------------------|
      | 1       | Laptop, Mouse, Keyboard   |
      ```
      
      After (1NF):
      ```
      | OrderID | Product  |
      |---------|----------|
      | 1       | Laptop   |
      | 1       | Mouse    |
      | 1       | Keyboard |
      ```
    
    - 2NF: Remove partial dependencies
      Example: Moving from 1NF to 2NF
      ```
      -- 1NF Table (non-2NF)
      | Order_ID | Product_ID | Product_Name | Customer_ID | Order_Date |
      |----------|------------|--------------|-------------|------------|
      | 1        | 101        | Laptop       | 201         | 2023-01-15 |
      | 1        | 102        | Mouse        | 201         | 2023-01-15 |
      
      -- 2NF Tables
      -- Orders table
      | Order_ID | Customer_ID | Order_Date |
      |----------|-------------|------------|
      | 1        | 201         | 2023-01-15 |
      
      -- Order_Items table
      | Order_ID | Product_ID |
      |----------|------------|
      | 1        | 101        |
      | 1        | 102        |
      
      -- Products table
      | Product_ID | Product_Name |
      |------------|--------------|
      | 101        | Laptop       |
      | 102        | Mouse        |
      ```
    
    - 3NF: Remove transitive dependencies
      Example: Moving from 2NF to 3NF
      ```
      -- 2NF Table (non-3NF)
      | Order_ID | Customer_ID | Customer_Zipcode | Order_Date |
      |----------|-------------|------------------|------------|
      | 1        | 201         | 10001            | 2023-01-15 |
      
      -- 3NF Tables
      -- Orders table
      | Order_ID | Customer_ID | Order_Date |
      |----------|-------------|------------|
      | 1        | 201         | 2023-01-15 |
      
      -- Customers table
      | Customer_ID | Customer_Zipcode |
      |-------------|------------------|
      | 201         | 10001            |
      ```
  
  * Transactions and ACID:
    - Atomicity: All operations complete or none do
      ```sql
      BEGIN TRANSACTION;
        UPDATE accounts SET balance = balance - 100 WHERE id = 1;
        UPDATE accounts SET balance = balance + 100 WHERE id = 2;
        
        -- If any statement fails, everything is rolled back
      COMMIT;  -- Or ROLLBACK if error occurred
      ```
    
    - Consistency: Database remains in valid state
      Example: Ensuring data integrity with constraints
      ```sql
      -- Creating tables with constraints
      CREATE TABLE accounts (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          balance DECIMAL(15,2) NOT NULL CHECK (balance >= 0),
          FOREIGN KEY (user_id) REFERENCES users(id)
      );
      
      -- Transaction maintaining consistency
      BEGIN TRANSACTION;
        -- Check if account has enough balance
        SELECT balance FROM accounts WHERE id = 1 FOR UPDATE;
        -- The FOR UPDATE locks the row, preventing concurrent modifications
        
        -- Only proceed with withdrawal if balance is sufficient
        UPDATE accounts SET balance = balance - 100 
        WHERE id = 1 AND balance >= 100;
        
        -- If no rows updated (balance insufficient), transaction fails
        IF @@ROWCOUNT = 0 THEN
          ROLLBACK;
          RAISERROR('Insufficient funds', 16, 1);
          RETURN;
        END IF;
        
        -- Complete the transfer
        UPDATE accounts SET balance = balance + 100 WHERE id = 2;
      COMMIT;
      ```

## NOSQL DATABASES
- Types and use cases:
  * Document stores: MongoDB stores data as JSON-like documents, ideal for content management and user profiles
    Example MongoDB document:
    ```javascript
    {
      "_id": ObjectId("60a2e8f25a2f895b60c69df1"),
      "username": "johndoe",
      "email": "john@example.com",
      "profile": {
        "firstName": "John",
        "lastName": "Doe",
        "address": {
          "street": "123 Main St",
          "city": "San Francisco",
          "state": "CA"
        }
      },
      "interests": ["programming", "music", "hiking"],
      "joinDate": ISODate("2021-05-17T14:10:42Z")
    }
    ```
  
  * Key-value stores: Redis is perfect for caching, session storage, and real-time analytics
    Example Redis operations:
    ```bash
    # Set a simple key-value pair
    SET user:1000 "John Doe"
    
    # Set with expiration (TTL) of 3600 seconds (1 hour)
    SET session:abc123 "{\"user_id\":1000,\"role\":\"admin\"}" EX 3600
    
    # Get value
    GET user:1000
    # Returns "John Doe"
    
    # Increment counter (atomic operation)
    INCR pageviews:homepage
    ```
  
  * Column-family stores: Cassandra is designed for high write throughput and distributed storage
    Example Cassandra data model:
    ```cql
    CREATE TABLE user_activity (
      user_id UUID,
      timestamp TIMESTAMP,
      activity_type TEXT,
      details MAP<TEXT, TEXT>,
      PRIMARY KEY (user_id, timestamp)
    ) WITH CLUSTERING ORDER BY (timestamp DESC);
    
    INSERT INTO user_activity (user_id, timestamp, activity_type, details)
    VALUES (
      123e4567-e89b-12d3-a456-426614174000,
      '2023-07-15 12:30:00',
      'login',
      {'ip': '192.168.1.1', 'device': 'mobile'}
    );
    ```
  
  * Graph databases: Neo4j excels at highly connected data for social networks and recommendation systems
    Example Neo4j Cypher query:
    ```cypher
    // Creating nodes and relationships
    CREATE (john:Person {name: 'John', age: 30})-[:FRIEND_OF]->(mary:Person {name: 'Mary', age: 28})
    
    // Finding friends of friends
    MATCH (person:Person {name: 'John'})-[:FRIEND_OF]->(friend)-[:FRIEND_OF]->(friendOfFriend)
    RETURN friendOfFriend.name, friendOfFriend.age
    ```

- Data modeling for NoSQL:
  * Schema design considerations
    - Embedding vs. referencing: 
      Embedding (denormalized): Good for "contains" relationships and data accessed together
      ```json
      // Document with embedded comments
      {
        "_id": "post123",
        "title": "NoSQL Databases",
        "content": "NoSQL databases are...",
        "comments": [
          { "user": "user1", "text": "Great post!" },
          { "user": "user2", "text": "Thanks for sharing." }
        ]
      }
      ```
      
      Referencing (normalized): Good for many-to-many relationships or large subdocuments
      ```json
      // Post document
      {
        "_id": "post123",
        "title": "NoSQL Databases",
        "content": "NoSQL databases are..."
      }
      
      // Comment documents
      {
        "_id": "comment1",
        "post_id": "post123",
        "user": "user1",
        "text": "Great post!"
      },
      {
        "_id": "comment2",
        "post_id": "post123",
        "user": "user2",
        "text": "Thanks for sharing."
      }
      ```
    
    - Access patterns: Design for query patterns, not for normalization
    - Polymorphic schemas: Different documents can have different fields in the same collection

- Consistency models:
  * Strong consistency: All reads receive the most recent write
  * Eventual consistency: Reads may return stale data, but will eventually be consistent
  * CAP theorem implications: Trade-offs between consistency, availability, and partition tolerance

- MongoDB specifics:
  * CRUD operations
    Example:
    ```javascript
    // Insert a document
    db.users.insertOne({
      username: "johndoe",
      email: "john@example.com",
      profile: {
        firstName: "John",
        lastName: "Doe"
      }
    });
    
    // Find a document
    db.users.findOne({ username: "johndoe" });
    
    // Update a document
    db.users.updateOne(
      { username: "johndoe" },
      { $set: { "profile.lastName": "Smith" } }
    );
    
    // Delete a document
    db.users.deleteOne({ username: "johndoe" });
    ```
  
  * Aggregation framework
    Example:
    ```javascript
    db.orders.aggregate([
      { $match: { status: "completed" } },
      { $group: { _id: "$customerId", totalSpent: { $sum: "$amount" } } },
      { $sort: { totalSpent: -1 } }
    ]);
    ```
  
  * Indexing in MongoDB
    Example:
    ```javascript
    // Create an index on the email field
    db.users.createIndex({ email: 1 });
    
    // Create a compound index on username and email
    db.users.createIndex({ username: 1, email: 1 });
    ```
  
  * Replication and sharding
    - Replication: Ensures data redundancy and high availability
    - Sharding: Distributes data across multiple servers for horizontal scaling

- Redis specifics:
  * Data structures (strings, lists, sets, hashes)
    Example:
    ```bash
    # Strings
    SET key "value"
    GET key
    
    # Lists
    LPUSH mylist "item1"
    RPUSH mylist "item2"
    LPOP mylist
    
    # Sets
    SADD myset "member1"
    SADD myset "member2"
    SMEMBERS myset
    
    # Hashes
    HSET user:1000 name "John Doe"
    HGET user:1000 name
    ```
  
  * Pub/sub pattern
    Example:
    ```bash
    # Publisher
    PUBLISH mychannel "Hello, world!"
    
    # Subscriber
    SUBSCRIBE mychannel
    ```
  
  * Caching strategies
    - Cache-aside: Application manages cache
    - Write-through: Cache updated on write
    - Write-behind: Cache updated asynchronously
  
  * Redis Cluster
    - Provides horizontal scaling and high availability
    - Data partitioned across multiple nodes

## DATABASE PERFORMANCE
- Connection pooling:
  * Concept and implementation:
    - Maintains a cache of database connections for reuse
    - Reduces connection establishment overhead (TCP handshake, authentication)
    - Example HikariCP configuration in Java:
      ```java
      HikariConfig config = new HikariConfig();
      config.setJdbcUrl("jdbc:postgresql://localhost:5432/mydb");
      config.setUsername("dbuser");
      config.setPassword("dbpass");
      config.setMaximumPoolSize(10);
      config.setMinimumIdle(5);
      config.setIdleTimeout(60000);
      config.setConnectionTimeout(30000);
      config.addDataSourceProperty("cachePrepStmts", "true");
      config.addDataSourceProperty("prepStmtCacheSize", "250");
      
      HikariDataSource dataSource = new HikariDataSource(config);
      ```
    - Monitoring connection pool:
      ```java
      // Get pool metrics
      HikariPoolMXBean poolMXBean = dataSource.getHikariPoolMXBean();
      int activeConnections = poolMXBean.getActiveConnections();
      int idleConnections = poolMXBean.getIdleConnections();
      int totalConnections = poolMXBean.getTotalConnections();
      ```

- Query optimization steps:
  1. Identify slow queries using database profiling tools
     ```sql
     -- For MySQL
     SET profiling = 1;
     -- Run your query
     SELECT * FROM orders WHERE customer_id = 123;
     -- See profile
     SHOW PROFILES;
     
     -- For PostgreSQL
     EXPLAIN ANALYZE
     SELECT * FROM orders WHERE customer_id = 123;
     ```
  
  2. Understand execution plan:
     ```
     PostgreSQL EXPLAIN output analysis:
     - Sequential Scan: Full table scan (often bad for large tables)
     - Index Scan: Uses an index (generally good)
     - Bitmap Heap Scan + Bitmap Index Scan: Uses index to collect rows then fetches them
     - Cost estimates: Startup cost and total cost
     - Rows estimate: How many rows the planner expects
     - Actual time: Real execution time when using EXPLAIN ANALYZE
     ```
  
  3. Add appropriate indexes:
     ```sql
     -- Single column index
     CREATE INDEX idx_orders_customer ON orders(customer_id);
     
     -- Composite index (order matters for queries)
     CREATE INDEX idx_orders_customer_date ON orders(customer_id, order_date);
     
     -- Partial index (saves space)
     CREATE INDEX idx_orders_status ON orders(status) WHERE status = 'PENDING';
     
     -- Expression index
     CREATE INDEX idx_lower_email ON customers(lower(email));
     ```
  
  4. Rewrite problematic queries:
     - Replace subqueries with JOINs
     - Use EXISTS instead of IN for checking existence
     - Add proper WHERE clauses before GROUP BY
     - Use LIMIT for pagination
     - Consider materialized views for complex, frequently-run queries
     - Example: Replace correlated subquery with JOIN
       ```sql
       -- Inefficient
       SELECT p.product_name, 
         (SELECT AVG(oi.quantity) FROM order_items oi WHERE oi.product_id = p.id) as avg_quantity
       FROM products p;
       
       -- More efficient
       SELECT p.product_name, AVG(oi.quantity) as avg_quantity
       FROM products p
       LEFT JOIN order_items oi ON p.id = oi.product_id
       GROUP BY p.id, p.product_name;
       ```

- Avoiding N+1 query problems:
  * Problem definition: Making N additional queries after fetching N records
  * Solutions:
    1. Eager loading with joins:
       ```python
       # Django example - inefficient (causes N+1 queries)
       orders = Order.objects.all()
       for order in orders:
           # Each access triggers a separate query
           customer_name = order.customer.name
       
       # Efficient with eager loading
       orders = Order.objects.select_related('customer').all()
       for order in orders:
           # No additional query
           customer_name = order.customer.name
       ```
    
    2. Batch loading related entities:
       ```javascript
       // Node.js with Sequelize
       const orders = await Order.findAll();
       
       // Get all unique customer IDs
       const customerIds = [...new Set(orders.map(order => order.customerId))];
       
       // Fetch all needed customers in one query
       const customers = await Customer.findAll({
         where: { id: customerIds }
       });
       
       // Create lookup map
       const customerMap = customers.reduce((map, customer) => {
         map[customer.id] = customer;
         return map;
       }, {});
       
       // Use the loaded customers
       orders.forEach(order => {
         const customer = customerMap[order.customerId];
         console.log(`Order ${order.id} for customer ${customer.name}`);
       });
       ```

- Caching strategies in detail:
  * Cache-aside (Lazy Loading):
    ```python
    def get_product(product_id):
        # Try cache first
        cache_key = f"product:{product_id}"
        product = cache.get(cache_key)
        
        if product is not None:  # Cache hit
            return product
        
        # Cache miss - get from database
        product = db.query("SELECT * FROM products WHERE id = %s", product_id)
        
        # Store in cache for next time (with 15 min expiration)
        cache.set(cache_key, product, timeout=900)
        
        return product
    ```
  
  * Write-through:
    ```python
    def update_product(product_id, data):
        # Update database first
        db.query("UPDATE products SET name = %s, price = %s WHERE id = %s",
                data['name'], data['price'], product_id)
        
        # Then update cache
        cache_key = f"product:{product_id}"
        product = get_product(product_id)  # Get the updated product
        cache.set(cache_key, product, timeout=900)
        
        return product
    ```
  
  * Write-behind (Write-back):
    ```python
    # Updates are first stored in cache, then asynchronously written to DB
    def update_product_price(product_id, price):
        cache_key = f"product:{product_id}"
        
        # Get from cache or DB
        product = get_product(product_id)
        
        # Update in cache
        product['price'] = price
        product['updated_at'] = datetime.now().isoformat()
        product['is_dirty'] = True  # Mark as needing DB update
        cache.set(cache_key, product, timeout=3600)
        
        # Queue background task for DB update
        queue_db_update(product_id, {'price': price})
        
        return product
    ```
  
  * Cache invalidation:
    ```python
    def invalidate_product_caches(product_id=None, category_id=None):
        """Invalidate product caches based on product ID or category"""
        if product_id:
            # Direct product invalidation
            cache.delete(f"product:{product_id}")
            
        if category_id:
            # Pattern-based invalidation using Redis
            cache_keys = redis_client.keys(f"product-list:category:{category_id}:*")
            if cache_keys:
                redis_client.delete(*cache_keys)
            
            # Also invalidate category
            cache.delete(f"category:{category_id}")
        
        # Invalidate homepage product listing
        cache.delete("homepage:featured-products")
    ```
  
  * Cache eviction policies:
    - LRU (Least Recently Used): Discards least recently used items first
    - LFU (Least Frequently Used): Discards least frequently used items first
    - FIFO (First In First Out): Discards oldest items first
    - TTL (Time To Live): Expires items after a specified time
    
    Redis example:
    ```
    // Set cache with TTL
    SET session:12345 "{user: 'john'}" EX 3600
    
    // Set LRU policy in redis.conf
    maxmemory 100mb
    maxmemory-policy allkeys-lru
    ```

## DATABASE PERFORMANCE
- Connection pooling
- Query optimization:
  * Proper indexing
  * Avoiding N+1 query problems
  * Efficient joins
- Caching strategies:
  * Cache invalidation approaches
  * Write-through vs write-behind
  * Cache eviction policies
- Scaling approaches:
  * Vertical scaling (bigger servers)
  * Horizontal scaling (sharding)
  * Read replicas
  * Write/read splitting
- Backup and recovery strategies

===========================================
3. API DESIGN AND DEVELOPMENT
===========================================

## RESTFUL API DESIGN
- Resource-oriented design in practice:
  * Resource identification and naming:
    ```
    # Good URL design
    GET /api/users                # Get all users
    GET /api/users/123            # Get user with ID 123
    GET /api/users/123/orders     # Get orders for user 123
    POST /api/users               # Create new user
    PUT /api/users/123            # Replace user 123
    PATCH /api/users/123          # Partially update user 123
    DELETE /api/users/123         # Delete user 123
    
    # Poor URL design (avoid these patterns)
    GET /api/getUsers             # Uses verb in URL
    POST /api/createOrder         # Redundant verb
    GET /api/user?id=123          # Resource ID should be in path
    ```

  * Statelessness implementation:
    ```
    # Each request contains all necessary information
    GET /api/products/123
    Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
    
    # Server doesn't store client state between requests
    # Authentication/user info comes with each request
    # No server-side sessions needed
    ```

  * HATEOAS example (Hypermedia as the Engine of Application State):
    ```json
    {
      "id": "order-12345",
      "status": "shipped",
      "total": 199.99,
      "_links": {
        "self": { "href": "/api/orders/order-12345" },
        "customer": { "href": "/api/customers/cust-789" },
        "items": { "href": "/api/orders/order-12345/items" },
        "payment": { "href": "/api/payments/pay-456" },
        "cancel": { 
          "href": "/api/orders/order-12345/cancel",
          "method": "POST",
          "available": false
        },
        "return": { 
          "href": "/api/orders/order-12345/return",
          "method": "POST",
          "available": true
        }
      }
    }
    ```

- HTTP Status codes - comprehensive guide:
  * Success codes (2xx):
    ```
    200 OK - Standard success response
    201 Created - Resource successfully created
    202 Accepted - Request accepted for processing (async)
    204 No Content - Success with no body (e.g., DELETE)
    ```
  
  * Redirection codes (3xx):
    ```
    301 Moved Permanently - Resource URL changed permanently
    302 Found - Temporary redirect
    304 Not Modified - Client can use cached version
    ```
  
  * Client error codes (4xx):
    ```
    400 Bad Request - Malformed request syntax
    401 Unauthorized - Authentication required
    403 Forbidden - Authenticated but not authorized
    404 Not Found - Resource doesn't exist
    405 Method Not Allowed - HTTP method not supported
    409 Conflict - Request conflicts with resource state
    422 Unprocessable Entity - Validation errors
    429 Too Many Requests - Rate limit exceeded
    ```
  
  * Server error codes (5xx):
    ```
    500 Internal Server Error - General server error
    502 Bad Gateway - Invalid response from upstream
    503 Service Unavailable - Server temporarily unavailable
    504 Gateway Timeout - Upstream service timeout
    ```

- Pagination implementation patterns:
  * Offset-based pagination:
    ```
    Request: GET /api/products?limit=25&offset=50
    
    Response:
    {
      "data": [...],
      "pagination": {
        "total": 327,
        "limit": 25,
        "offset": 50,
        "next": "/api/products?limit=25&offset=75",
        "previous": "/api/products?limit=25&offset=25"
      }
    }
    ```
  
  * Cursor-based pagination:
    ```
    # Initial request
    Request: GET /api/products?limit=25
    
    Response:
    {
      "data": [...],
      "pagination": {
        "next_cursor": "WxYzAbC",  # Opaque cursor value
        "has_more": true
      }
    }
    
    # Next page request
    Request: GET /api/products?limit=25&cursor=WxYzAbC
    ```

- API versioning strategies:
  * URL path versioning:
    ```
    https://api.example.com/v1/products
    https://api.example.com/v2/products
    ```
  
  * Query parameter versioning:
    ```
    https://api.example.com/products?version=1
    https://api.example.com/products?version=2
    ```
  
  * Header-based versioning:
    ```
    GET /products
    Accept-Version: v2
    
    # or
    
    GET /products
    X-API-Version: 2.0
    ```
  
  * Content negotiation:
    ```
    GET /products
    Accept: application/vnd.company.v2+json
    ```

## GRAPHQL
- Schema definition language with examples:
  ```graphql
  # Scalar types
  scalar Date
  scalar Email
  
  # Object type definition
  type User {
    id: ID!
    name: String!
    email: Email!
    posts: [Post!]!
    role: UserRole!
    createdAt: Date!
  }
  
  # Enum type
  enum UserRole {
    ADMIN
    EDITOR
    VIEWER
  }
  
  # Interface
  interface Node {
    id: ID!
  }
  
  # Object implementing interface
  type Post implements Node {
    id: ID!
    title: String!
    content: String!
    author: User!
    tags: [String!]
    publishedAt: Date
  }
  
  # Input type for mutations
  input CreatePostInput {
    title: String!
    content: String!
    tags: [String!]
    publishNow: Boolean = false
  }
  
  # Query root type
  type Query {
    me: User
    user(id: ID!): User
    post(id: ID!): Post
    searchPosts(query: String!, limit: Int = 10): [Post!]!
  }
  
  # Mutation root type
  type Mutation {
    createPost(input: CreatePostInput!): Post!
    updatePost(id: ID!, input: CreatePostInput!): Post!
    deletePost(id: ID!): Boolean!
  }
  
  # Subscription root type
  type Subscription {
    newPost: Post!
  }
  ```

- Resolver implementation with DataLoader for N+1 prevention:
  ```javascript
  const { DataLoader } = require('dataloader');
  
  // Create DataLoader for efficient batch loading
  const createLoaders = (db) => ({
    // Loads users by ID in a single batch
    userById: new DataLoader(async (ids) => {
      console.log('Batch loading users:', ids);
      const users = await db.collection('users').find(
        { _id: { $in: ids } }
      ).toArray();
      
      // Return users in same order as requested IDs
      return ids.map(id => 
        users.find(user => user._id.toString() === id.toString()) || null
      );
    }),
    
    // Loads posts by author ID in batches
    postsByAuthorId: new DataLoader(async (authorIds) => {
      console.log('Batch loading posts for authors:', authorIds);
      const posts = await db.collection('posts').find(
        { authorId: { $in: authorIds } }
      ).toArray();
      
      // Group posts by author ID
      return authorIds.map(authorId => 
        posts.filter(post => post.authorId.toString() === authorId.toString())
      );
    })
  });
  
  // Resolver functions
  const resolvers = {
    Query: {
      me: (_, __, { user }) => {
        if (!user) throw new Error('Not authenticated');
        return user;
      },
      
      user: (_, { id }, { loaders }) => {
        return loaders.userById.load(id);
      },
      
      post: async (_, { id }, { db }) => {
        return db.collection('posts').findOne({ _id: id });
      }
    },
    
    User: {
      // This resolver uses DataLoader to efficiently load posts
      posts: (user, _, { loaders }) => {
        return loaders.postsByAuthorId.load(user._id);
      }
    },
    
    Post: {
      // Efficiently resolve author using DataLoader
      author: (post, _, { loaders }) => {
        return loaders.userById.load(post.authorId);
      }
    }
  };
  ```

## API SECURITY
- Authentication methods:
  * Basic authentication
  * API keys
  * JWT (structure, signing, validation)
  * OAuth 2.0 flows (authorization code, client credentials, etc.)
  * OpenID Connect
- Authorization strategies:
  * Role-based access control (RBAC)
  * Attribute-based access control (ABAC)
  * Scopes and permissions
- Common security measures:
  * HTTPS/TLS
  * CORS configuration
  * Rate limiting and throttling
  * Input validation
  * Content Security Policy
  * Security headers
- API gateway security features

===========================================
4. MICROSERVICES ARCHITECTURE
===========================================

## MICROSERVICES FUNDAMENTALS
- Core concepts:
  * Service boundaries and domain-driven design
  * Single responsibility principle
  * Independent deployability
  * Decentralized data management
- Communication patterns:
  * Synchronous: REST, gRPC
  * Asynchronous: Message queues, event streaming
- Service discovery mechanisms:
  * Client-side discovery
  * Server-side discovery
  * Service registry (Consul, etcd)
  * DNS-based discovery
- API gateway pattern:
  * Request routing
  * Authentication/authorization
  * Rate limiting
  * Response transformation
- Resiliency patterns:
  * Circuit breaker
  * Retry with exponential backoff
  * Bulkhead pattern
  * Timeout handling
  * Fallback mechanisms
- Distributed transactions:
  * Saga pattern
  * Two-phase commit
  * Eventual consistency approaches

## EVENT-DRIVEN ARCHITECTURE
- Event sourcing pattern implementation:
  ```java
  // Event class
  public abstract class Event {
      private final UUID eventId;
      private final UUID aggregateId;
      private final LocalDateTime timestamp;
      
      public Event(UUID aggregateId) {
          this.eventId = UUID.randomUUID();
          this.aggregateId = aggregateId;
          this.timestamp = LocalDateTime.now();
      }
      
      // Getters
  }
  
  // Concrete event
  public class OrderCreatedEvent extends Event {
      private final String customerName;
      private final List<OrderItem> items;
      private final BigDecimal totalAmount;
      
      public OrderCreatedEvent(UUID orderId, String customerName, 
                              List<OrderItem> items, BigDecimal totalAmount) {
          super(orderId);
          this.customerName = customerName;
          this.items = items;
          this.totalAmount = totalAmount;
      }
      
      // Getters
  }
  
  // Event store interface
  public interface EventStore {
      void saveEvent(Event event);
      List<Event> getEventsForAggregate(UUID aggregateId);
  }
  
  // Order aggregate
  public class Order {
      private UUID id;
      private String customerName;
      private List<OrderItem> items = new ArrayList<>();
      private BigDecimal totalAmount;
      private OrderStatus status;
      
      // Rebuild order state from events
      public static Order rebuild(List<Event> events) {
          if (events.isEmpty()) return null;
          
          Order order = new Order();
          
          // Apply all events in sequence
          for (Event event : events) {
              order.apply(event);
          }
          
          return order;
      }
      
      // Apply event to update state
      public void apply(Event event) {
          if (event instanceof OrderCreatedEvent) {
              OrderCreatedEvent e = (OrderCreatedEvent) event;
              this.id = e.getAggregateId();
              this.customerName = e.getCustomerName();
              this.items = e.getItems();
              this.totalAmount = e.getTotalAmount();
              this.status = OrderStatus.CREATED;
          } else if (event instanceof OrderShippedEvent) {
              this.status = OrderStatus.SHIPPED;
          } // Handle other event types
      }
  }
  ```

- Command Query Responsibility Segregation (CQRS):
  * Core concept: Separate read and write models
  * Command side (writes):
    ```java
    // Command model - handles write operations
    public class CreateOrderCommand {
        private final String customerName;
        private final List<OrderItemDto> items;
        
        // Constructor and getters
    }
    
    public class OrderCommandHandler {
        private final EventStore eventStore;
        
        public void handle(CreateOrderCommand command) {
            // Business logic for creating an order
            UUID orderId = UUID.randomUUID();
            List<OrderItem> orderItems = transformItems(command.getItems());
            BigDecimal total = calculateTotal(orderItems);
            
            // Create and store the event
            OrderCreatedEvent event = new OrderCreatedEvent(
                orderId, command.getCustomerName(), orderItems, total);
            eventStore.saveEvent(event);
        }
    }
    ```
    
  * Query side (reads):
    ```java
    // Read model - optimized for queries
    public class OrderSummaryDto {
        private UUID id;
        private String customerName;
        private OrderStatus status;
        private BigDecimal total;
        private LocalDateTime createdAt;
        
        // Constructor and getters
    }
    
    public class OrderQueryService {
        private final JdbcTemplate jdbcTemplate;
        
        // Query method using read-optimized database
        public List<OrderSummaryDto> findOrdersByCustomer(String customerName) {
            return jdbcTemplate.query(
                "SELECT id, customer_name, status, total, created_at " +
                "FROM order_summaries " +
                "WHERE customer_name = ?",
                new Object[]{ customerName },
                (rs, rowNum) -> new OrderSummaryDto(
                    UUID.fromString(rs.getString("id")),
                    rs.getString("customer_name"),
                    OrderStatus.valueOf(rs.getString("status")),
                    rs.getBigDecimal("total"),
                    rs.getTimestamp("created_at").toLocalDateTime()
                )
            );
        }
    }
    ```
    
  * Event handler for sync:
    ```java
    // Event handler updates read models when events occur
    public class OrderEventHandler {
        private final JdbcTemplate jdbcTemplate;
        
        public void handleOrderCreatedEvent(OrderCreatedEvent event) {
            // Update the read model database
            jdbcTemplate.update(
                "INSERT INTO order_summaries (id, customer_name, status, total, created_at) " +
                "VALUES (?, ?, ?, ?, ?)",
                event.getAggregateId().toString(),
                event.getCustomerName(),
                "CREATED",
                event.getTotalAmount(),
                event.getTimestamp()
            );
        }
    }
    ```
  
  * Benefits of CQRS:
    - Optimized data models for reads and writes
    - Improved scalability (can scale each side independently)
    - Better performance for complex domain operations
    - Supports multiple read model representations

- Message queues in detail (RabbitMQ):
  * Exchange types:
    - Direct: Route messages based on exact routing keys
    ```
    [Producer] --> [Direct Exchange] --> (routing key = "order.created") --> [Order Processing Queue]
                                      --> (routing key = "payment.success") --> [Payment Queue]
    ```
    
    - Topic: Route based on pattern matching with wildcards
    ```
    [Producer] --> [Topic Exchange] --> (routing key = "order.*.created") --> [New Orders Queue]
                                     --> (routing key = "*.payment.*") --> [Payment Events Queue]
                                     --> (routing key = "#.error") --> [Error Queue]
    
    # Wildcards:
    # * - matches exactly one word
    # # - matches zero or more words
    ```
    
    - Fanout: Broadcasts messages to all bound queues
    ```
    [Producer] --> [Fanout Exchange] --> [Queue 1]
                                      --> [Queue 2]
                                      --> [Queue 3]
    ```
    
    - Headers: Route based on message headers instead of routing key
    ```
    [Producer] --> [Headers Exchange] --> (headers: {format:"pdf", type:"report"}) --> [PDF Reports Queue]
                                       --> (headers: {format:"json", type:"log"}) --> [JSON Logs Queue]
    ```
  
  * Queue properties:
    - Durability: Queues survive broker restart
    - Exclusivity: Used by only one connection
    - Auto-delete: Removed when consumer disconnects
    - Arguments: TTL, max length, etc.
    ```javascript
    channel.assertQueue('orders', { 
        durable: true,           // Survive broker restart
        exclusive: false,        // Multiple connections allowed
        autoDelete: false,       // Don't delete when consumers disconnect
        arguments: {
            'x-message-ttl': 60000,      // Messages expire after 1 minute
            'x-max-length': 1000,        // Maximum 1000 messages
            'x-dead-letter-exchange': 'dead-letter',  // Send expired messages here
            'x-dead-letter-routing-key': 'expired'
        }
    });
    ```

## SERVICE MESH
- Core functionality:
  * Service-to-service communication
  * Traffic management
  * Security
  * Observability
- Control plane vs data plane
- Popular implementations:
  * Istio: Architecture, traffic management, security features
  * Linkerd: Lightweight approach, service profiles
  * Consul Connect: Service mesh capabilities
- Features:
  * Circuit breaking
  * Retry policies
  * Traffic splitting for canary deployments
  * mTLS implementation
  * Distributed tracing integration

## MICROSERVICES ARCHITECTURE
- Service decomposition strategies:
  * Domain-driven design approach:
    ```
    E-commerce platform decomposed by domains:
    
    1. User Service:
       - Core domain: User management, authentication, profiles
       - Bounded context: User information, credentials, preferences
       - Subdomain: User search, notifications preferences
       
    2. Product Catalog Service:
       - Core domain: Product information, categorization, search
       - Bounded context: Product details, inventory counts, pricing
       - Subdomain: Product recommendations, trending items
       
    3. Order Service:
       - Core domain: Order processing, history
       - Bounded context: Order lifecycle from creation to fulfillment
       - Subdomain: Order tracking, returns processing
       
    4. Payment Service:
       - Core domain: Payment processing, refunds
       - Bounded context: Payment methods, transaction history
       - Subdomain: Fraud detection, currency conversion
       
    5. Shipping Service:
       - Core domain: Shipping management, carrier integration
       - Bounded context: Shipping methods, rates, tracking
       - Subdomain: Delivery estimates, address validation
```

===========================================
5. CLOUD PLATFORMS
===========================================

## AWS (AMAZON WEB SERVICES)
- Compute services:
  * EC2: Instance types, AMIs, security groups, placement groups
  * ECS/EKS: Container orchestration
  * Lambda: Serverless functions, triggers, limitations
- Storage:
  * S3: Buckets, storage classes, lifecycle policies, static website hosting
  * EBS: Volume types, snapshots
  * EFS: Use cases and performance considerations
- Database services:
  * RDS: Supported engines, read replicas, Multi-AZ
  * DynamoDB: Tables, indexes, throughput capacity
  * ElastiCache: Redis vs Memcached options
- Networking:
  * VPC: Subnets, route tables, NACLs, security groups
  * Route 53: Record types, routing policies
  * CloudFront: Caching, edge locations, Lambda@Edge
- Messaging:
  * SQS: Standard vs FIFO queues
  * SNS: Topics, subscriptions, fanout pattern
  * EventBridge: Event buses, rules, targets
- Security:
  * IAM: Users, groups, roles, policies
  * KMS: Key management, envelope encryption
  * Secrets Manager: Secret rotation
- Deployment services:
  * CloudFormation: Templates, stacks, changesets
  * Elastic Beanstalk: Environments, configuration
  * CodePipeline, CodeBuild, CodeDeploy

## GOOGLE CLOUD PLATFORM (GCP)
- Compute services:
  * Compute Engine: VMs, instance groups
  * GKE: Kubernetes clusters, auto-scaling
  * Cloud Functions: Event-driven serverless functions
  * Cloud Run: Containerized applications
- Storage:
  * Cloud Storage: Buckets, storage classes
  * Persistent Disk: Standard vs SSD
  * Filestore: Managed file storage
- Database services:
  * Cloud SQL: Managed MySQL, PostgreSQL, SQL Server
  * Firestore/Datastore: NoSQL document database
  * Bigtable: Wide-column NoSQL database
  * Spanner: Globally distributed relational database
- Networking:
  * VPC: Subnets, firewall rules
  * Cloud DNS: Managed DNS service
  * Cloud CDN: Content delivery network
- Big data services:
  * BigQuery: Serverless data warehouse
  * Dataflow: Stream and batch processing
  * Pub/Sub: Messaging service

## MICROSOFT AZURE
- Compute services:
  * Virtual Machines: Sizes, availability sets
  * AKS: Managed Kubernetes
  * App Service: PaaS for web applications
  * Azure Functions: Serverless compute
- Storage:
  * Blob Storage: Block, page, and append blobs
  * Disk Storage: Managed disks
  * Files: SMB file shares
- Database services:
  * Azure SQL Database: Managed SQL Server
  * Cosmos DB: Multi-model database
  * Azure Cache for Redis
- Networking:
  * Virtual Network: Subnets, NSGs
  * Application Gateway: Web traffic load balancer
  * Azure CDN: Content delivery network
- Identity:
  * Azure Active Directory: Users, groups, applications
  * Managed Identities: Service authentication

## SERVERLESS ARCHITECTURE
- Core concepts:
  * Function as a Service (FaaS)
  * Backend as a Service (BaaS)
  * Event-driven execution
- Characteristics:
  * No server management
  * Pay-per-execution pricing
  * Auto-scaling capabilities
  * Statelessness constraints
- Challenges:
  * Cold start latency
  * Execution time limits
  * Vendor lock-in concerns
  * State management
- Design patterns:
  * Function composition
  * Fan-out pattern
  * Orchestration vs choreography
- Specific implementations:
  * AWS Lambda: Triggers, layers, step functions
  * Azure Functions: Bindings, durable functions
  * Google Cloud Functions: Triggers, deployments

===========================================
6. DEVOPS AND CI/CD
===========================================

## CONTINUOUS INTEGRATION/CONTINUOUS DEPLOYMENT
- CI fundamentals:
  * Automated builds
  * Unit and integration testing
  * Static code analysis
  * Code coverage reporting
- CD fundamentals:
  * Automated deployment pipelines
  * Environment promotion
  * Rollback mechanisms
- Deployment strategies:
  * Blue-green deployment
  * Canary releases
  * Rolling updates
  * Feature flags/toggles
- Common tools:
  * Jenkins: Pipelines, agents, shared libraries
  * GitHub Actions: Workflows, actions, secrets
  * GitLab CI: .gitlab-ci.yml, runners
  * CircleCI: Orbs, workflows
  * ArgoCD: GitOps for Kubernetes

## CONTAINERIZATION AND ORCHESTRATION
- Docker:
  * Dockerfile best practices
  * Multi-stage builds
  * Image layers and caching
  * Container networking
  * Volumes and persistence
  * Docker Compose for local development
- Kubernetes:
  * Architecture: Control plane and nodes
  * Workload resources: Pods, Deployments, StatefulSets, DaemonSets
  * Services and ingress
  * ConfigMaps and Secrets
  * Persistent volumes
  * RBAC (Role-Based Access Control)
  * Custom Resource Definitions (CRDs)
  * Helm for package management
- Container registries:
  * Docker Hub, ECR, GCR, ACR
  * Image scanning and security
  * Image versioning strategies

## INFRASTRUCTURE AS CODE (IAC)
- Declarative vs imperative approaches
- Tools and their specialties:
  * Terraform: HCL syntax, providers, state management
  * AWS CloudFormation: Templates, stacks, drift detection
  * Azure Resource Manager: Resource groups, templates
  * Pulumi: Using programming languages (Python, TypeScript)
- Key concepts:
  * Idempotency
  * State management
  * Drift detection and remediation
  * Immutable infrastructure
- Best practices:
  * Modularization
  * Version control integration
  * Environment-specific configurations
  * Secrets management

===========================================
7. SYSTEM DESIGN FUNDAMENTALS
===========================================

## SCALABILITY
- Scaling strategies:
  * Vertical scaling (scale up)
  * Horizontal scaling (scale out)
  * Autoscaling policies
- Stateless design principles
- Caching strategies:
  * Application caching
  * Database query caching
  * Object caching
  * CDN for static assets
  * Cache invalidation strategies
- Database scalability:
  * Read replicas
  * Sharding approaches: vertical, horizontal, directory-based
  * Connection pooling
  * Query optimization
- Load balancing:
  * Algorithms: round-robin, least connections, IP hash
  * Layer 4 vs Layer 7 load balancing
  * Health checks and circuit breaking
  * Session persistence options

## AVAILABILITY AND RELIABILITY
- High availability concepts:
  * Redundancy (N+1, 2N)
  * Eliminating single points of failure
  * Multi-AZ and multi-region deployments
- Disaster recovery:
  * Recovery Point Objective (RPO)
  * Recovery Time Objective (RTO)
  * Backup strategies
  * Failover mechanisms
- Service level terminology:
  * SLA (Service Level Agreement)
  * SLO (Service Level Objective)
  * SLI (Service Level Indicator)
- Monitoring and observability:
  * Key metrics: latency, traffic, errors, saturation
  * Log aggregation and analysis
  * Distributed tracing
  * Alerting strategies
- Graceful degradation:
  * Circuit breaker pattern
  * Fallback mechanisms
  * Throttling and rate limiting

## DISTRIBUTED SYSTEMS
- CAP theorem in depth:
  * Consistency vs Availability tradeoffs
  * Partition tolerance requirements
- Consistency patterns:
  * Strong consistency
  * Eventual consistency
  * Causal consistency
  * Read-after-write consistency
- Consensus algorithms:
  * Paxos fundamentals
  * Raft overview
  * Practical implementations (etcd, ZooKeeper)
- Distributed transactions:
  * Two-phase commit protocol
  * Saga pattern implementation
  * Outbox pattern
- Failure detection:
  * Heartbeats
  * Phi-accrual detector
  * Gossip protocols
- Clock synchronization:
  * Logical clocks
  * Vector clocks
  * NTP limitations

===========================================
8. SECURITY BEST PRACTICES
===========================================

## APPLICATION SECURITY
- OWASP Top 10 vulnerabilities in detail:
  * Injection attacks (SQL, NoSQL, OS command)
  * Broken authentication
  * Sensitive data exposure
  * XML External Entities (XXE)
  * Broken access control
  * Security misconfiguration
  * Cross-Site Scripting (XSS)
  * Insecure deserialization
  * Using components with known vulnerabilities
  * Insufficient logging and monitoring
- Authentication mechanisms:
  * Password storage:
    ```python
    # Using bcrypt for secure password hashing
    import bcrypt
    
    def hash_password(password):
        # Generate a salt and hash the password
        salt = bcrypt.gensalt(rounds=12)  # Higher rounds = more secure but slower
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    def verify_password(stored_hash, provided_password):
        # Check if the provided password matches the stored hash
        return bcrypt.checkpw(
            provided_password.encode('utf-8'),
            stored_hash.encode('utf-8')
        )
    
    # Usage
    user_password = "SecureP@ssw0rd!"
    stored_hash = hash_password(user_password)
    
    # Later, when verifying login
    is_valid = verify_password(stored_hash, "SecureP@ssw0rd!")  # True
    ```
  
  * Multi-factor authentication implementation:
    ```python
    # Using TOTP (Time-based One-Time Password) for 2FA
    import pyotp
    import qrcode
    from io import BytesIO
    
    def setup_2fa(user_id):
        # Generate a secret key for the user
        secret = pyotp.random_base32()
        
        # Save this secret to the user's profile in the database
        # db.update_user(user_id, {"mfa_secret": secret})
        
        # Generate a provisioning URI for QR code
        totp = pyotp.TOTP(secret)
        uri = totp.provisioning_uri(
            name=f"user@example.com",
            issuer_name="YourApp"
        )
        
        # Generate QR code
        img = qrcode.make(uri)
        buffer = BytesIO()
        img.save(buffer)
        
        return {"secret": secret, "qr_code": buffer.getvalue()}
    
    def verify_2fa(user_id, code):
        # Get user's secret from the database
        # secret = db.get_user(user_id).get("mfa_secret")
        secret = "BASE32SECRET"  # For example
        
        # Create TOTP object
        totp = pyotp.TOTP(secret)
        
        # Verify the code
        return totp.verify(code)
    ```
  
  * JWT implementation:
    ```python
    # Using PyJWT for JWT authentication
    import jwt
    import datetime
    
    # Secret key should be stored securely
    JWT_SECRET = "your-secret-key"
    JWT_ALGORITHM = "HS256"
    
    def generate_token(user_id, role):
        # Set expiration time (e.g., 1 hour from now)
        expiration = datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        
        # Create the payload
        payload = {
            "sub": user_id,
            "role": role,
            "exp": expiration,
            "iat": datetime.datetime.utcnow()
        }
        
        # Generate the token
        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        return token
    
    def verify_token(token):
        try:
            # Decode and verify the token
            payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            # Token has expired
            return None
        except jwt.InvalidTokenError:
            # Invalid token
            return None
    ```

## DATA PROTECTION
- Encryption:
  * Symmetric encryption example:
    ```python
    # Using AES for symmetric encryption
    from cryptography.fernet import Fernet
    
    def generate_key():
        # Generate a key for encryption and decryption
        return Fernet.generate_key()
    
    def encrypt_data(data, key):
        # Convert string to bytes if needed
        if isinstance(data, str):
            data = data.encode()
            
        cipher = Fernet(key)
        encrypted = cipher.encrypt(data)
        return encrypted
    
    def decrypt_data(encrypted_data, key):
        cipher = Fernet(key)
        decrypted = cipher.decrypt(encrypted_data)
        return decrypted
    
    # Usage
    key = generate_key()
    sensitive_data = "My credit card number is 1234-5678-9012-3456"
    
    # Encrypt before storing
    encrypted = encrypt_data(sensitive_data, key)
    
    # Later, decrypt when needed
    decrypted = decrypt_data(encrypted, key)
    decrypted_text = decrypted.decode()  # Convert bytes to string
    ```
  
  * TLS implementation with Flask:
    ```python
    from flask import Flask
    
    app = Flask(__name__)
    
    @app.route('/')
    def index():
        return "This is a secure endpoint!"
    
    if __name__ == '__main__':
        # Run with SSL/TLS
        app.run(
            host='0.0.0.0', 
            port=443,
            ssl_context=(
                'path/to/certificate.pem',  # Certificate file
                'path/to/private_key.pem'   # Private key file
            )
        )
    ```

===========================================
9. PERFORMANCE OPTIMIZATION
===========================================

## BACKEND PERFORMANCE
- Profiling techniques:
  * CPU profiling
  * Memory profiling
  * I/O bottleneck identification
  * Flame graphs interpretation
- Memory management:
  * Memory leaks detection
  * Garbage collection tuning
  * Object pooling
  * Right-sizing memory allocations
- Database optimization:
  * Index optimization example in PostgreSQL:
    ```sql
    -- Examining query performance
    EXPLAIN ANALYZE
    SELECT * FROM orders
    WHERE customer_id = 123
    AND order_date > '2023-01-01';
    
    -- Creating an index to speed up this query
    CREATE INDEX idx_orders_customer_date
    ON orders (customer_id, order_date);
    
    -- Check the improved performance
    EXPLAIN ANALYZE
    SELECT * FROM orders
    WHERE customer_id = 123
    AND order_date > '2023-01-01';
    ```
  
  * Query refactoring:
    Original query (slow):
    ```sql
    -- Inefficient query with subquery
    SELECT o.order_id, o.order_date, c.name
    FROM orders o
    WHERE o.customer_id IN (
        SELECT customer_id 
        FROM customers 
        WHERE region = 'East'
    )
    AND o.total > 100;
    ```
    
    Refactored query (faster):
    ```sql
    -- More efficient with JOIN
    SELECT o.order_id, o.order_date, c.name
    FROM orders o
    JOIN customers c ON o.customer_id = c.customer_id
    WHERE c.region = 'East'
    AND o.total > 100;
    ```

- Caching implementation:
  * Redis caching in Python:
    ```python
    import redis
    import json
    
    # Connect to Redis
    redis_client = redis.Redis(host='localhost', port=6379, db=0)
    
    def get_product(product_id):
        # Try to get from cache first
        cache_key = f"product:{product_id}"
        cached_product = redis_client.get(cache_key)
        
        if cached_product:
            # Cache hit - decode and return
            return json.loads(cached_product)
        
        # Cache miss - fetch from database
        product = fetch_product_from_db(product_id)  # Function to query DB
        
        # Store in cache for future requests (expire in 1 hour)
        redis_client.setex(
            cache_key, 
            3600,  # 1 hour in seconds
            json.dumps(product)
        )
        
        return product
    
    def invalidate_product_cache(product_id):
        # When product is updated, invalidate its cache
        cache_key = f"product:{product_id}"
        redis_client.delete(cache_key)
    ```

===========================================
10. DATA STRUCTURES AND ALGORITHMS
===========================================

## CORE DATA STRUCTURES
- Arrays and strings:
  * Dynamic arrays
  * String manipulation techniques
  * String search algorithms
- Linked lists:
  * Singly and doubly linked
  * Operations and complexities
  * Common problems (cycle detection, reversal)
- Stacks and queues:
  * Implementation approaches
  * Application scenarios
  * Variations (priority queue, double-ended queue)
- Hash tables:
  * Hash functions
  * Collision resolution (chaining, open addressing)
  * Load factor and rehashing
  * Applications (caching, de-duplication)
  * Custom hash table implementation:
    ```python
    class HashTable:
        def __init__(self, size=10):
            self.size = size
            self.table = [[] for _ in range(self.size)]
        
        def _hash_function(self, key):
            # Simple hash function
            return hash(key) % self.size
        
        def insert(self, key, value):
            # Get the index from the hash function
            index = self._hash_function(key)
            
            # Check if key exists and update its value
            for i, (k, v) in enumerate(self.table[index]):
                if k == key:
                    self.table[index][i] = (key, value)
                    return
            
            # Key doesn't exist, add it to the bucket
            self.table[index].append((key, value))
        
        def get(self, key):
            # Get the index from the hash function
            index = self._hash_function(key)
            
            # Search for key in the bucket
            for k, v in self.table[index]:
                if k == key:
                    return v
            
            # Key not found
            raise KeyError(key)
        
        def delete(self, key):
            # Get the index from the hash function
            index = self._hash_function(key)
            
            # Search for key in the bucket and remove it
            for i, (k, v) in enumerate(self.table[index]):
                if k == key:
                    del self.table[index][i]
                    return
            
            # Key not found
            raise KeyError(key)
    
    # Usage
    ht = HashTable(size=5)
    ht.insert("name", "John")
    ht.insert("age", 30)
    print(ht.get("name"))  # "John"
    ht.delete("name")
    ```
- Trees:
  * Binary trees, binary search trees
  * AVL and Red-Black trees for self-balancing
  * B-trees and B+ trees for databases
  * Tries for prefix matching
  * Segment trees and Fenwick trees
- Heaps:
  * Min-heap and max-heap
  * Heap operations
  * Heapify process
  * Applications (priority scheduling, top-k problems)
- Graphs:
  * Representation (adjacency matrix, adjacency list)
  * Properties and types
  * Traversal algorithms
  * Applications (social networks, routing)

## COMMON ALGORITHMS
- Searching:
  * Binary search
  * Breadth-first search (BFS)
  * Depth-first search (DFS)
  * A* search algorithm
- Sorting:
  * Comparison-based: QuickSort, MergeSort, HeapSort
  * Non-comparison: Counting Sort, Radix Sort, Bucket Sort
  * Stability in sorting algorithms
  * In-place vs out-of-place sorting
- Dynamic programming:
  * Memoization technique
  * Tabulation approach
  * Common patterns (0/1 Knapsack, LCS, LIS)
  * State definition and transitions
  * Fibonacci using memoization:
    ```python
    def fibonacci_memo(n, memo={}):
        # Base cases
        if n <= 0:
            return 0
        if n == 1:
            return 1
        
        # Check if already calculated
        if n in memo:
            return memo[n]
        
        # Calculate and store in memo
        memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
        return memo[n]
    
    # Usage
    for i in range(10):
        print(f"Fibonacci({i}) = {fibonacci_memo(i)}")
    ```
  
  * 0/1 Knapsack problem:
    ```python
    def knapsack(weights, values, capacity):
        n = len(values)
        # Create 2D array for DP
        dp = [[0 for _ in range(capacity + 1)] for _ in range(n + 1)]
        
        # Build table dp[][] in bottom-up manner
        for i in range(1, n + 1):
            for w in range(1, capacity + 1):
                if weights[i-1] <= w:
                    # Include or exclude current item
                    dp[i][w] = max(
                        values[i-1] + dp[i-1][w-weights[i-1]],  # Include
                        dp[i-1][w]  # Exclude
                    )
                else:
                    # Can't include, weight exceeds capacity
                    dp[i][w] = dp[i-1][w]
        
        return dp[n][capacity]
    
    # Test with example
    values = [60, 100, 120]
    weights = [10, 20, 30]
    capacity = 50
    
    max_value = knapsack(weights, values, capacity)
    print(f"Maximum value: {max_value}")  # 220
    ```

## ALGORITHM ANALYSIS
- Big O notation:
  * Time complexity analysis
  * Space complexity analysis
  * Best, average, and worst case
  * Amortized analysis
- Common complexity classes:
  * Constant: O(1)
  * Logarithmic: O(log n)
  * Linear: O(n)
  * Linearithmic: O(n log n)
  * Quadratic: O(n²)
  * Exponential: O(2ⁿ)
  * Factorial: O(n!)
- Space-time tradeoffs:
  * When to prioritize time over space
  * Memory-efficient algorithms
  * Cache-friendly algorithms
  * Trade space for time example:
    ```python
    # O(n^2) time, O(1) space approach
    def two_sum_brute_force(nums, target):
        for i in range(len(nums)):
            for j in range(i+1, len(nums)):
                if nums[i] + nums[j] == target:
                    return [i, j]
        return None
    
    # O(n) time, O(n) space approach - trading space for time
    def two_sum_hash_table(nums, target):
        # Store values we've seen so far
        seen = {}
        
        for i, num in enumerate(nums):
            complement = target - num
            
            # Check if complement exists in seen
            if complement in seen:
                return [seen[complement], i]
            
            # Store current number
            seen[num] = i
        
        return None
    ```
- Recurrence relations:
  * Master theorem
  * Substitution method
  * Recursion tree method

===========================================
11. CODING BEST PRACTICES
===========================================

## CLEAN CODE PRINCIPLES
- Naming conventions:
  * Meaningful and intention-revealing names
  * Consistency in naming patterns
  * Appropriate length and specificity
- Function design:
  * Single Responsibility Principle
  * Small, focused functions
  * Limiting parameters
  * Function composition
- Code organization:
  * Appropriate modularity
  * Package/module structure
  * Separation of concerns
  * Cohesion and coupling considerations
- Error handling:
  * Exceptions vs error codes
  * Proper exception hierarchy
  * Fail fast principle
  * Defensive programming
- SOLID principles in depth:
  * Single Responsibility Principle example:
    ```java
    // BAD: Class does too many things
    public class UserManager {
        public void register(String username, String password) {
            // Hash password, validate input, etc.
        }
        
        public void sendEmail(String to, String subject, String body) {
            // Configure SMTP, format email, etc.
        }
        
        public void saveToDatabase(User user) {
            // Connect to database, execute query, etc.
        }
    }
    
    // GOOD: Classes with single responsibilities
    public class UserRegistrationService {
        private PasswordService passwordService;
        private UserRepository userRepository;
        private EmailService emailService;
        
        public UserRegistrationService(
            PasswordService passwordService,
            UserRepository userRepository,
            EmailService emailService
        ) {
            this.passwordService = passwordService;
            this.userRepository = userRepository;
            this.emailService = emailService;
        }
        
        public void registerUser(String username, String password) {
            String hashedPassword = passwordService.hashPassword(password);
            User user = new User(username, hashedPassword);
            userRepository.save(user);
            emailService.sendWelcomeEmail(username);
        }
    }
    ```
  
  * Open/Closed Principle example:
    ```java
    // BAD: Need to modify class to add new shapes
    public class AreaCalculator {
        public double calculateArea(Object shape) {
            if (shape instanceof Rectangle) {
                Rectangle rectangle = (Rectangle) shape;
                return rectangle.getWidth() * rectangle.getHeight();
            } 
            else if (shape instanceof Circle) {
                Circle circle = (Circle) shape;
                return Math.PI * circle.getRadius() * circle.getRadius();
            }
            throw new IllegalArgumentException("Unsupported shape");
        }
    }
    
    // GOOD: Open for extension, closed for modification
    public interface Shape {
        double calculateArea();
    }
    
    public class Rectangle implements Shape {
        private double width;
        private double height;
        
        // Constructor and getters
        
        @Override
        public double calculateArea() {
            return width * height;
        }
    }
    
    public class Circle implements Shape {
        private double radius;
        
        // Constructor and getter
        
        @Override
        public double calculateArea() {
            return Math.PI * radius * radius;
        }
    }
    
    // Now we can add new shapes without modifying existing code
    ```
- Comments and documentation:
  * Self-documenting code
  * When comments are necessary
  * API documentation best practices
  * Code examples in documentation

## TESTING STRATEGIES
- Unit testing:
  * Test-driven development (TDD) workflow
  * Test structure (Arrange-Act-Assert)
  * Mocking and stubbing
  * Test coverage metrics
  * Python unit test example with pytest:
    ```python
    # calculator.py
    class Calculator:
        def add(self, a, b):
            return a + b
        
        def divide(self, a, b):
            if b == 0:
                raise ValueError("Cannot divide by zero")
            return a / b
    
    # test_calculator.py
    import pytest
    from calculator import Calculator
    
    class TestCalculator:
        def setup_method(self):
            self.calc = Calculator()
        
        def test_add(self):
            # Arrange
            a, b = 2, 3
            expected = 5
            
            # Act
            result = self.calc.add(a, b)
            
            # Assert
            assert result == expected
        
        def test_divide(self):
            assert self.calc.divide(10, 2) == 5.0
        
        def test_divide_by_zero(self):
            # Test that exception is raised
            with pytest.raises(ValueError, match="Cannot divide by zero"):
                self.calc.divide(10, 0)
    
    # Run tests with: pytest test_calculator.py -v
    ```
  
  * Mocking example:
    ```python
    # service.py
    import requests
    
    class UserService:
        def __init__(self, api_url):
            self.api_url = api_url
        
        def get_user(self, user_id):
            response = requests.get(f"{self.api_url}/users/{user_id}")
            if response.status_code == 200:
                return response.json()
            return None
    
    # test_service.py
    import pytest
    from unittest import mock
    from service import UserService
    
    class TestUserService:
        def setup_method(self):
            self.service = UserService("https://api.example.com")
        
        def test_get_user_success(self, monkeypatch):
            # Mock response
            mock_response = mock.Mock()
            mock_response.status_code = 200
            mock_response.json.return_value = {"id": 123, "name": "Test User"}
            
            # Mock requests.get to return our mock_response
            monkeypatch.setattr(
                'requests.get',
                mock.Mock(return_value=mock_response)
            )
            
            # Call the method
            result = self.service.get_user(123)
            
            # Assert
            assert result == {"id": 123, "name": "Test User"}
    ```
- Integration testing:
  * Component integration tests
  * API contract testing
  * Database integration testing
  * Test containers for dependencies
- End-to-end testing:
  * Browser automation
  * API sequence testing
  * User journey validation
- Testing pyramid:
  * Balancing test types
  * ROI of different test levels
  * Fast feedback loops
- Property-based testing:
  * Generating test cases
  * Invariants and properties
  * Tools like QuickCheck, Hypothesis
- Performance testing:
  * Load testing
  * Stress testing
  * Endurance testing
  * Benchmarking

## VERSION CONTROL AND COLLABORATION
- Git fundamentals:
  * Distributed nature of Git
  * Commits, branches, and tags
  * Merging vs rebasing
  * Interactive rebase
  * Cherry-picking
- Branching strategies:
  * GitFlow
  * GitHub Flow
  * Trunk-based development
  * Feature flags with trunk-based development
- Pull request workflow:
  * PR description best practices
  * Review processes
  * Approval policies
  * Automated checks
- Code review best practices:
  * What to look for in reviews
  * Constructive feedback
  * Addressing technical debt
  * Review efficiency
- Semantic versioning:
  * Major, minor, patch meaning
  * Pre-release and build metadata
  * Version constraints in dependencies
- Documentation:
  * README best practices
  * API documentation
  * Architecture decision records (ADRs)
  * Change logs

===========================================
12. FINTECH DOMAIN KNOWLEDGE
===========================================

## BANKING AND FINANCIAL SYSTEMS
- Core banking systems:
  * Account management
  * Ledger systems
  * Transaction processing
  * Batch processing
  * Account management database schema:
    ```sql
    -- Simplified account management schema
    
    CREATE TABLE customers (
        customer_id SERIAL PRIMARY KEY,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        date_of_birth DATE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20),
        address TEXT,
        kyc_status ENUM('PENDING', 'VERIFIED', 'REJECTED') DEFAULT 'PENDING',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE accounts (
        account_id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers(customer_id),
        account_number VARCHAR(20) UNIQUE NOT NULL,
        account_type ENUM('CHECKING', 'SAVINGS', 'CREDIT', 'LOAN'),
        balance DECIMAL(15, 2) DEFAULT 0.00,
        currency CHAR(3) DEFAULT 'USD',
        status ENUM('ACTIVE', 'SUSPENDED', 'CLOSED') DEFAULT 'ACTIVE',
        interest_rate DECIMAL(5, 2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    
    CREATE TABLE transactions (
        transaction_id SERIAL PRIMARY KEY,
        account_id INT REFERENCES accounts(account_id),
        transaction_type ENUM('DEPOSIT', 'WITHDRAWAL', 'TRANSFER', 'PAYMENT'),
        amount DECIMAL(15, 2) NOT NULL,
        balance_after DECIMAL(15, 2) NOT NULL,
        description VARCHAR(255),
        reference_id VARCHAR(50),
        status ENUM('PENDING', 'COMPLETED', 'FAILED', 'REVERSED'),
        transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```
  
  * Transaction processing example:
    ```python
    def transfer_funds(from_account_id, to_account_id, amount, description):
        """
        Transfer funds between accounts with transaction safety
        """
        try:
            # Start transaction
            db.begin_transaction()
            
            # Check if source account exists and has sufficient funds
            from_account = db.get_account(from_account_id)
            if not from_account:
                raise ValueError("Source account not found")
            
            if from_account['balance'] < amount:
                raise ValueError("Insufficient funds")
            
            # Check if destination account exists
            to_account = db.get_account(to_account_id)
            if not to_account:
                raise ValueError("Destination account not found")
            
            # Update source account
            new_from_balance = from_account['balance'] - amount
            db.update_account_balance(from_account_id, new_from_balance)
            
            # Create withdrawal transaction record
            db.create_transaction(
                account_id=from_account_id,
                transaction_type="TRANSFER_OUT",
                amount=-amount,
                balance_after=new_from_balance,
                description=description,
                reference_id=generate_reference_id(),
                status="COMPLETED"
            )
            
            # Update destination account
            new_to_balance = to_account['balance'] + amount
            db.update_account_balance(to_account_id, new_to_balance)
            
            # Create deposit transaction record
            db.create_transaction(
                account_id=to_account_id,
                transaction_type="TRANSFER_IN",
                amount=amount,
                balance_after=new_to_balance,
                description=description,
                reference_id=generate_reference_id(),
                status="COMPLETED"
            )
            
            # Commit transaction
            db.commit()
            
            return {
                "status": "success",
                "message": "Transfer completed successfully",
                "from_account": from_account_id,
                "to_account": to_account_id,
                "amount": amount
            }
            
        except Exception as e:
            # Rollback in case of error
            db.rollback()
            return {
                "status": "failed",
                "message": str(e)
            }
    ```

- Payment processing:
  * Payment networks (Visa, Mastercard, ACH)
  * Payment types (credit, debit, wire transfer)
  * Payment gateways and processors
  * Settlement processes
  * Integration with payment gateway (Stripe):
    ```python
    import stripe
    
    # Set API key securely (should be in environment variables)
    stripe.api_key = "sk_test_your_stripe_key"
    
    def create_payment(amount, currency, payment_method_id, customer_id):
        try:
            # Create a payment intent
            intent = stripe.PaymentIntent.create(
                amount=int(amount * 100),  # Convert to cents
                currency=currency,
                payment_method=payment_method_id,
                customer=customer_id,
                confirmation_method="manual",
                confirm=True,
                return_url="https://yourapp.com/payment/success"
            )
            
            # Handle the response based on status
            if intent.status == "succeeded":
                # Payment successful
                return {
                    "status": "success",
                    "payment_id": intent.id,
                    "amount": amount,
                    "currency": currency
                }
            elif intent.status == "requires_action":
                # 3D Secure authentication needed
                return {
                    "status": "requires_action",
                    "client_secret": intent.client_secret
                }
            else:
                # Other status
                return {
                    "status": "failed",
                    "reason": f"Unexpected payment status: {intent.status}"
                }
                
        except stripe.error.CardError as e:
            # Card was declined
            return {
                "status": "failed",
                "error": e.user_message
            }
        except Exception as e:
            # Other errors
            return {
                "status": "error",
                "message": str(e)
            }
    ```

- Credit scoring:
  * Credit bureaus
  * Credit score models
  * Risk assessment algorithms
  * Alternative data in credit scoring
- KYC and AML:
  * Customer identification procedures
  * Customer due diligence
  * Transaction monitoring
  * Suspicious activity reporting
  * Regulatory requirements
- Foreign exchange:
  * FX markets and mechanisms
  * Exchange rate determination
  * Currency hedging
  * Settlement risk
- Cross-border transactions:
  * International payment networks (SWIFT)
  * Correspondent banking
  * Remittance systems
  * Currency conversion

## FINTECH INDUSTRY TRENDS
- Digital banking:
  * Mobile-first banking
  * Banking-as-a-Service (BaaS)
  * Personal finance management tools
  * AI-driven insights
- Neo-banks:
  * Business models
  * Technology stacks
  * Differentiation strategies
  * Regulatory approaches
- Open banking:
  * PSD2 regulations
  * Open banking standards
  * API specifications
  * Third-party provider ecosystem
- Blockchain in finance:
  * Distributed ledger technology
  * Smart contracts
  * Tokenization of assets
  * Stablecoins and CBDCs
- RegTech solutions:
  * Automated compliance
  * Regulatory reporting
  * Risk management
  * Fraud detection systems
- Financial inclusion:
  * Underbanked populations
  * Microlending platforms
  * Alternative credit scoring
  * Mobile money solutions

===========================================
13. INTERVIEW PREPARATION
===========================================

## TECHNICAL INTERVIEW PREPARATION
- Coding interview strategy:
  * Problem-solving framework
  * Time management during interviews
  * Communication while coding
  * Testing and edge cases
  * Problem-solving framework example:
    1. Understand the problem:
       ```
       # Problem: Find two numbers in an array that sum to a target
       
       # Ask clarifying questions:
       - Are the numbers unique or can there be duplicates?
       - Can there be multiple pairs that sum to the target?
       - Should we return indices or the numbers themselves?
       - Is the array sorted?
       - What if no solution exists?
       ```
    
    2. Come up with examples:
       ```
       Input: [2, 7, 11, 15], target = 9
       Output: [0, 1] (indices of 2 and 7)
       
       Input: [3, 2, 4], target = 6
       Output: [1, 2] (indices of 2 and 4)
       
       Input: [3, 3], target = 6
       Output: [0, 1] (both indices if duplicates allowed)
       ```
    
    3. Break down approach:
       ```
       Approach 1: Brute force - O(n²)
       - For each number, check every other number to see if they sum to target
       
       Approach 2: Hash table - O(n)
       - Use a hash table to store numbers we've seen
       - For each number, check if its complement (target - num) exists
       ```
    
    4. Implement solution:
       ```python
       def two_sum(nums, target):
           # Create hash map to store numbers and their indices
           num_map = {}
           
           for i, num in enumerate(nums):
               complement = target - num
               
               # Check if complement exists
               if complement in num_map:
                   return [num_map[complement], i]
               
               # Add current number to map
               num_map[num] = i
           
           # No solution found
           return None
       ```
    
    5. Test the solution:
       ```
       Test case 1: [2, 7, 11, 15], target = 9
       - i=0: num=2, complement=7, num_map={}
         - 7 not in map, add {2: 0}
       - i=1: num=7, complement=2, num_map={2: 0}
         - 2 is in map! Return [0, 1]
       
       Test case 2: [3, 3], target = 6
       - i=0: num=3, complement=3, num_map={}
         - 3 not in map, add {3: 0}
       - i=1: num=3, complement=3, num_map={3: 0}
         - 3 is in map! Return [0, 1]
       ```
    
    6. Analyze complexity:
       ```
       Time complexity: O(n) - single pass through the array
       Space complexity: O(n) - hash map can contain up to n elements
       ```
    
    7. Optimize further (if needed):
       ```
       # If the array is already sorted, we could use two pointers
       # for O(n) time and O(1) space:
       
       def two_sum_sorted(nums, target):
           left, right = 0, len(nums) - 1
           
           while left < right:
               current_sum = nums[left] + nums[right]
               
               if current_sum == target:
                   return [left, right]
               elif current_sum < target:
                   left += 1
               else:
                   right -= 1
           
           return None
       ```

- System design interview approach:
  * Requirements clarification
  * High-level design
  * Detailed design
  * Identifying bottlenecks
  * Scaling considerations
- Common coding question patterns:
  * Two pointers
  * Sliding window
  * BFS/DFS traversal
  * Dynamic programming
  * Graph algorithms
- Practice resources:
  * LeetCode problem categorization
  * HackerRank challenges
  * AlgoExpert problem sets
  * System design resources

## BEHAVIORAL INTERVIEW PREPARATION
- STAR method:
  * Situation: Setting the context
  * Task: Describing your responsibility
  * Action: Explaining your actions
  * Result: Sharing the outcome
  * STAR method example:
    * Technical challenge scenario:
      ```
      Situation:
      "At my previous company, we were experiencing performance issues with our
      order processing system. During peak holiday season, the average response
      time increased from 200ms to over 3 seconds, causing customer complaints."
      
      Task:
      "As the backend developer responsible for the order service, I was tasked
      with identifying the bottleneck and improving response times to under
      500ms without significant infrastructure cost increases."
      
      Action:
      "First, I added detailed performance logging and identified that database
      queries were the primary bottleneck. I analyzed the query execution plans
      and found several inefficient queries performing table scans.
      
      I implemented the following optimizations:
      1. Added appropriate indexes to the orders and order_items tables
      2. Refactored complex JOIN queries into simpler ones
      3. Implemented a Redis cache for frequently accessed order status data
      4. Set up connection pooling to reduce database connection overhead
      5. Implemented database query timeout and circuit breaker patterns
      
      I carefully tested each change in staging before rolling out to production,
      and monitored the impact on performance metrics."
      
      Result:
      "After implementing these changes, the average response time improved to
      150ms, even during peak loads. This was a 95% reduction from the 3-second
      response time we were seeing. Customer complaints about slow checkout
      decreased by 80%, and we achieved this without adding any additional
      servers. The solution was so effective that our team adopted these
      optimization techniques as standard practices for other services."
      ```

- Key stories to prepare:
  * Technical challenge overcome
  * Collaboration success
  * Conflict resolution
  * Project management
  * Learning from failure
- Questions about:
  * Leadership experience
  * Teamwork and collaboration
  * Handling ambiguity
  * Time management
  * Learning agility
- Company-specific preparation:
  * Company values and culture
  * Product knowledge
  * Recent news and developments
  * Understanding the role requirements

===========================================
RECOMMENDED NEXT STEPS
===========================================

1. Identify your strengths and weaknesses across these topics
2. Create a personalized study plan focusing on weak areas
3. Practice coding problems daily (LeetCode, HackerRank)
4. Build small projects to apply concepts (REST API, microservice)
5. Participate in system design discussions/practice
6. Join tech communities and attend meetups
7. Read technical blogs and stay current with industry trends
8. Prepare your resume highlighting relevant skills and projects
9. Practice mock interviews with peers or interview platforms
10. Research specific companies and tailor your preparation

Remember that becoming proficient in all these areas takes time. Focus on depth in your core technologies while maintaining breadth across the fundamentals.
