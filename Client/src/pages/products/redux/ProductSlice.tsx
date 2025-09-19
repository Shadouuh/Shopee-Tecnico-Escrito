import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../services/ProductService';
import type { Product } from '../services/ProductService';

// Estado inicial
interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  sortOrder: 'asc' | 'desc' | 'none';
}

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
  searchQuery: '',
  sortOrder: 'none'
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const products = await productService.getAllProducts();
      return products;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<'asc' | 'desc' | 'none'>) => {
      state.sortOrder = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { setSearchQuery, setSortOrder, clearError } = productSlice.actions;
export default productSlice.reducer;