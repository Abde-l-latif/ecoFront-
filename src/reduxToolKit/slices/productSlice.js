import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productInfo: [],
  error: false,
  loading: false,
  quantity: 0,
  totalPrice: 0,
  singleProduct: null,
  dataOrder: null,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductUser: (state, action) => {
      let Total = 0;
      let productQuantity = 0;
      state.productInfo = action.payload.res;
      state.productInfo.map((x) => {
        let Qty = x.addCart.find((item) => item.id == action.payload.user);
        if (Qty) {
          Total += (x.regularePrice - x.discountPrice) * Qty.Qty;
          productQuantity += Qty.Qty;
        }
      });
      state.quantity = productQuantity;
      state.totalPrice = Total;
    },
    getProductSuccess: (state, action) => {
      if (state.productInfo.length == 0) {
        state.productInfo = [...state.productInfo, action.payload];
        state.totalPrice =
          action.payload.regularePrice - action.payload.discountPrice;
      } else {
        const existingProduct = state.productInfo.find(
          (product) => product._id === action.payload._id
        );
        if (existingProduct) {
          existingProduct.productQuantity++;
          state.totalPrice +=
            existingProduct.regularePrice - existingProduct.discountPrice;
        } else {
          state.productInfo = [...state.productInfo, action.payload];
          state.totalPrice +=
            action.payload.regularePrice - action.payload.discountPrice;
        }
      }

      state.quantity++;
      state.error = false;
      state.loading = false;
    },
    getProductError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    getProductLoading: (state) => {
      state.loading = true;
    },
    increamentQuantity: (state, action) => {
      state.productInfo.map((product) => {
        if (product._id == action.payload) {
          product.productQuantity++;
          state.quantity++;
          state.totalPrice += product.regularePrice - product.discountPrice;
        } else {
          return product;
        }
      });
    },
    decreamentQuantity: (state, action) => {
      state.productInfo.map((product) => {
        if (product._id == action.payload && product.productQuantity > 1) {
          product.productQuantity--;
          state.quantity--;
          state.totalPrice -= product.regularePrice - product.discountPrice;
        } else {
          return product;
        }
      });
    },
    deleteProductCard: (state, action) => {
      let total = 0;
      let resetQuantity = 0;
      const newList = state.productInfo.filter((product) => {
        return product._id !== action.payload;
      });
      newList.map((x) => {
        total += (x.regularePrice - x.discountPrice) * x.productQuantity;
        resetQuantity += x.productQuantity;
      });
      state.productInfo = newList;
      state.totalPrice = total;
      state.quantity = resetQuantity;
    },
    resetProductCard: (state) => {
      state.productInfo = [];
      state.quantity = 0;
      state.totalPrice = 0;
      state.dataOrder = null;
    },
    getSingleProduct: (state, action) => {
      state.singleProduct = action.payload;
    },
    setOrder: (state, action) => {
      state.dataOrder = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getProductSuccess,
  getProductError,
  getProductLoading,
  increamentQuantity,
  decreamentQuantity,
  deleteProductCard,
  getProductUser,
  resetProductCard,
  getSingleProduct,
  setOrder,
} = ProductSlice.actions;

export default ProductSlice.reducer;
