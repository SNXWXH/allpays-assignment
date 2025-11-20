import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import type { Payment } from '@/types/payment';
import { formatCurrency, formatDateTime } from '@/lib/format';

interface PaymentTableProps {
  payments: Payment[];
}

export function PaymentTable({ payments }: PaymentTableProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return 'bg-green-100 text-green-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return '결제 완료';
      case 'FAILED':
        return '결제 실패';
      case 'CANCELLED':
        return '환불 완료';
      case 'PENDING':
        return '결제 대기';
      default:
        return status;
    }
  };

  const getPayTypeText = (payType: string) => {
    switch (payType) {
      case 'DEVICE':
        return '단말기';
      case 'MOBILE':
        return '모바일';
      case 'ONLINE':
        return '온라인';
      case 'BILLING':
        return '정기결제';
      case 'VACT':
        return '가상계좌';
      default:
        return payType;
    }
  };

  if (payments.length === 0) {
    return (
      <div className='text-center py-12 text-gray-500'>
        검색 결과가 없습니다.
      </div>
    );
  }

  return (
    <div className='rounded-lg border border-gray-200 overflow-hidden'>
      <Table>
        <TableHeader>
          <TableRow className='bg-gray-100 hover:bg-gray-100'>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              결제코드
            </TableHead>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              가맹점코드
            </TableHead>
            <TableHead className='font-semibold text-gray-700 text-right h-14 px-4'>
              금액
            </TableHead>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              통화
            </TableHead>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              결제수단
            </TableHead>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              상태
            </TableHead>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              결제일시
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.paymentCode}>
              <TableCell className='font-medium py-4 px-4'>
                {payment.paymentCode}
              </TableCell>
              <TableCell className='py-4 px-4'>{payment.mchtCode}</TableCell>
              <TableCell className='text-right py-4 px-4'>
                {formatCurrency(payment.amount, payment.currency)}
              </TableCell>
              <TableCell className='py-4 px-4'>{payment.currency}</TableCell>
              <TableCell className='py-4 px-4'>
                {getPayTypeText(payment.payType)}
              </TableCell>
              <TableCell className='py-4 px-4'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                    payment.status
                  )}`}
                >
                  {getStatusText(payment.status)}
                </span>
              </TableCell>
              <TableCell className='py-4 px-4'>
                {formatDateTime(payment.paymentAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
