import React from "react";

interface Column {
  key: string;
  label: string;
}

interface TableHeaderProps {
  columns: Column[];
}

const TableHeader: React.FC<TableHeaderProps> = ({ columns }) => {
  return (
    <thead className="bg-primary-cBlack">
      <tr className="border-b border-greyscale-800">
        {columns.map((column) => (
          <th
            key={column.key}
            className="text-left py-4 px-4 text-primary-doctor font-semibold text-sm"
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export { TableHeader };
export type { Column };
