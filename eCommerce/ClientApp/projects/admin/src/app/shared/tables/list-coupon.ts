export interface ListCouponsDB {
    title: string;
    code: string;
    discount: string;
    status: string;
    checked?: boolean;
}

export const LISTCOUPLEDB: ListCouponsDB[] = [
    {
        title: " 10% Off",
        code: " Percent10",
        discount: " 10%",
        status: "<i class=\"fa fa-circle font-success f-12\"></i>",
        checked: false
    },
    {
        title: " 25% Off",
        code: " Percent25",
        discount: " 25%",
        status: "<i class=\"fa fa-circle font-warning f-12\"></i>",
        checked: false
    },
    {
        title: " 5% Off",
        code: " Percent5",
        discount: " 5%",
        status: "<i class=\"fa fa-circle font-success f-12\"></i>",
        checked: false
    },
    {
        title: " 2% Off",
        code: " Percent2",
        discount: " 2%",
        status: "<i class=\"fa fa-circle font-warning f-12\"></i>",
        checked: false
    },
    {
        title: " 50% Off",
        code: " Percent50",
        discount: " 50%",
        status: "<i class=\"fa fa-circle font-danger f-12\"></i>",
        checked: false
    },
    {
        title: " 70% Off",
        code: " Percent70",
        discount: " 70%",
        status: "<i class=\"fa fa-circle font-success f-12\"></i>",
        checked: false
    },
    {
        title: " 75% Off",
        code: " Percent75",
        discount: " 75%",
        status: "<i class=\"fa fa-circle font-danger f-12\"></i>",
        checked: false
    },
    {
        title: " 80% Off",
        code: " Percent80",
        discount: " 80%",
        status: "<i class=\"fa fa-circle font-success f-12\"></i>",
        checked: false
    }
]
