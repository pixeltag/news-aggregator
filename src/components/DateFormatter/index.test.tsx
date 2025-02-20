import React from "react";
import { render, screen } from "@testing-library/react";
import DateFormatter from "../DateFormatter";
import { format } from "date-fns";

describe("DateFormatter Component", () => {
    test("formats a Date object correctly", () => {
        const testDate = new Date(2024, 0, 1); // January 1, 2024
        const formatString = "yyyy-MM-dd";
        const formattedDate = format(testDate, formatString);

        render(<DateFormatter date={testDate} formatString={formatString} />);

        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    test("formats a date string correctly", () => {
        const testDate = "2024-01-01T12:00:00Z";
        const formatString = "yyyy-MM-dd";
        const formattedDate = format(new Date(testDate), formatString);

        render(<DateFormatter date={testDate} formatString={formatString} />);

        expect(screen.getByText(formattedDate)).toBeInTheDocument();
    });

    test("handles invalid date input", () => {
        console.error = jest.fn(); // Suppress expected error messages
        render(<DateFormatter date="invalid-date" formatString="yyyy-MM-dd" />);
        expect(screen.queryByText(/^\d{4}-\d{2}-\d{2}$/)).not.toBeInTheDocument(); // Should not match any valid date
    });
});
