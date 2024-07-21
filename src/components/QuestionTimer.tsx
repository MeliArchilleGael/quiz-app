import {useEffect, useState} from 'react';
import {formatRemainingTime} from "@/src/lib/util";

function QuestionTimer({timer, label, timeEnd}: { timer: number, label: string, timeEnd: () => void }) {
    const [remainingTime, setRemainingTime] = useState<number>(0);

    useEffect(() => {
        // Set the session end time (e.g., 30 minutes from now)
        let interval: any
        const getEndDate = async () => {
            try {
                let timeLeft = timer
                interval = setInterval(() => {
                    timeLeft = timeLeft - 1000

                    if (timeLeft <= 0) {
                        // Session has ended
                        clearInterval(interval);
                        setRemainingTime(0);
                        timeEnd();
                    } else {
                        setRemainingTime(timeLeft);
                    }
                }, 1000);

            } catch (error: any) {
                console.log("Error while fetching the data from session ", error)
                return ""
            }
        }

        getEndDate()

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [timer]);

    // Format the remaining time in a human-readable format
    const formattedRemainingTime = formatRemainingTime(remainingTime);

    return (
        <h2 className="text-center text-lg">{label} :
            <span className="font-bold"> {formattedRemainingTime}</span>
        </h2>
    );
}

export default QuestionTimer;
