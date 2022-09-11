export interface DigitalSubCategoryDB {
    img?: string;
    product_name: string;
    price: string;
    status: string;
    category: string;
}

export const DIGITALSUBCATEGORY: DigitalSubCategoryDB[] = [
    {
        img: 'assets/images/digital-product/logo.jpg',
        product_name: "Logo Design",
        price: "$74.00",
        status: "<i class='fa fa-circle font-success f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/php.png',
        product_name: "Php",
        price: "$213.00",
        status: "<i class='fa fa-circle font-danger f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/html.png',
        product_name: "HTML",
        price: "$254.00",
        status: "<i class='fa fa-circle font-success f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/css.jpg',
        product_name: "CSS",
        price: "$794.00",
        status: "<i class='fa fa-circle font-success f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/web-element.jpg',
        product_name: "Web element",
        price: "$5764.00",
        status: "<i class='fa fa-circle font-danger f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/wordpress.jpg',
        product_name: "Wordpress",
        price: "$347.00",
        status: "<i class='fa fa-circle font-danger f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/3d-design.jpg',
        product_name: "3D Design",
        price: "$5764.00",
        status: "<i class='fa fa-circle font-success f-12'></i>",
        category: "Digital",
    },
]
