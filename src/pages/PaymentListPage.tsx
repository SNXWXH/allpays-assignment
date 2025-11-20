import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchBar } from '@/components/SearchBar';
import { PaymentTable } from '@/components/PaymentTable';
import { Pagination } from '@/components/Pagination';
import {
  fetchPayments,
  fetchPaymentStatuses,
  fetchPaymentTypes,
} from '@/services/api';
import type { Payment, PaymentStatus, PaymentType } from '@/types/payment';

const ITEMS_PER_PAGE = 10;

export function PaymentListPage() {
  const navigate = useNavigate();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [statuses, setStatuses] = useState<PaymentStatus[]>([]);
  const [devices, setDevices] = useState<PaymentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchCode, setSearchCode] = useState('');
  const [searchMchtCode, setSearchMchtCode] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDevice, setSelectedDevice] = useState('all');

  const [appliedSearchCode, setAppliedSearchCode] = useState('');
  const [appliedSearchMchtCode, setAppliedSearchMchtCode] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('all');
  const [appliedDevice, setAppliedDevice] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [paymentsRes, statusesRes, devicesRes] = await Promise.all([
          fetchPayments(),
          fetchPaymentStatuses(),
          fetchPaymentTypes(),
        ]);
        setPayments(paymentsRes.data);
        setStatuses(statusesRes.data);
        setDevices(devicesRes.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearch = () => {
    setAppliedSearchCode(searchCode);
    setAppliedSearchMchtCode(searchMchtCode);
    setAppliedStatus(selectedStatus);
    setAppliedDevice(selectedDevice);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchCode('');
    setSearchMchtCode('');
    setSelectedStatus('all');
    setSelectedDevice('all');
    setAppliedSearchCode('');
    setAppliedSearchMchtCode('');
    setAppliedStatus('all');
    setAppliedDevice('all');
    setCurrentPage(1);
  };

  const filteredPayments = useMemo(() => {
    return payments.filter((payment) => {
      const matchesCode = appliedSearchCode
        ? payment.paymentCode
            .toLowerCase()
            .includes(appliedSearchCode.toLowerCase())
        : true;
      const matchesMchtCode = appliedSearchMchtCode
        ? payment.mchtCode
            .toLowerCase()
            .includes(appliedSearchMchtCode.toLowerCase())
        : true;
      const matchesStatus =
        appliedStatus === 'all' ? true : payment.status === appliedStatus;
      const matchesDevice =
        appliedDevice === 'all' ? true : payment.payType === appliedDevice;

      return matchesCode && matchesMchtCode && matchesStatus && matchesDevice;
    });
  }, [
    payments,
    appliedSearchCode,
    appliedSearchMchtCode,
    appliedStatus,
    appliedDevice,
  ]);

  const paginatedPayments = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredPayments.slice(startIndex, endIndex);
  }, [filteredPayments, currentPage]);

  const totalPages = Math.ceil(filteredPayments.length / ITEMS_PER_PAGE);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-lg text-gray-600'>로딩 중</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <div className='text-lg text-red-600'>오류: {error}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex justify-between items-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900'>거래내역 관리</h1>
          <button
            onClick={() => navigate('/')}
            className='px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
          >
            가맹점 관리 &gt;
          </button>
        </div>

        <SearchBar
          searchCode={searchCode}
          onSearchCodeChange={setSearchCode}
          searchMchtCode={searchMchtCode}
          onSearchMchtCodeChange={setSearchMchtCode}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          selectedDevice={selectedDevice}
          onDeviceChange={setSelectedDevice}
          statuses={statuses}
          devices={devices}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className='mb-4 text-sm text-gray-600'>
          총 {filteredPayments.length}개의 결과
        </div>

        <PaymentTable payments={paginatedPayments} />

        {totalPages >= 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
