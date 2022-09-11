import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem, ThumbnailsPosition, ImageSize } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-grid-three',
  templateUrl: './grid-three.component.html',
  styleUrls: ['./grid-three.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class GridThreeComponent implements OnInit {
  public galleryFilter: string = 'all'
  items: GalleryItem[];

  public imageData = AllImage;

  constructor(public gallery: Gallery, public lightbox: Lightbox) {
  }

  ngOnInit() {
    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));

    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);
  }

  filter(term) {
    if (term == 'all') {
      this.imageData = AllImage
    } else if (term == 'fashion') {
      this.imageData = FashionImage
    } else if (term == 'bags') {
      this.imageData = BagImages
    } else if (term == 'shoes') {
      this.imageData = ShoesImages
    } else if (term == 'watch') {
      this.imageData = WatchImages
    }

    this.items = this.imageData.map(item => new ImageItem({ src: item.srcUrl, thumb: item.previewUrl }));


    /** Lightbox Example */

    // Get a lightbox gallery ref
    const lightboxRef = this.gallery.ref('lightbox');

    // Add custom gallery config to the lightbox (optional)
    lightboxRef.setConfig({
      imageSize: ImageSize.Cover,
      thumbPosition: ThumbnailsPosition.Top
    });

    // Load items into the lightbox gallery ref
    lightboxRef.load(this.items);

    this.galleryFilter = term
  }
}

const AllImage = [
  {
    srcUrl: 'assets/images/portfolio/grid/1.jpg',
    previewUrl: 'assets/images/portfolio/grid/1.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/2.jpg',
    previewUrl: 'assets/images/portfolio/grid/2.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/3.jpg',
    previewUrl: 'assets/images/portfolio/grid/3.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/4.jpg',
    previewUrl: 'assets/images/portfolio/grid/4.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/5.jpg',
    previewUrl: 'assets/images/portfolio/grid/5.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/6.jpg',
    previewUrl: 'assets/images/portfolio/grid/6.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/7.jpg',
    previewUrl: 'assets/images/portfolio/grid/7.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/8.jpg',
    previewUrl: 'assets/images/portfolio/grid/8.jpg'
  }
];

const FashionImage = [
  {
    srcUrl: 'assets/images/portfolio/grid/1.jpg',
    previewUrl: 'assets/images/portfolio/grid/1.jpg'
  }
]

const BagImages = [
  {
    srcUrl: 'assets/images/portfolio/grid/3.jpg',
    previewUrl: 'assets/images/portfolio/grid/3.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/4.jpg',
    previewUrl: 'assets/images/portfolio/grid/4.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/7.jpg',
    previewUrl: 'assets/images/portfolio/grid/7.jpg'
  }
];

const ShoesImages = [
  {
    srcUrl: 'assets/images/portfolio/grid/2.jpg',
    previewUrl: 'assets/images/portfolio/grid/2.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/8.jpg',
    previewUrl: 'assets/images/portfolio/grid/8.jpg'
  }
]

const WatchImages = [
  {
    srcUrl: 'assets/images/portfolio/grid/5.jpg',
    previewUrl: 'assets/images/portfolio/grid/5.jpg'
  },
  {
    srcUrl: 'assets/images/portfolio/grid/6.jpg',
    previewUrl: 'assets/images/portfolio/grid/6.jpg'
  }
]