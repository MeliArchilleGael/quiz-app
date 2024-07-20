
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