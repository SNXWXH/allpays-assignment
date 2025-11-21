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
import { toast } from '@/hooks/use-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const handleApiError = (error: unknown, context: string): void => {
  let errorMessage = '알 수 없는 오류가 발생했습니다.';

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    errorMessage =
      axiosError.response?.data?.message ||
      axiosError.message ||
      'API 요청 중 오류가 발생했습니다.';

    console.error(`[API Error - ${context}]`, {
      message: errorMessage,
      status: axiosError.response?.status,
      statusText: axiosError.response?.statusText,
      data: axiosError.response?.data,
      config: {
        url: axiosError.config?.url,
        method: axiosError.config?.method,
      },
    });
  } else {
    console.error(`[API Error - ${context}]`, error);
  }

  toast({
    variant: 'destructive',
    title: '오류 발생',
    description: errorMessage,
  });
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
    handleApiError(error, 'fetchPayments');
    return { data: [], message: '', status: 0 };
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
    handleApiError(error, 'fetchPaymentStatuses');
    return { data: [], message: '', status: 0 };
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
    handleApiError(error, 'fetchPaymentTypes');
    return { data: [], message: '', status: 0 };
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
    handleApiError(error, 'fetchMerchants');
    return { data: [], message: '', status: '' };
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
    handleApiError(error, 'fetchMerchantDetail');
    return {
      data: {
        mchtCode: '',
        mchtName: '',
        status: '',
        businessNumber: '',
        representative: '',
        phone: '',
        email: '',
        address: '',
        registeredAt: '',
        updatedAt: '',
      },
      message: '',
      status: '',
    };
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
    handleApiError(error, 'fetchMerchantStatuses');
    return { data: [], message: '', status: '' };
  }
};
