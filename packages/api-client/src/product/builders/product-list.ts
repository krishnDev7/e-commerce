import { apiService } from '../../lib/dashboard.client';
import { APIClientQueryBuilder } from '../../type';

export interface ProductDTO {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  description: string;
  priceCents: number;
  currency: string;
  imageUrl?: string | null;
  stock: number;
}

export interface ProductListParams {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}

export interface ProductListResponse {
  products: ProductDTO[];
  total: number;
  page: number;
  limit: number;
}

export const getProductListBuilder: APIClientQueryBuilder<ProductListParams, ProductListResponse> =
  {
    cacheKey: ['PRODUCTS'],
    module: 'product',
    options: {
      enabled: true,
    },
    resolver: async (params: ProductListParams = {}) => {
      return apiService.get<ProductListResponse>('/products', {
        params: params,
      });
    },
  };
