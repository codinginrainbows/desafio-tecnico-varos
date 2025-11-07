import React, { useState } from "react";
import { SingleSelect } from "@/components/ds/select/single-select/Index";
import type { SingleSelectOption } from "@/components/ds/select/single-select/Index";

interface FiltersProps {
  onFilterChange?: (filters: FilterValues) => void;
  nameOptions?: SingleSelectOption[];
  emailOptions?: SingleSelectOption[];
}

export interface FilterValues {
  consultorName: string;
  consultorEmail: string;
  startDate: string;
  endDate: string;
}

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  nameOptions = [],
  emailOptions = [],
}) => {
  const [filters, setFilters] = useState<FilterValues>({
    consultorName: "",
    consultorEmail: "",
    startDate: "",
    endDate: "",
  });

  const handleFilterChange = (field: keyof FilterValues, value: string) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  return (
    <div className="w-full bg-gray-950 px-3 py-3 rounded-lg border border-gray-700">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 lg:gap-6">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0">
          <label className="text-white text-sm font-semibold whitespace-nowrap shrink-0">
            Nome do Consultor
          </label>
          <div className="flex-1 min-w-0">
            <SingleSelect
              options={nameOptions}
              value={filters.consultorName}
              onChange={(value) => handleFilterChange("consultorName", value)}
              placeholder="Nome do consultor"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-1 min-w-0">
          <label className="text-white text-sm font-semibold whitespace-nowrap shrink-0">
            Email do Consultor
          </label>
          <div className="flex-1 min-w-0">
            <SingleSelect
              options={emailOptions}
              value={filters.consultorEmail}
              onChange={(value) => handleFilterChange("consultorEmail", value)}
              placeholder="Email do consultor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
