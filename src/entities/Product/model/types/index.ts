export interface IImage {
  id: number | string;
  image: string;
  alt_text: string;
}

export interface IProduct {
  id: number | string;
  product_name: string;
  price: string;
  type: number | string;
  segment: number | string;
  images: IImage[];
}

export interface ICatalogResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IProduct[];
}
