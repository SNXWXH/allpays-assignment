export interface Merchant {
  mchtCode: string;
  mchtName: string;
  status: string;
  createdAt: string;
}

export interface MerchantDetail {
  mchtCode: string;
  mchtName: string;
  status: string;
  businessNumber: string;
  representative: string;
  phone: string;
  email: string;
  address: string;
  registeredAt: string;
  updatedAt: string;
}

export interface MerchantResponse {
  status: string;
  message: string;
  data: Merchant[];
}

export interface MerchantDetailResponse {
  status: string;
  message: string;
  data: MerchantDetail;
}

export interface MerchantStatus {
  code: string;
  description: string;
}

export interface CommonResponse<T> {
  status: string;
  message: string;
  data: T[];
}
