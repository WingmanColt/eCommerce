export interface DigitalListDB {
    id: string,
    img?: string;
    title: string;
    entry_type: string;
    quantity: string;
}

export const DIGITALLIST: DigitalListDB[] = [
    {
        id: "21",
        img: 'assets/images/digital-product/web-dev.jpg',
        title: "Websites",
        entry_type: "Add",
        quantity: "5",
    },
    {
        id: "172",
        img: 'assets/images/digital-product/3d-design.jpg',
        title: "3D Impact",
        entry_type: "Destroy",
        quantity: "11",
    },
    {
        id: "124",
        img: 'assets/images/digital-product/graphic-design.png',
        title: "Graphic Design",
        entry_type: "Destroy",
        quantity: "154",
    },
    {
        id: "37",
        img: 'assets/images/digital-product/logo.jpg',
        title: "Company Logo",
        entry_type: "Destroy",
        quantity: "1",
    },
    {
        id: "67",
        img: 'assets/images/digital-product/application.jpg',
        title: "Application",
        entry_type: "Add",
        quantity: "24",
    },
    {
        id: "74",
        img: 'assets/images/digital-product/php.png',
        title: "Php",
        entry_type: "Destroy",
        quantity: "1",
    },
    {
        id: "427",
        img: 'assets/images/digital-product/html.png',
        title: "Html",
        entry_type: "Destroy",
        quantity: "27",
    },
    {
        id: "142",
        img: 'assets/images/digital-product/css.jpg',
        title: "Css",
        entry_type: "Add",
        quantity: "2",
    },
    {
        id: "58",
        img: 'assets/images/digital-product/ebooks.png',
        title: "Ebooks",
        entry_type: "Add",
        quantity: "4",
    }
]

