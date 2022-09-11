export interface OrderDB {
    order_id: string;
    product: string[];
    payment_class: string;
    payment_status: string;
    paymeny_method: string;
    order_class: string;
    order_status: string;
    date: string;
    total: string;
}

export const ORDERDB: OrderDB[] = [
    {
        "order_id": "#51240",
        "product": ['assets/images/electronics/product/25.jpg', 'assets/images/electronics/product/13.jpg', 'assets/images/electronics/product/16.jpg'],
        "payment_class": 'badge-secondary',
        "payment_status": "Cash On Delivery",
        "paymeny_method": "Paypal",
        "order_class": "badge-success",
        "order_status": "Delivered",
        "date": "Dec 10,18",
        "total": "$54671"
    },
    {
        "order_id": "#51241",
        "product": ['assets/images/electronics/product/12.jpg', 'assets/images/electronics/product/3.jpg'],
        "payment_class": 'badge-success',
        "payment_status": "Paid",
        "paymeny_method": "Master Card",
        "order_class": "badge-primary",
        "order_status": "Shipped",
        "date": "Feb 15,18",
        "total": "$2136"
    },
    {
        "order_id": "#51242",
        "product": ['assets/images/electronics/product/14.jpg'],
        "payment_class": 'badge-success',
        "payment_status": 'Awaiting Authentication',
        "paymeny_method": "Debit Card",
        "order_class": "badge-warning",
        "order_status": "Processing",
        "date": "Mar 27,18",
        "total": "$8791"
    },
    {
        "order_id": "#51243",
        "product": ['assets/images/electronics/product/6.jpg', 'assets/images/furniture/8.jpg'],
        "payment_class": 'badge-danger',
        "payment_status": 'Payment Failed',
        "paymeny_method": "Debit Card",
        "order_class": "badge-danger",
        "order_status": "Cancelled",
        "date": "Sep 1,18",
        "total": "$139"
    },
    {
        "order_id": "#51244",
        "product": ["assets/images/jewellery/pro/18.jpg", 'assets/images/fashion/pro/06.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Paid",
        "paymeny_method": "Paypal",
        "order_class": "badge-primary",
        "order_status": "Shipped",
        "date": "Sep 1,18",
        "total": "$139"
    },
    {
        "order_id": "#51245",
        "product": ['assets/images/electronics/product/19.jpg', 'assets/images/electronics/product/20.jpg', 'assets/images/electronics/product/23.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Paid",
        "paymeny_method": "Visa",
        "order_class": "badge-success",
        "order_status": "Delivered",
        "date": "Jan 14,18",
        "total": "$6791"
    },
    {
        "order_id": "#51246",
        "product": ['assets/images/electronics/product/24.jpg'],
        "payment_class": "badge-warning",
        "payment_status": "Awaiting Authentication",
        "paymeny_method": "Credit Card",
        "order_class": "badge-warning",
        "order_status": "Processing",
        "date": "Apr 22,18",
        "total": "$976"
    },
    {
        "order_id": "#51247",
        "product": ['assets/images/electronics/product/21.jpg', 'assets/images/electronics/product/8.jpg'],
        "payment_class": "badge-danger",
        "payment_status": "Payment Failed",
        "paymeny_method": "Master Card",
        "order_class": "badge-danger",
        "order_status": 'Cancelled',
        "date": "Mar 26,18",
        "total": "$3212"
    },
    {
        "order_id": "#51248",
        "product": ['assets/images/electronics/product/18.jpg', 'assets/images/electronics/product/8.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Paid",
        "paymeny_method": "Paypal",
        "order_class": 'badge-primary',
        "order_status": "Shipped",
        "date": "Feb 29,18",
        "total": "$6791"
    },
    {
        "order_id": "#51249",
        "product": ['assets/images/electronics/product/17.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Paid",
        "paymeny_method": "Master Card",
        "order_class": "badge-secondary",
        "order_status": "Processing",
        "date": "Sep 2,18",
        "total": "$9765"
    },
    {
        "order_id": "#51250",
        "product": ['assets/images/electronics/product/7.jpg', 'assets/images/electronics/product/4.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Paid",
        "paymeny_method": "Credit Card",
        "order_class": "badge-primary",
        "order_status": "Shipped",
        "date": "Dec 10,18",
        "total": "$9705"
    },
    {
        "order_id": "#51251",
        "product": ['assets/images/electronics/product/22.jpg', 'assets/images/electronics/product/20.jpg'],
        "payment_class": "badge-secondary",
        "payment_status": "Cash On Delivery",
        "paymeny_method": "Paypal",
        "order_class": "badge-primary",
        "order_status": "Shipped",
        "date": "Feb 15,18",
        "total": "$1500"
    },
    {
        "order_id": "#51252",
        "product": ['assets/images/electronics/product/3.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Payment",
        "paymeny_method": "Credit Card",
        "order_class": "badge-primary",
        "order_status": "Cancelled",
        "date": "Mar 27,18",
        "total": "$18.97"
    },
    {
        "order_id": "#51253",
        "product": ['assets/images/electronics/product/11.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Paid",
        "paymeny_method": "Master Card",
        "order_class": 'badge-success',
        "order_status": "Delivered",
        "date": "Dec 17,18",
        "total": "$19.47"
    },
    {
        "order_id": "#51254",
        "product": ['assets/images/electronics/product/11.jpg', 'assets/images/electronics/product/2.jpg', 'assets/images/electronics/product/9.jpg'],
        "payment_class": "badge-success",
        "payment_status": "Paid",
        "paymeny_method": "Master Card",
        "order_class": "badge-primary",
        "order_status": "Shipped",
        "date": "Nov 29,18",
        "total": "$7.48"
    },
]
