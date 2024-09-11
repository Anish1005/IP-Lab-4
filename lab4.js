// JS for lab4.js

// Constants for pricing
const PRICE_PER_SHIRT = 25;  // Assuming $25 per shirt

// Create a Person class
class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    // Method to display person's information
    displayInfo() {
        return `Name: ${this.name}, Email: ${this.email}`;
    }
}

// Create a Student class that extends Person
class Student extends Person {
    constructor(name, email, rollNo) {
        super(name, email);
        this.rollNo = rollNo;
    }

    // Method to display student's information
    displayInfo() {
        return `${super.displayInfo()}, Roll No: ${this.rollNo}`;
    }

    // Validate roll number
    validateRollNo() {
        if (this.rollNo === 0) {
            throw new Error('Roll number cannot be zero.');
        }
    }
}

// Form validation and order processing
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const quantityElem = document.getElementById('quantity');
    const colorElem = document.getElementById('color');
    const sizeElem = document.getElementById('size');
    const deliveryDateElem = document.getElementById('delivery_date');
    const phoneElem = document.getElementById('phone');
    const messageElem = document.getElementById('message');

    // Live update of total price and order details preview
    const updatePriceAndPreview = () => {
        const quantity = parseInt(quantityElem.value);
        const totalPrice = quantity * PRICE_PER_SHIRT;

        document.getElementById('total_price').textContent = `Total Price: $${totalPrice}`;
        document.getElementById('preview_color').textContent = `T-shirt Color: ${colorElem.value}`;
        document.getElementById('preview_size').textContent = `T-shirt Size: ${sizeElem.value}`;
        document.getElementById('preview_quantity').textContent = `Quantity: ${quantity}`;
        document.getElementById('preview_delivery').textContent = `Preferred Delivery Date: ${deliveryDateElem.value}`;
    };

    // Validate phone number to be exactly 10 digits
    const validatePhone = () => {
        const phone = phoneElem.value.replace(/-/g, '');
        const phonePattern = /^\d{10}$/;

        if (!phonePattern.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return false;
        }
        return true;
    };

    // Validate the message for length (max 100 characters)
    const validateMessage = () => {
        const message = messageElem.value;

        if (message.length > 100) {
            alert('Message should not exceed 100 characters.');
            return false;
        }
        return true;
    };

    // Order form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        // Validate phone number and message
        if (!validatePhone() || !validateMessage()) {
            return;
        }

        // Validate roll number for Student (throw exception if it's zero)
        const rollNumber = parseInt(document.getElementById('roll_no').value);
        const student = new Student(
            document.getElementById('name').value,
            document.getElementById('email').value,
            rollNumber
        );
        try {
            student.validateRollNo();
        } catch (error) {
            alert(error.message);
            return;
        }

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const deliveryDate = deliveryDateElem.value;
        const quantity = parseInt(quantityElem.value);
        const totalPrice = quantity * PRICE_PER_SHIRT;

        // Create receipt
        const receipt = `
            <h3>Order Receipt</h3>
            <p>Thank you for your order, ${name}!</p>
            <p>Email: ${email}</p>
            <p>Quantity: ${quantity}</p>
            <p>T-shirt Color: ${colorElem.value}</p>
            <p>T-shirt Size: ${sizeElem.value}</p>
            <p>Preferred Delivery Date: ${deliveryDate}</p>
            <p>Total Price: $${totalPrice}</p>
            <p>Date of Receipt: ${new Date().toLocaleDateString()}</p>
        `;

        // Display receipt in a new window
        const receiptWindow = window.open("", "Receipt", "width=600,height=400");
        receiptWindow.document.write("<html><head><title>Order Receipt</title></head><body>");
        receiptWindow.document.write(receipt);
        receiptWindow.document.write("</body></html>");
        receiptWindow.document.close();
    });

    // Event listeners for live price update
    quantityElem.addEventListener('input', updatePriceAndPreview);
    colorElem.addEventListener('change', updatePriceAndPreview);
    sizeElem.addEventListener('change', updatePriceAndPreview);
    deliveryDateElem.addEventListener('change', updatePriceAndPreview);
});
