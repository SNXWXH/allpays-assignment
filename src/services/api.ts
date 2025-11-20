import axios from 'axios';
import type {
  PaymentResponse,
  CommonResponse,
  PaymentStatus,
  PaymentType,
} from '@/types/payment';

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
