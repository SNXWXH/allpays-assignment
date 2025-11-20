export const PaymentStatus = {
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
} as const;

export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];

export const PayType = {
  DEVICE: 'DEVICE',
  MOBILE: 'MOBILE',
  ONLINE: 'ONLINE',
  BILLING: 'BILLING',
  VACT: 'VACT',
} as const;

export type PayTypeType = (typeof PayType)[keyof typeof PayType];

export const PaymentStatusText: Record<PaymentStatusType, string> = {
  [PaymentStatus.SUCCESS]: '결제 완료',
  [PaymentStatus.FAILED]: '결제 실패',
  [PaymentStatus.CANCELLED]: '환불 완료',
  [PaymentStatus.PENDING]: '결제 대기',
};

export const PayTypeText: Record<PayTypeType, string> = {
  [PayType.DEVICE]: '단말기',
  [PayType.MOBILE]: '모바일',
  [PayType.ONLINE]: '온라인',
  [PayType.BILLING]: '정기결제',
  [PayType.VACT]: '가상계좌',
};

export const PaymentStatusBadgeColor: Record<PaymentStatusType, string> = {
  [PaymentStatus.SUCCESS]: 'bg-green-100 text-green-800',
  [PaymentStatus.FAILED]: 'bg-red-100 text-red-800',
  [PaymentStatus.CANCELLED]: 'bg-gray-100 text-gray-800',
  [PaymentStatus.PENDING]: 'bg-yellow-100 text-yellow-800',
};
