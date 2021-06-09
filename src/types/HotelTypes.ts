import { ProfileSettings } from "@src/components/config/types"

export type Hotel= {
  hotels: HotelTypes[];
  currency: string;
  region?: string;
  partnerId?: number;
}

export interface HotelTypes {
    
    id: number | string;
    name: string | null | undefined | "";
    rating: number | string;
    stars: number;
    address: string | null | undefined | "";
    photo: string | null | undefined | "";
    description: string | null | undefined | "";
    price?: number;
    competitors?: HotelDetailsCompetitorType;
    taxes_and_fees?: HotelDetailTaxFeesType;
  }

  
  export interface HotelDetailsCompetitorType  {
    data: {[key:string]: number}
  }


  export interface HotelDetailTaxFeesType {
      tax: number;
      hotel_fees: number;
  }
  
  export type HotelProps = {
    data: Hotel;
    settings: ProfileSettings;
  }

  // tables
  export type Order = 'asc' | 'desc';

  export interface HeadCell {
    disablePadding: boolean;
    id: keyof HotelTypes;
    label: string;
    numeric: boolean;
  }

  export interface CustomTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof HotelTypes) => void;
    classes: any; // ReturnType<typeof useStyles>;
    // onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }