export interface MatchObject {
    attachment_count?: any;
    created_at?: Date;
    group_id?: any;
    has_attachment?: boolean;
    id?: number;
    identifier?: string;
    location?: any;
    loser_id?: any;
    player1_id?: number;
    player1_is_prereq_match_loser?: boolean;
    player1_prereq_match_id?: any;
    player1_votes?: any;
    player2_id?: number;
    player2_is_prereq_match_loser?: boolean;
    player2_prereq_match_id?: any;
    player2_votes?: any;
    round?: number;
    scheduled_time?: any;
    started_at?: Date;
    state?: string;
    tournament_id?: number;
    underway_at?: any;
    updated_at?: Date;
    winner_id?: any;
    prerequisite_match_ids_csv?: string;
    scores_csv?: string;
}

export function MatchParamBuilder(match: MatchObject): string {
    const valueArray = Object.keys(match);
    const matchParams = valueArray.map((key) => `match[${key}]=${match[key as keyof MatchObject]}`).join("&");
    return matchParams;
}