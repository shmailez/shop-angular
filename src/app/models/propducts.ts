export interface IProducts {
  id: number;
  title: string;
  price: string;
  year: string;
  image?: string;
  autor: string;
  genre: string;
  volume: string;
  language: string;
  configure: IProductsCongig;
  quantity: number;
}

export interface IProductsCongig {
  autor: string;
  genre: string;
  volume: string;
  language: string;
}
