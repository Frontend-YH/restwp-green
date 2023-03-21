payment_method: "bacs", 
    payment_method_title: "Direct Bank Transfer",
    set_paid: true,
    customer_id: 1,
    billing: {
        first_name: "Janne",
        last_name: "Kemi",
        adress_1: "Gatan 10",
        city: "Uddebo",
        postcode: "514 92",
        country: "SE",
        email: "janne@hiveandfive.se",
        phone: "070123456"
    },
    shipping: {
        first_name: "Janne",
        last_name: "Kemi",
        adress_1: "Gatan 10",
        city: "Uddebo",
        postcode: "514 92",
        country: "SE",
        email: "janne@hiveandfive.se",
        phone: "070123456"
    },
    line_items: [
        // LOOPA IGENOM KUNDVAGN
        {
            product_id: 13,
            quantity: 1
        }, 
        {
            product_id: 11,
            quantity: 2
        }
    ],
    shipping_lines: [
        {
            method_id: "flat_rate",
            method_title: "Flat rate",
            totals: "100"
        }

    ]
}