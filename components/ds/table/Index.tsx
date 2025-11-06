import React from "react";
import { TableHeader } from "./header/Index";
import type { Column } from "./header/Index";

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className="w-full overflow-x-auto overflow-hidden rounded-lg border border-greyscale-700">
      <table className="w-full bg-greyscale-900 text-greyscale-300">
        <TableHeader columns={columns} />
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={row.onClick}
              className="border-b border-greyscale-800 hover:bg-greyscale-800 transition-colors cursor-pointer"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="py-8 px-4 text-sm text-greyscale-400"
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { Table };
