// Import style and type
import "./style.css";
import { TableProps } from "./table.type";

/**
 * A reusable table component that renders data in a tabular format
 * @template T - The type of data being displayed in the table
 * @param props - The table component props
 * @param props.data - Array of data items to be displayed
 * @param props.columns - Configuration for table columns
 * @param props.onRowClick - Optional callback function when a row is clicked
 * @returns A styled table component
 */
function Table<T>({ data, columns, onRowClick }: TableProps<T>): JSX.Element {
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column.key}>{column.header}</th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {data.map((item, index) => (
                        <tr 
                            key={index} 
                            onClick={() => onRowClick?.(item)}
                        >
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {/* Use render function if provided, otherwise access property directly */}
                                    {column.render
                                        ? column.render(item)
                                        : (item as any)[column.key]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Table; 