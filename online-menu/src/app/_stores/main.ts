import { create } from 'zustand'
import { IProduct, ICheckoutItem } from '../_types';

type StoreState = {
  checkout_products_list: ICheckoutItem[];
  is_checkout_list_empty: boolean;
  setCheckoutProductsList: (newList: ICheckoutItem[]) => void;
  setIsCheckoutListEmpty: (value: boolean) => void;
  add_product: (product: IProduct) => void;
  remove_product: (product: IProduct | 'all') => void;
};

export const useStore = create<StoreState>((set) => ({
  checkout_products_list: [],
  is_checkout_list_empty: true,
  setCheckoutProductsList: (newList) => set({ checkout_products_list: newList }),
  setIsCheckoutListEmpty: (value) => set({ is_checkout_list_empty: value }),
  add_product: (product: IProduct) => {
    console.log("add_product");
    set((state) => {
      let temporary_list: ICheckoutItem[] = [...state.checkout_products_list];

      if (state.is_checkout_list_empty) {
        let product_config: ICheckoutItem = {
          code: product.code,
          amount: 1,
          product_info: product
        };
        temporary_list.push(product_config);
      } else {
        let product_already_added = temporary_list.filter((item) => item.code === product.code);
        if (temporary_list.filter((item) => item.code === product.code).length === 0) {
          let product_config: ICheckoutItem = {
            code: product.code,
            amount: 1,
            product_info: product
          };
          temporary_list.push(product_config);
        } else {
          const already_added_item = product_already_added[0];
          already_added_item.amount += 1;
          temporary_list = temporary_list.filter((item) => item.code !== product.code);
          temporary_list.push(already_added_item);
        }
      }
      return {
        checkout_products_list: temporary_list,
        is_checkout_list_empty: false
      };
    });
  },
  remove_product: (product: IProduct | 'all') => {
    set((state) => {
      let new_list: ICheckoutItem[] = [];
      if (product === 'all') {
        new_list = [];
      } else {
        let temporary_list = [...state.checkout_products_list];
        new_list = temporary_list.filter((item) => item.code !== product.code);
      }

      return {
        checkout_products_list: new_list,
        is_checkout_list_empty: new_list.length === 0
      };
    });
  },
}))
