const baseUrl = "https://karankhannaofficial.herokuapp.com";
var urlSet = {

    // Contact
    create_contact: { // Create contact
        url: baseUrl + "/api/v1/contacts/", 
        method: "POST",
    },
    // Contact
    create_order: { // Create contact
        url: baseUrl + "/api/v1/payment/pay", 
        method: "POST",
    },
    verify_payment: { // Create contact
        url: baseUrl + "/api/v1/payment/verifyPayment", 
        method: "POST",
    },
};