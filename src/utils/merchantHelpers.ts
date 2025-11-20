import {
  MerchantStatusText,
  MerchantStatusBadgeColor,
  MerchantDetailStatusText,
  MerchantDetailStatusBadgeColor,
} from '@/constants/merchant';

export const getStatusBadgeColor = (status: string): string => {
  return MerchantStatusBadgeColor[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusText = (status: string): string => {
  return MerchantStatusText[status] || status;
};

export const getDetailStatusBadgeColor = (status: string): string => {
  return MerchantDetailStatusBadgeColor[status] || 'bg-gray-100 text-gray-800';
};

export const getDetailStatusText = (status: string): string => {
  return MerchantDetailStatusText[status] || status;
};
