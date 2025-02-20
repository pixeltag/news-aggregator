import React from 'react';
import { format, isValid } from 'date-fns';

interface DateFormatterProps {
    date: Date | string; // Accept both Date object or date string
    formatString: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ date, formatString }) => {
    const parsedDate = typeof date === "string" ? new Date(date) : date;
    if (!isValid(parsedDate)) {
        return <span>Invalid Date</span>;
    }

    return <span>{format(parsedDate, formatString)}</span>;
};

export default DateFormatter;
