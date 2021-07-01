export type StoreType = {
  name: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
  revenue: number;
};

export type ListStoreType = {
  stores: Array<StoreType>;
  minimalRevenue: string;
};

export type MapType = {
  key?: string;
  data: Array<StoreType>;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  minimalRevenue: string;
  height?: string;
  width?: string;
};

export type PinnedMapType = {
  lat: number;
  lng: number;
  text: string;
  lower: boolean;
};
