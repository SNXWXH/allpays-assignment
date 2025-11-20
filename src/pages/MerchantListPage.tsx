import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MerchantSearchBar } from '@/components/merchant/MerchantSearchBar';
import { MerchantTable } from '@/components/merchant/MerchantTable';
import { MerchantDetailModal } from '@/components/merchant/MerchantDetailModal';
import { Pagination } from '@/components/Pagination';
import {
  fetchMerchants,
  fetchMerchantDetail,
  fetchMerchantStatuses,
} from '@/services/api';
import type {
  Merchant,
  MerchantDetail,
  MerchantStatus,
} from '@/types/merchant';

const ITEMS_PER_PAGE = 10;

export function MerchantListPage() {
  const navigate = useNavigate();
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [statuses, setStatuses] = useState<MerchantStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchCode, setSearchCode] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [appliedSearchCode, setAppliedSearchCode] = useState('');
  const [appliedSearchName, setAppliedSearchName] = useState('');
  const [appliedStatus, setAppliedStatus] = useState('all');

  const [currentPage, setCurrentPage] = useState(1);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] =
    useState<MerchantDetail | null>(null);
  const [modalLoading, setModalLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [merchantsRes, statusesRes] = await Promise.all([
          fetchMerchants(),
          fetchMerchantStatuses(),
        ]);
        setMerchants(merchantsRes.data);
        setStatuses(statusesRes.data);
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
    setAppliedSearchName(searchName);
    setAppliedStatus(selectedStatus);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearchCode('');
    setSearchName('');
    setSelectedStatus('all');
    setAppliedSearchCode('');
    setAppliedSearchName('');
    setAppliedStatus('all');
    setCurrentPage(1);
  };

  const handleRowClick = async (mchtCode: string) => {
    setIsModalOpen(true);
    setModalLoading(true);
    setSelectedMerchant(null);

    try {
      const detailRes = await fetchMerchantDetail(mchtCode);
      setSelectedMerchant(detailRes.data);
    } catch (err) {
      console.error('Failed to load merchant detail:', err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMerchant(null);
  };

  const filteredMerchants = useMemo(() => {
    return merchants.filter((merchant) => {
      const matchesCode = appliedSearchCode
        ? merchant.mchtCode
            .toLowerCase()
            .includes(appliedSearchCode.toLowerCase())
        : true;
      const matchesName = appliedSearchName
        ? merchant.mchtName
            .toLowerCase()
            .includes(appliedSearchName.toLowerCase())
        : true;
      const matchesStatus =
        appliedStatus === 'all' ? true : merchant.status === appliedStatus;

      return matchesCode && matchesName && matchesStatus;
    });
  }, [merchants, appliedSearchCode, appliedSearchName, appliedStatus]);

  const paginatedMerchants = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredMerchants.slice(startIndex, endIndex);
  }, [filteredMerchants, currentPage]);

  const totalPages = Math.ceil(filteredMerchants.length / ITEMS_PER_PAGE);

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
          <h1 className='text-3xl font-bold text-gray-900'>가맹점 관리</h1>
          <button
            onClick={() => navigate('/payments')}
            className='px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors'
          >
            거래내역 관리 &gt;
          </button>
        </div>

        <MerchantSearchBar
          searchCode={searchCode}
          onSearchCodeChange={setSearchCode}
          searchName={searchName}
          onSearchNameChange={setSearchName}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
          statuses={statuses}
          onSearch={handleSearch}
          onReset={handleReset}
        />

        <div className='mb-4 text-sm text-gray-600'>
          총 {filteredMerchants.length}개의 결과
        </div>

        <MerchantTable
          merchants={paginatedMerchants}
          onRowClick={handleRowClick}
        />

        {totalPages >= 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}

        <MerchantDetailModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          merchantDetail={selectedMerchant}
          loading={modalLoading}
        />
      </div>
    </div>
  );
}
