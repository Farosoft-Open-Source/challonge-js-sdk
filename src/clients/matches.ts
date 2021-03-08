import axios from "axios";
import { MatchList } from "../models/match-list";
import { MatchObject, MatchParamBuilder } from "../models/match-object";
import { MatchResponse } from "../models/match-response";
import { TournamentId, handleError, handleResponse, MatchId, ParticipantId } from "../models/sdk-commons";

const API_KEY = process.env.CHALLONGE_API_KEY;

export async function getAllMatches({id}: TournamentId): Promise<MatchList> {
    const response = await axios.get(`https://api.challonge.com/v1/tournaments/${id}/matches.json?api_key=` + API_KEY);

    const list: MatchList = { matches: [] };

    if (Array.isArray(response.data)) {
        response.data.map(match => {
            const jsonData = JSON.stringify(match);
            const m:MatchObject = JSON.parse(jsonData).match
            return m;
        }).map(parsedMatch => list.matches.push(parsedMatch));
    } 

    return list;
}

export async function getMatch({id}: TournamentId, {match_id}: MatchId): Promise<MatchResponse> {
    return await axios.get(`https://api.challonge.com/v1/tournaments/${id}/matches/${match_id}.json?api_key=` + API_KEY)
    .then(response => handleResponse<MatchResponse>(response))
    .catch(reason => handleError(reason));
}

export async function updateMatch({id}: TournamentId, {match_id}: MatchId, match: MatchObject): Promise<MatchResponse> {
    const matchParams = MatchParamBuilder(match);
    return await axios.put(`https://api.challonge.com/v1/tournaments/${id}/matches/${match_id}.json?api_key=` + API_KEY + "&" + matchParams)
    .then(response => handleResponse<MatchResponse>(response))
    .catch(reason => handleError(reason));
}

export async function markMatchUnderway({id}: TournamentId, {match_id}: MatchId): Promise<MatchResponse> {
    return await axios.post(`https://api.challonge.com/v1/tournaments/${id}/matches/${match_id}/mark_as_underway.json?api_key=` + API_KEY)
    .then(response => handleResponse<MatchResponse>(response))
    .catch(reason => handleError(reason));
}

export async function unMarkMatchUnderway({id}: TournamentId, {match_id}: MatchId): Promise<MatchResponse> {
    return await axios.post(`https://api.challonge.com/v1/tournaments/${id}/matches/${match_id}/unmark_as_underway.json?api_key=` + API_KEY)
    .then(response => handleResponse<MatchResponse>(response))
    .catch(reason => handleError(reason));
}

export async function reopenMatch({id}: TournamentId, {match_id}: MatchId): Promise<MatchResponse> {
    return await axios.post(`https://api.challonge.com/v1/tournaments/${id}/matches/${match_id}/reopen.json?api_key=` + API_KEY)
    .then(response => handleResponse<MatchResponse>(response))
    .catch(reason => handleError(reason));
}