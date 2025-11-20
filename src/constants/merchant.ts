export const MerchantStatus = {
  READY: 'READY',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  CLOSED: 'CLOSED',
} as const;

export type MerchantStatusType =
  (typeof MerchantStatus)[keyof typeof MerchantStatus];

export const MerchantStatusText: Record<string, string> = {
  [MerchantStatus.READY]: '대기',
  [MerchantStatus.ACTIVE]: '활성',
  [MerchantStatus.INACTIVE]: '중지',
  [MerchantStatus.CLOSED]: '폐기',
};

export const MerchantStatusBadgeColor: Record<string, string> = {
  [MerchantStatus.READY]: 'bg-gray-100 text-gray-800',
  [MerchantStatus.ACTIVE]: 'bg-green-100 text-green-800',
  [MerchantStatus.INACTIVE]: 'bg-gray-100 text-gray-800',
  [MerchantStatus.CLOSED]: 'bg-red-100 text-red-800',
};

export const MerchantDetailStatusText: Record<string, string> = {
  READY: '대기',
  ACTIVE: '활성',
  INACTIVE: '비활성',
  SUSPENDED: '정지',
};

export const MerchantDetailStatusBadgeColor: Record<string, string> = {
  READY: 'bg-gray-100 text-gray-800',
  ACTIVE: 'bg-green-100 text-green-800',
  INACTIVE: 'bg-gray-100 text-gray-800',
  SUSPENDED: 'bg-red-100 text-red-800',
};
