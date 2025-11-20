import { Modal } from '@/components/Modal';
import type { MerchantDetail } from '@/types/merchant';
import {
  getDetailStatusBadgeColor,
  getDetailStatusText,
} from '@/utils/merchantHelpers';

interface MerchantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchantDetail: MerchantDetail | null;
  loading: boolean;
}

export function MerchantDetailModal({
  isOpen,
  onClose,
  merchantDetail,
  loading,
}: MerchantDetailModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose} title='가맹점 상세 정보'>
      {loading ? (
        <div className='text-center py-8 text-gray-600'>로딩 중...</div>
      ) : merchantDetail ? (
        <div className='space-y-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-500 mb-1'>
                가맹점코드
              </label>
              <p className='text-base text-gray-900'>
                {merchantDetail.mchtCode}
              </p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-500 mb-1'>
                가맹점명
              </label>
              <p className='text-base text-gray-900'>
                {merchantDetail.mchtName}
              </p>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-500 mb-1'>
              상태
            </label>
            <span
              className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getDetailStatusBadgeColor(
                merchantDetail.status
              )}`}
            >
              {getDetailStatusText(merchantDetail.status)}
            </span>
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  사업자번호
                </label>
                <p className='text-base text-gray-900'>
                  {merchantDetail.businessNumber}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  대표자명
                </label>
                <p className='text-base text-gray-900'>
                  {merchantDetail.representative}
                </p>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-500 mb-1'>
                전화번호
              </label>
              <p className='text-base text-gray-900'>{merchantDetail.phone}</p>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-500 mb-1'>
                이메일
              </label>
              <p className='text-base text-gray-900'>{merchantDetail.email}</p>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-500 mb-1'>
              주소
            </label>
            <p className='text-base text-gray-900'>{merchantDetail.address}</p>
          </div>

          <div className='border-t border-gray-200 pt-4'>
            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  등록일시
                </label>
                <p className='text-base text-gray-900'>
                  {merchantDetail.registeredAt}
                </p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-500 mb-1'>
                  수정일시
                </label>
                <p className='text-base text-gray-900'>
                  {merchantDetail.updatedAt}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center py-8 text-gray-600'>
          데이터를 불러올 수 없습니다.
        </div>
      )}
    </Modal>
  );
}
