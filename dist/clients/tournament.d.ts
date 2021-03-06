import { TournamentList } from "../models/tournament-list";
import { TournamentObject } from "../models/tournament-object";
import { TournamentResponse } from "../models/tournament-response";
export declare function getAllTournaments(): Promise<TournamentList>;
export declare function getTournament({ id }: TournamentId): Promise<TournamentResponse>;
export declare function deleteTournament({ id }: TournamentId): Promise<TournamentResponse>;
export declare function createTournament(tournament: TournamentObject): Promise<TournamentResponse>;
interface TournamentId {
    id: number;
}
export {};
