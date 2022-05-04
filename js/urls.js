const baseUrl = "https://karankhannaofficial.herokuapp.com";
var urlSet = {

    // Contact
    create_contact: { // Create contact
        url: baseUrl + "/api/v1/contacts/", 
        method: "POST",
    },
    get_contacts: { // Get all contacts
        url: baseUrl + "/api/v1/contacts/", 
        method: "GET",
    },
    delete_contacts: { // Delete one contact
        url: baseUrl + "/api/v1/contacts/", 
        method: "DELETE",
    },


    // Payment
    create_order: { // Create order
        url: baseUrl + "/api/v1/payment/pay", 
        method: "POST",
    },
    verify_payment: { // Verify payment
        url: baseUrl + "/api/v1/payment/verifyPayment", 
        method: "PATCH",
    },


    // Transactions
    get_transactions: { // Get all transactions
        url: baseUrl + "/api/v1/transactions", 
        method: "GET",
    },
    delete_transactions: { // Delete one transaction
        url: baseUrl + "/api/v1/transactions/", 
        method: "DELETE",
    },

    // Login
    adminLoginApi: { // Admin Login
        url: baseUrl + "/api/v1/user/signin", 
        method: "POST",
    },
};