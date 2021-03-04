import { TournamentList } from "../models/tournament-list";
import { TournamentResponse } from "../models/tournament-response";
export declare function getAll(): Promise<TournamentList>;
export declare function get({ id }: TournamentId): Promise<TournamentResponse>;
export declare function deleteTournament({ id }: TournamentId): Promise<TournamentResponse>;
interface TournamentId {
    id: number;
}
export {};
