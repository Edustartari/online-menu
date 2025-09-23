import { create } from 'zustand'

type StoreState = {
  checkout_products_list: any[];
  is_checkout_list_empty: boolean;
  setCheckoutProductsList: (newList: any[]) => void;
  setIsCheckoutListEmpty: (value: boolean) => void;
  add_product: (product: any) => void;
  remove_product: (product: any) => void;
};

export const useStore = create<StoreState>((set) => ({
  checkout_products_list: [],
  is_checkout_list_empty: true,
  setCheckoutProductsList: (newList) => set({ checkout_products_list: newList }),
  setIsCheckoutListEmpty: (value) => set({ is_checkout_list_empty: value }),
  add_product: (product) => {
    console.log("add_product");
    set((state) => {
      let temporary_list = [...state.checkout_products_list];

      if (state.is_checkout_list_empty) {
        let product_config = {
          code: product.code,
          amount: 1,
          product_info: product
        };
        temporary_list.push(product_config);
      } else {
        let product_already_added = temporary_list.filter((item) => item.code === product.code);
        if (product_already_added.length === 0) {
          let product_config = {
            code: product.code,
            amount: 1,
            product_info: product
          };
          temporary_list.push(product_config);
        } else {
          product_already_added = product_already_added[0];
          product_already_added.amount += 1;
          temporary_list = temporary_list.filter((item) => item.code !== product.code);
          temporary_list.push(product_already_added);
        }
      }
      return {
        checkout_products_list: temporary_list,
        is_checkout_list_empty: false
      };
    });
  },
  remove_product: (product) => {
    set((state) => {
      let new_list: any[] = [];
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
