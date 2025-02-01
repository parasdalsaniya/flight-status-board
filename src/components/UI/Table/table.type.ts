export interface Column<T> {
    header: string;
    key: string;
    render?: (value: T) => React.ReactNode;
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
}