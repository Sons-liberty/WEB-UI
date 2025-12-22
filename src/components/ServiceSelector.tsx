'use client';

import { ServiceInfo, ServicesResponse } from '@/types';

interface ServiceSelectorProps {
  services: ServicesResponse | null;
  selectedService: string | null;
  onServiceSelect: (serviceId: string) => void;
  disabled?: boolean;
}

const categoryIcons = {
  document: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  matting: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" />
    </svg>
  ),
  watermark: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  ),
};

const categoryNames = {
  document: '文档处理',
  matting: '智能抠图',
  watermark: '去水印',
};

const categoryColors = {
  document: 'badge-primary',
  matting: 'badge-secondary',
  watermark: 'badge-accent',
};

export default function ServiceSelector({
  services,
  selectedService,
  onServiceSelect,
  disabled = false,
}: ServiceSelectorProps) {
  if (!services) {
    return (
      <div className="flex justify-center p-8">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="relative space-y-6">
      {/* Fixed H2 Header */}
      <div className="sticky top-0 z-20 bg-base-100/95 backdrop-blur-sm py-4 border-b border-base-200/50 transition-all duration-300">
        <h2 className="text-2xl font-bold text-base-content">选择处理类型</h2>
      </div>

      {Object.entries(services).map(([category, subcategories]) => (
        <div key={category} className="card bg-base-200 shadow-xl transition-all duration-300 hover:shadow-2xl">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-primary transition-transform duration-300 hover:scale-110">
                {categoryIcons[category as keyof typeof categoryIcons]}
              </div>
              <h3 className="card-title text-xl">
                {categoryNames[category as keyof typeof categoryNames]}
              </h3>
              <div className={`badge ${categoryColors[category as keyof typeof categoryColors]} badge-lg`}>
                {Object.values(subcategories).flat().length} 项服务
              </div>
            </div>

            {Object.entries(subcategories).map(([subcategory, serviceList]) => (
              <div key={subcategory} className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                  {(serviceList as ServiceInfo[]).map((service) => (
                    <div key={service.id} className="group relative w-full">
                      <button
                        onClick={() => onServiceSelect(service.id)}
                        disabled={disabled}
                        className={`btn btn-outline w-full h-auto py-3 px-4 flex-col items-start text-left transition-all duration-300 ease-in-out ${
                          selectedService === service.id
                            ? 'btn-primary shadow-lg scale-102 ring-2 ring-primary ring-offset-2'
                            : 'hover:scale-102 hover:bg-base-300'
                        } ${disabled ? 'btn-disabled opacity-50' : ''}`}
                      >
                        <div className="font-bold text-base w-full truncate">{service.name}</div>
                        
                        {/* Selected Indicator */}
                        {selectedService === service.id && (
                          <div className="badge badge-primary badge-sm mt-2 animate-in fade-in zoom-in duration-300">已选择</div>
                        )}
                      </button>

                      {/* Floating Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-3 bg-neutral text-neutral-content text-xs rounded-lg shadow-xl 
                                      opacity-0 invisible
                                      group-hover:opacity-100 group-hover:visible
                                      group-focus-within:opacity-100 group-focus-within:visible
                                      transition-all duration-200 delay-200 ease-out 
                                      z-30 pointer-events-none text-center">
                        <div className="relative z-10 font-medium">
                          {service.description}
                        </div>
                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral rotate-45"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
