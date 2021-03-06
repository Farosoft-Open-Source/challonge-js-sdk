"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTournament = exports.deleteTournament = exports.getTournament = exports.getAllTournaments = void 0;
const axios_1 = require("axios");
const tournament_object_1 = require("../models/tournament-object");
const API_KEY = process.env.CHALLONGE_API_KEY;
function getAllTournaments() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get("https://api.challonge.com/v1/tournaments.json?api_key=" + API_KEY);
        const list = { tournaments: [] };
        if (Array.isArray(response.data)) {
            response.data.map(tourny => {
                const jsonData = JSON.stringify(tourny);
                const t = JSON.parse(jsonData).tournament;
                tournament_object_1.TournamentParamBuild(t);
                return t;
            }).map(parsedTourney => list.tournaments.push(parsedTourney));
        }
        return list;
    });
}
exports.getAllTournaments = getAllTournaments;
function getTournament({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios_1.default.get("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY)
            .then(response => handleResponse(response))
            .catch(reason => handleError(reason));
    });
}
exports.getTournament = getTournament;
function deleteTournament({ id }) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield axios_1.default.delete("https://api.challonge.com/v1/tournaments/" + id + ".json?api_key=" + API_KEY)
            .then(response => handleResponse(response))
            .catch(reason => handleError(reason));
    });
}
exports.deleteTournament = deleteTournament;
function createTournament(tournament) {
    return __awaiter(this, void 0, void 0, function* () {
        const params = tournament_object_1.TournamentParamBuild(tournament);
        return yield axios_1.default.post("https://api.challonge.com/v1/tournaments.json?api_key=" + API_KEY + "&" + params)
            .then(response => handleResponse(response))
            .catch(reason => handleError(reason));
    });
}
exports.createTournament = createTournament;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleError(reason) {
    console.log(reason);
    return { status: 400, data: {} };
}
function handleResponse(response) {
    if (response.status != 200) {
        return {};
    }
    const jsonData = JSON.stringify(response.data);
    return JSON.parse(jsonData);
}
const tourney = {
    name: "Climbazard"
};
createTournament(tourney).then(response => console.log(response));
