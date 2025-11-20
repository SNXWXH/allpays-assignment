import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Merchant } from '@/types/merchant';

interface MerchantTableProps {
  merchants: Merchant[];
  onRowClick: (mchtCode: string) => void;
}

export function MerchantTable({ merchants, onRowClick }: MerchantTableProps) {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'READY':
        return 'bg-gray-100 text-gray-800';
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800';
      case 'CLOSED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'READY':
        return '대기';
      case 'ACTIVE':
        return '활성';
      case 'INACTIVE':
        return '중지';
      case 'CLOSED':
        return '폐기';
      default:
        return status;
    }
  };

  if (merchants.length === 0) {
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
              가맹점코드
            </TableHead>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              가맹점명
            </TableHead>
            <TableHead className='font-semibold text-gray-700 h-14 px-4'>
              상태
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {merchants.map((merchant) => (
            <TableRow
              key={merchant.mchtCode}
              onClick={() => onRowClick(merchant.mchtCode)}
              className='cursor-pointer hover:bg-gray-50'
            >
              <TableCell className='font-medium py-4 px-4'>
                {merchant.mchtCode}
              </TableCell>
              <TableCell className='py-4 px-4'>{merchant.mchtName}</TableCell>
              <TableCell className='py-4 px-4'>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(
                    merchant.status
                  )}`}
                >
                  {getStatusText(merchant.status)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
