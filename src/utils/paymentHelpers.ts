import {
  PaymentStatusText,
  PaymentStatusBadgeColor,
  PayTypeText,
  type PaymentStatusType,
  type PayTypeType,
} from '@/constants/payment';

export const getStatusBadgeColor = (status: PaymentStatusType): string => {
  return PaymentStatusBadgeColor[status] || 'bg-gray-100 text-gray-800';
};

export const getStatusText = (status: PaymentStatusType): string => {
  return PaymentStatusText[status] || status;
};

export const getPayTypeText = (payType: PayTypeType): string => {
  return PayTypeText[payType] || payType;
};
