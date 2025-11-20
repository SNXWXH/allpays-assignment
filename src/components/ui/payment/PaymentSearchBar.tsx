import type { PaymentStatus, PaymentType } from '@/types/payment';

interface SearchBarProps {
  searchCode: string;
  onSearchCodeChange: (value: string) => void;
  searchMchtCode: string;
  onSearchMchtCodeChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  selectedDevice: string;
  onDeviceChange: (value: string) => void;
  statuses: PaymentStatus[];
  devices: PaymentType[];
  onSearch: () => void;
  onReset: () => void;
}

export function SearchBar({
  searchCode,
  onSearchCodeChange,
  searchMchtCode,
  onSearchMchtCodeChange,
  selectedStatus,
  onStatusChange,
  selectedDevice,
  onDeviceChange,
  statuses,
  devices,
  onSearch,
  onReset,
}: SearchBarProps) {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 mb-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4'>
        <div>
          <label
            htmlFor='search-code'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            결제코드
          </label>
          <input
            id='search-code'
            type='text'
            placeholder='결제코드를 입력하세요'
            value={searchCode}
            onChange={(e) => onSearchCodeChange(e.target.value)}
            className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none'
          />
        </div>

        <div>
          <label
            htmlFor='search-mcht-code'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            가맹점코드
          </label>
          <input
            id='search-mcht-code'
            type='text'
            placeholder='가맹점코드를 입력하세요'
            value={searchMchtCode}
            onChange={(e) => onSearchMchtCodeChange(e.target.value)}
            className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-500 focus:outline-none'
          />
        </div>

        <div>
          <label
            htmlFor='status-select'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            상태
          </label>
          <select
            id='status-select'
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none cursor-pointer'
          >
            <option value='all'>전체</option>
            {statuses.map((status) => (
              <option key={status.code} value={status.code}>
                {status.description}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor='device-select'
            className='block text-sm font-medium text-gray-700 mb-1'
          >
            결제수단
          </label>
          <select
            id='device-select'
            value={selectedDevice}
            onChange={(e) => onDeviceChange(e.target.value)}
            className='flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none cursor-pointer'
          >
            <option value='all'>전체</option>
            {devices.map((device) => (
              <option key={device.type} value={device.type}>
                {device.description}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className='flex justify-end gap-2'>
        <button
          onClick={onSearch}
          className='flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2 bg-[#646cff] text-white hover:bg-[#535bf2] focus:outline-none focus:ring-2 focus:ring-[#646cff]'
        >
          검색
        </button>
        <button
          onClick={onReset}
          className='flex items-center justify-center rounded-md font-medium transition-colors h-10 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#646cff]'
        >
          초기화
        </button>
      </div>
    </div>
  );
}
