
import Swal from 'sweetalert2';

export function formatRemainingTime(timeInMs: number): string {
    const totalSeconds = Math.floor(timeInMs / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return [
        days > 0 ? `${days} jour${days > 1 ? 's' : ''}` : '',
        hours > 0 ? hours.toString().padStart(2, '0') : '',
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0'),
    ]
        .filter(Boolean)
        .join(':');
}

export function slug(text: string) {
    return text
        .toLowerCase()                     // Convert to lowercase
        .trim()                            // Remove whitespace from both ends
        .replace(/[\s-]+/g, '-')           // Replace spaces and multiple hyphens with a single hyphen
        .replace(/[^\w-]+/g, '')           // Remove all non-word chars (except hyphen)
        .replace(/^-+|-+$/g, '');          // Remove leading and trailing hyphens
}


export const showToast = (title: string, icon: 'success' | 'error' | 'info' | 'warning' | 'question') => {
    Swal.fire({
        title: title,
        toast: true,
        position: 'top-end',
        icon: icon,
        showConfirmButton: false,
        timer: 5000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });
};