import { format } from 'date-fns';

export const formatDate = (dateString, dateFormat = 'dd/MM/yyyy') => {
    if (!dateString) return 'Invalid date';
    try {
        return format(new Date(dateString), dateFormat);
    } catch (error) {
        console.error('Date formatting error:', error.message);
        return 'Invalid date';
    }
};