import { AxiosResponse } from "axios";

export interface TournamentId {
    id: number
}

export interface ParticipantId {
    participant_id: number
}

export interface MatchId {
    match_id: number
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function handleError(reason: AxiosResponse): any {
    console.log(reason);
    return { status: 400, data: {} };
}

export function handleResponse<T>(response: AxiosResponse): T  {
    if (response.status != 200) {
        return JSON.parse("{}");
    }

    const jsonData = JSON.stringify(response.data);
    return JSON.parse(jsonData);
}