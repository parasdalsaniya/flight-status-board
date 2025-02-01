// Import utilities
import type React from "react"

// Import components, hooks and style
import "./style.css"
import Table from "../UI/Table"
import { Flight } from "../../types/flight.type";
import { Column } from "../UI/Table/table.type";

/**
 * Props interface for the FlightTable component
 * @interface FlightTableProps
 * @property {Flight[]} flights - Array of flight data to display
 * @property {Function} onSelectFlight - Optional callback function when a flight is selected
 */
interface FlightTableProps {
    /** Array of flight data to display */
    flights: Flight[]
    /** Optional callback function when a flight is selected */
    onSelectFlight?: (id: string) => void
}

/**
 * FlightTable Component
 * Displays flight information in a tabular format with sortable columns
 * @param {FlightTableProps} props - Component props
 * @returns {React.ReactElement} Rendered FlightTable component
 */
const FlightTable: React.FC<FlightTableProps> = ({ flights, onSelectFlight }) => {
    // Define table columns configuration
    const columns: Column<Flight>[] = [
        { header: "Flight Number", key: "flightNumber" },
        { header: "Airline", key: "airline" },
        { header: "Origin", key: "origin" },
        { header: "Destination", key: "destination" },
        {
            header: "Departure Time",
            key: "departureTime",
            render: (flight): string => {
                const date = new Date(flight.departureTime);
                return date.toLocaleString('en-GB', {
                    dateStyle: 'medium',
                    timeStyle: 'short'
                }).replace(/\//g, '-');
            }
        },
        {
            header: "Status",
            key: "status",
            render: (flight): React.ReactElement => (
                <span className={`status-badge status-${flight.status.toLowerCase().replace(" ", "-")}`}>
                    {flight.status}
                </span>
            ),
        },
    ];

    /**
     * Handles row click event
     * @param {Flight} flight - Selected flight data
     */
    const handleRowClick = (flight: Flight): void => {
        onSelectFlight?.(flight.id);
    };

    return (
        <>
            <div className="flight-table-container">
                <Table data={flights} columns={columns} onRowClick={handleRowClick} />
            </div>
        </>
    );
}

export default FlightTable

