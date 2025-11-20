export interface Payment {
  paymentCode: string;
  mchtCode: string;
  amount: string;
  currency: string;
  payType: string;
  status: string;
  paymentAt: string;
}

export interface PaymentResponse {
  status: number;
  message: string;
  data: Payment[];
}

export interface PaymentStatus {
  code: string;
  description: string;
}

export interface PaymentType {
  type: string;
  description: string;
}

export interface CommonResponse<T> {
  status: number;
  message: string;
  data: T[];
}
