"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentParamBuild = void 0;
function TournamentParamBuild(tournament) {
    const valueArray = Object.keys(tournament);
    const tournamentParams = valueArray.map((key) => `tournament[${key}]=${tournament[key]}`).join("&");
    console.log(tournamentParams);
    return tournamentParams;
}
exports.TournamentParamBuild = TournamentParamBuild;
