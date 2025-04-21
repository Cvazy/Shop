export interface IImage {
  id: number | string;
  image: string;
  alt_text: string;
}

export interface IProduct {
  id: number | string;
  product_name: string;
  price: string;
  type: number;
  segment: number;
  images: IImage[];
}

export interface IProductEnhanced extends IProduct {
  typeName: string;
  segmentName: string;
}

export interface ICatalogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IProduct[];
}

export interface ISegmentAndType {
  id: number;
  name: string;
}

export interface IFiltersResponse {
  segments: ISegmentAndType[];
  types: ISegmentAndType[];
}
