export interface mainMenu {
  _id: string;
  title: string;
  poster: any;
  pressEvt: string;
}

export type PartnersNavigatorStackParamList = {
  Root: undefined;
  PartnerProducts: {id: string; partProduct: mainMenu[] | []};
  Products: undefined;
};

export type PartnerProduct = {type: string; partProduct: []};
