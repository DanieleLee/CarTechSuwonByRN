import {TopNavigatorStackParamList} from './navigation';

export interface mainMenu {
  _id: string;
  title: string;
  poster: any;
  pressEvt: string;
}

export interface subMenuEtc {
  visit: boolean; //방문수령
  muncheck: boolean; //파손면책동의
  deliveryfree: boolean; //무료배송
  discount: number; //할인율
  accumulate: string; //적립률
  likes: number; // 찜
}
export interface subMenu {
  _id: string;
  prodNum: number;
  title: string;
  desc: string;
  price: number;
  img: string[];
  poster: string;
  etc: subMenuEtc;
  partId: string;
  partName: string;
  quantity: number;
}

export interface subMenuMidType {
  partName: boolean;
  title: boolean;
  review: boolean;
  etc: subMenuEtc;
  cartBtn: boolean;
}

export type PartnersNavigatorStackParamList = TopNavigatorStackParamList & {
  Root: undefined;
  PartnerProducts: {id: string; partProduct: mainMenu[] | []};
  Products: undefined;
  PartnerProductsDetail: {partProductSub: subMenu; cartProducts: number};
};

export type PartnerProduct = {type: string; partProduct: []};
