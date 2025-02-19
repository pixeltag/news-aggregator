import React from 'react';
import { format } from 'date-fns';

interface DateFormatterProps {
    date: Date | string; // Accept both Date object or date string
    formatString: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ date, formatString }) => {
    // Ensure the date is a Date object
    const parsedDate = typeof date === 'string' ? new Date(date) : date;

    // Format the date using date-fns
    const formattedDate = format(parsedDate, formatString);

    return <span>{formattedDate}</span>;
};

export default DateFormatter;
