import axios from 'axios';
import type {
  PaymentResponse,
  CommonResponse,
  PaymentStatus,
  PaymentType,
} from '@/types/payment';
import type {
  MerchantResponse,
  MerchantDetailResponse,
  MerchantStatus,
  CommonResponse as MerchantCommonResponse,
} from '@/types/merchant';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const fetchPayments = async (): Promise<PaymentResponse> => {
  const response = await api.get<PaymentResponse>('/payments/list');
  return response.data;
};

export const fetchPaymentStatuses = async (): Promise<
  CommonResponse<PaymentStatus>
> => {
  const response = await api.get<CommonResponse<PaymentStatus>>(
    '/common/payment-status/all'
  );
  return response.data;
};

export const fetchPaymentTypes = async (): Promise<
  CommonResponse<PaymentType>
> => {
  const response = await api.get<CommonResponse<PaymentType>>(
    '/common/paymemt-type/all'
  );
  return response.data;
};

export const fetchMerchants = async (): Promise<MerchantResponse> => {
  const response = await api.get<MerchantResponse>('/merchants/list');
  return response.data;
};

export const fetchMerchantDetail = async (
  mchtCode: string
): Promise<MerchantDetailResponse> => {
  const response = await api.get<MerchantDetailResponse>(
    `/merchants/details/${mchtCode}`
  );
  return response.data;
};

export const fetchMerchantStatuses = async (): Promise<
  MerchantCommonResponse<MerchantStatus>
> => {
  const response = await api.get<MerchantCommonResponse<MerchantStatus>>(
    '/common/mcht-status/all'
  );
  return response.data;
};
