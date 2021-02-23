import axios from "axios";
import { TournamentList } from "../models/tournament-list";
import { TournamentObject } from "../models/tournament";
import { TournamentResponse } from "../models/tournament-response";
const API_KEY = process.env.CHALLONGE_API_KEY;

export async function getAll(): Promise<TournamentList> {
    const response = await axios.get("https://api.challonge.com/v1/tournaments.json?api_key=" + API_KEY);

    const list: TournamentList = { tournaments: []};

    if (Array.isArray(response.data)) {
        response.data.map(tourny => {
            const jsonData = JSON.stringify(tourny);
            const t:TournamentObject = JSON.parse(jsonData).tournament
            return t;
        }).map(parsedTourney => list.tournaments.push(parsedTourney));
    } 

    return list;
}


export async function get({id}: TournamentId): Promise<TournamentResponse> {
    
    const response = await axios.get("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY).catch(reason => {
        console.log(reason);
        return { status: 400, data: {} };
    });

    if (response.status != 200) {
        return {};
    }

    const jsonData = JSON.stringify(response.data);
    return JSON.parse(jsonData);
}

export async function deleteTournament({id}: TournamentId): Promise<TournamentResponse> {
    const response = await axios.delete("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY).catch(reason => {
        console.log(reason);
        return { status: 400, data: {} };
    });

    if (response.status != 200) {
        return {};
    }

    const jsonData = JSON.stringify(response.data);
    return JSON.parse(jsonData);
}

interface TournamentId {
    id: number
}


get({id: 9094424}).then(list => console.log(list));
