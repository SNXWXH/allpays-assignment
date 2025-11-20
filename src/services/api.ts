import axios, { type AxiosError } from 'axios';
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
import { formatDateTime } from '@/lib/format';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const handleApiError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'API 요청 중 오류가 발생했습니다.';
    throw new Error(message);
  }
  throw new Error('알 수 없는 오류가 발생했습니다.');
};

export const fetchPayments = async (): Promise<PaymentResponse> => {
  try {
    const response = await api.get<PaymentResponse>('/payments/list');

    const formattedData = {
      ...response.data,
      data: response.data.data.map((payment) => ({
        ...payment,
        paymentAt: formatDateTime(payment.paymentAt),
      })),
    };
    return formattedData;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPaymentStatuses = async (): Promise<
  CommonResponse<PaymentStatus>
> => {
  try {
    const response = await api.get<CommonResponse<PaymentStatus>>(
      '/common/payment-status/all'
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchPaymentTypes = async (): Promise<
  CommonResponse<PaymentType>
> => {
  try {
    const response = await api.get<CommonResponse<PaymentType>>(
      '/common/paymemt-type/all'
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchMerchants = async (): Promise<MerchantResponse> => {
  try {
    const response = await api.get<MerchantResponse>('/merchants/list');

    const formattedData = {
      ...response.data,
      data: response.data.data.map((merchant) => ({
        ...merchant,
        createdAt: formatDateTime(merchant.createdAt),
      })),
    };
    return formattedData;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchMerchantDetail = async (
  mchtCode: string
): Promise<MerchantDetailResponse> => {
  try {
    const response = await api.get<MerchantDetailResponse>(
      `/merchants/details/${mchtCode}`
    );

    const formattedData = {
      ...response.data,
      data: {
        ...response.data.data,
        registeredAt: formatDateTime(response.data.data.registeredAt),
        updatedAt: formatDateTime(response.data.data.updatedAt),
      },
    };
    return formattedData;
  } catch (error) {
    return handleApiError(error);
  }
};

export const fetchMerchantStatuses = async (): Promise<
  MerchantCommonResponse<MerchantStatus>
> => {
  try {
    const response = await api.get<MerchantCommonResponse<MerchantStatus>>(
      '/common/mcht-status/all'
    );
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};
