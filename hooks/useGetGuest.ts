import { Guest } from "@prisma/client";
import { useEffect, useState } from "react";


export const useGetGuest = (id: string | undefined) => {
    const [userData, setUserData] = useState<Guest>();
    try {
        if (!id) {
            return false;
        }
        fetch(`/api/guest/${id}`)
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setUserData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    } catch (error) {
        console.log(error);
    }

    return { userData };
}

