import {useEffect, useState} from 'react';
import {getSession} from "@/src/actions/session";
import {formatRemainingTime} from "@/src/lib/util";
import {useSession} from "next-auth/react";

function AccessTimer() {
    const [remainingTime, setRemainingTime] = useState<number>(0);

    const {data: session, status} = useSession();

    useEffect(() => {

        console.log("Here is the session ", session)
        let interval: any
        const getEndDate = async () => {
            console.log("status ", status)
            try {
                if (status !== "loading") {
                    const endDate = await getSession()

                    const sessionEndTime = new Date(endDate.data.access[0].endDate).getTime();

                    // Update the remaining time every second
                    interval = setInterval(() => {
                        const currentTime = new Date().getTime();
                        const timeLeft = sessionEndTime - currentTime;

                        if (timeLeft <= 0) {
                            // Session has ended
                            clearInterval(interval);
                            setRemainingTime(0);
                        } else {
                            setRemainingTime(timeLeft);
                        }
                    }, 1000);
                }

            } catch (error: any) {
                console.log("Error while fetching the data from session ", error)
                return ""
            }
        }

        getEndDate()

        // Clean up the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [status]);

    // Format the remaining time in a human-readable format
    const formattedRemainingTime = formatRemainingTime(remainingTime);

    return (
        <h2 className="text-center text-lg">Votre accéss a la plateforme expire dans :
            <span className="font-bold"> {formattedRemainingTime}</span>
        </h2>
    );
}

export default AccessTimer;
