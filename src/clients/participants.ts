import axios from "axios";
import { ParticipantList } from "../models/participant-list";
import { ParticipantObject, ParticipantParamBuilder } from "../models/participant-object";
import { ParticipantResponse } from "../models/participant-response";
import { TournamentId, handleError, handleResponse, ParticipantId } from "../models/sdk-commons";

const API_KEY = process.env.CHALLONGE_API_KEY;

export async function getAllParticipants({id}: TournamentId): Promise<ParticipantList> {
    const response = await axios.get(`https://api.challonge.com/v1/tournaments/${id}/participants.json?api_key=` + API_KEY);

    const list: ParticipantList = { participants: [] };

    if (Array.isArray(response.data)) {
        response.data.map(participant => {
            const jsonData = JSON.stringify(participant);
            const p:ParticipantObject = JSON.parse(jsonData).participant
            return p;
        }).map(parsedParticipant => list.participants.push(parsedParticipant));
    } 

    return list;
}

export async function createParticipant({id}: TournamentId, participant: ParticipantObject): Promise<ParticipantResponse> {
    const participantParams = ParticipantParamBuilder(participant);
    return await axios.post(`https://api.challonge.com/v1/tournaments/${id}/participants.json?api_key=` + API_KEY + "&" + participantParams)
    .then(response => handleResponse<ParticipantResponse>(response))
    .catch(reason => handleError(reason));
}

export async function getParticipant({id}: TournamentId, {participant_id}: ParticipantId): Promise<ParticipantResponse> {
    return await axios.get(`https://api.challonge.com/v1/tournaments/${id}/participants/${participant_id}.json?api_key=` + API_KEY + "&include_matches=1")
    .then(response => handleResponse<ParticipantResponse>(response))
    .catch(reason => handleError(reason));
}

export async function updateParticipant({id}: TournamentId, {participant_id}: ParticipantId, participant: ParticipantObject): Promise<ParticipantResponse> {
    const participantParams = ParticipantParamBuilder(participant);
    return await axios.put(`https://api.challonge.com/v1/tournaments/${id}/participants/${participant_id}.json?api_key=` + API_KEY + "&" + participantParams)
    .then(response => handleResponse<ParticipantResponse>(response))
    .catch(reason => handleError(reason));
}

export async function randomizeParticipants({id}: TournamentId): Promise<ParticipantResponse> {
    return await axios.post(`https://api.challonge.com/v1/tournaments/${id}/participants/randomize.json?api_key=` + API_KEY)
    .then(response => handleResponse<ParticipantResponse>(response))
    .catch(reason => handleError(reason));
}

export async function removeParticipant({id}: TournamentId, {participant_id}: ParticipantId): Promise<ParticipantResponse> {
    return await axios.delete(`https://api.challonge.com/v1/tournaments/${id}/participants/${participant_id}.json?api_key=` + API_KEY + "&include_matches=1")
    .then(response => handleResponse<ParticipantResponse>(response))
    .catch(reason => handleError(reason));
}

export async function removeAllParticipants({id}: TournamentId): Promise<ParticipantResponse> {
    return await axios.delete(`https://api.challonge.com/v1/tournaments/${id}/participants/clear.json?api_key=` + API_KEY)
    .then(response => handleResponse<ParticipantResponse>(response))
    .catch(reason => handleError(reason));
}

removeAllParticipants({id: 9508830}).then(response => console.log(response));