import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	type?: string;
	megaMenu?: boolean;
	image?: string;
	active?: boolean;
	badge?: boolean;
	badgeText?: string;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	constructor() { }

	public screenWidth: any;
	public leftMenuToggle: boolean = false;
	public mainMenuToggle: boolean = false;

	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '', title: 'home', type: 'link'
				
		},
		{
			path: '/shop', title: 'Shop', type: 'link'
		},
		{
			title: 'Products', type: 'sub', active: false, children: [
				{
					title: 'sidebar', type: 'sub', active: false, children: [
						{ path: '/shop/product/left/sidebar/trim-dress', title: 'left-sidebar', type: 'link' },
						{ path: '/shop/product/right/sidebar/trim-dress', title: 'right-sidebar', type: 'link' },
						{ path: '/shop/product/no/sidebar/trim-dress', title: 'no-sidebar', type: 'link' }
					]
				},
				{ path: '/shop/product/three/column/trim-dress', title: 'three-column', type: 'link' },
				{ path: '/shop/product/four/image/belted-dress', title: 'four-image', type: 'link' },
				{ path: '/shop/product/bundle/trim-dress', title: 'bundle-product', type: 'link' },
				{ path: '/shop/product/image/outside/trim-dress', title: 'image-outside', type: 'link' }
			]
		},
		{
			title: 'Categories', type: 'sub', megaMenu: true, badge: true, badgeText: 'new', active: false, children: [
				{
					title: 'portfolio', type: 'sub', active: false, children: [
						{ path: '/pages/portfolio/grid/two', title: 'portfolio-grid-2', type: 'link' },
						
					]
				}
				
			]
		},
		{
			path: '/pages/aboutus', title: 'About Us', type: 'link'
		},
		{
			path: '/pages/contact', title: 'Contact', type: 'link'
		}
	];

	LEFTMENUITEMS: Menu[] = [
		{
			title: 'clothing', type: 'sub', megaMenu: true, active: false, children: [
			  {
				  title: 'mens fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'top',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'shirts',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' }
				  ]
			  },
			  {
				  title: 'women fashion',  type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'dresses',  type: 'link' },
					  { path: '/home/fashion', title: 'skirts',  type: 'link' },
					  { path: '/home/fashion', title: 'westarn wear',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom',  type: 'link' },
					  { path: '/home/fashion', title: 'ethic wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'sports wear',  type: 'link' },
					  { path: '/home/fashion', title: 'bottom wear',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'bags', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'shopper bags', type: 'link' },
			  { path: '/home/fashion', title: 'laptop bags', type: 'link' },
			  { path: '/home/fashion', title: 'clutches', type: 'link' },
			  {
				  path: '/home/fashion', title: 'purses', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'purses',  type: 'link' },
					  { path: '/home/fashion', title: 'wallets',  type: 'link' },
					  { path: '/home/fashion', title: 'leathers',  type: 'link' },
					  { path: '/home/fashion', title: 'satchels',  type: 'link' }
				  ]
			  },
			]
		},
		{
			title: 'footwear', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'sport shoes', type: 'link' },
			  { path: '/home/fashion', title: 'formal shoes', type: 'link' },
			  { path: '/home/fashion', title: 'casual shoes', type: 'link' }
			]
		},
		{
			path: '/home/fashion', title: 'watches', type: 'link'
		},
		{
			title: 'Accessories', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'fashion jewellery', type: 'link' },
			  { path: '/home/fashion', title: 'caps and hats', type: 'link' },
			  { path: '/home/fashion', title: 'precious jewellery', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'necklaces',  type: 'link' },
					  { path: '/home/fashion', title: 'earrings',  type: 'link' },
					  { path: '/home/fashion', title: 'rings & wrist wear',  type: 'link' },
					  {
						  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
							  { path: '/home/fashion', title: 'ties',  type: 'link' },
							  { path: '/home/fashion', title: 'cufflinks',  type: 'link' },
							  { path: '/home/fashion', title: 'pockets squares',  type: 'link' },
							  { path: '/home/fashion', title: 'helmets',  type: 'link' },
							  { path: '/home/fashion', title: 'scarves',  type: 'link' },
							  {
								  path: '/home/fashion', title: 'more...',  type: 'link', active: false, children: [
									  { path: '/home/fashion', title: 'accessory gift sets',  type: 'link' },
									  { path: '/home/fashion', title: 'travel accessories',  type: 'link' },
									  { path: '/home/fashion', title: 'phone cases',  type: 'link' }
								  ]
							  },
						]
					  }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'house of design', type: 'link'
		},
		{
			title: 'beauty & personal care', type: 'sub', active: false, children: [
			  { path: '/home/fashion', title: 'makeup', type: 'link' },
			  { path: '/home/fashion', title: 'skincare', type: 'link' },
			  { path: '/home/fashion', title: 'premium beaty', type: 'link' },
			  {
				  path: '/home/fashion', title: 'more..', type: 'link', active: false, children: [
					  { path: '/home/fashion', title: 'fragrances',  type: 'link' },
					  { path: '/home/fashion', title: 'luxury beauty',  type: 'link' },
					  { path: '/home/fashion', title: 'hair care',  type: 'link' },
					  { path: '/home/fashion', title: 'tools & brushes',  type: 'link' }
				  ]
			  },
			]
		},
		{
			path: '/home/fashion', title: 'home & decor', type: 'link'
		},
		{
			path: '/home/fashion', title: 'kitchen', type: 'link'
		}
	];

	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
	leftMenuItems = new BehaviorSubject<Menu[]>(this.LEFTMENUITEMS);

}
