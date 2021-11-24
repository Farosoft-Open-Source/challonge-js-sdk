import axios from "axios";
import { TournamentId, handleError, handleResponse } from "../models/sdk-commons";
import { TournamentList } from "../models/tournament-list";
import { TournamentObject, TournamentParamBuilder } from "../models/tournament-object";
import { TournamentResponse } from "../models/tournament-response";
const API_KEY = process.env.CHALLONGE_API_KEY;

export async function getAllTournaments(): Promise<TournamentList> {
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

export async function getTournament({id}: TournamentId): Promise<TournamentResponse> {
    return await axios.get("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY + "&include_participants=1&include_matches=1")
    .then(response => handleResponse<TournamentResponse>(response))
    .catch(reason => handleError(reason));
}

export async function deleteTournament({id}: TournamentId): Promise<TournamentResponse> {
    return await axios.delete("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY)
    .then(response => handleResponse<TournamentResponse>(response))
    .catch(reason => handleError(reason));
}

export async function createTournament(tournament: TournamentObject): Promise<TournamentResponse> {
    const params = TournamentParamBuilder(tournament);
    return await axios.post("https://api.challonge.com/v1/tournaments.json?api_key="+ API_KEY + "&" + params)
    .then(response => handleResponse<TournamentResponse>(response))
    .catch(reason => handleError(reason));
}

export async function updateTournament(id: number, tournament: TournamentObject): Promise<TournamentResponse> {
    const params = TournamentParamBuilder(tournament);
    return await axios.put(`https://api.challonge.com/v1/tournaments/${id}.json?api_key=`+ API_KEY + "&" + params)
    .then(response => handleResponse<TournamentResponse>(response))
    .catch(reason => handleError(reason));
}

export async function startTournament({id}: TournamentId): Promise<TournamentResponse> {
    return await axios.post("https://api.challonge.com/v1/tournaments/" + id + "/start.json?api_key=" + API_KEY + "&include_participants=1&include_matches=1")
    .then(response => handleResponse<TournamentResponse>(response))
    .catch(reason => handleError(reason));
}

export async function resetTournament({id}: TournamentId): Promise<TournamentResponse> {
    return await axios.post("https://api.challonge.com/v1/tournaments/" + id + "/reset.json?api_key=" + API_KEY + "&include_participants=1&include_matches=1")
    .then(response => handleResponse<TournamentResponse>(response))
    .catch(reason => handleError(reason));
}

export async function finalizeTournament({id}: TournamentId): Promise<TournamentResponse> {
    return await axios.post("https://api.challonge.com/v1/tournaments/" + id + "/finalize.json?api_key=" + API_KEY + "&include_participants=1&include_matches=1")
    .then(response => handleResponse<TournamentResponse>(response))
    .catch(reason => handleError(reason));
}
