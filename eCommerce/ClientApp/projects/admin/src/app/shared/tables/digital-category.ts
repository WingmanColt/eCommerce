export interface DigitalCategoryDB {
    img?: string;
    product_name: string;
    price: string;
    status: string;
    category: string;
}

export const DIGITALCATEGORY: DigitalCategoryDB[] = [

    {
        img: 'assets/images/digital-product/graphic-design.png',
        product_name: "Graphic Design",
        price: "$57.00",
        status: "<i class='fa fa-circle font-success f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/ebooks.png',
        product_name: "eBooks",
        price: "$472.00",
        status: "<i class='fa fa-circle font-warning f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/lecture-video-recorder.jpg',
        product_name: "Recorded lectures",
        price: "$54.00",
        status: "<i class='fa fa-circle font-success f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/application.jpg',
        product_name: "Application",
        price: "$578.00",
        status: "<i class='fa fa-circle font-danger f-12'></i>",
        category: "Digital",
    },
    {
        img: 'assets/images/digital-product/web-dev.jpg',
        product_name: "Websites",
        price: "$5764.00",
        status: "<i class='fa fa-circle font-warning f-12'></i>",
        category: "Digital",
    },
]

