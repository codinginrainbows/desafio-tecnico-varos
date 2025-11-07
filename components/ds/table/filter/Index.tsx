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
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 flex-1">
          <label className="text-white text-sm font-semibold whitespace-nowrap">
            Nome do Consultor
          </label>
          <SingleSelect
            options={nameOptions}
            value={filters.consultorName}
            onChange={(value) => handleFilterChange("consultorName", value)}
            placeholder="Nome do consultor"
          />
        </div>

        <div className="flex items-center gap-3 flex-1">
          <label className="text-white text-sm font-semibold whitespace-nowrap">
            Email do Consultor
          </label>
          <SingleSelect
            options={emailOptions}
            value={filters.consultorEmail}
            onChange={(value) => handleFilterChange("consultorEmail", value)}
            placeholder="Email do consultor"
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
