export interface ParticipantObject {
    active?: boolean;
    checked_in_at?: Date;
    created_at?: Date;
    final_rank?: any;
    group_id?: any;
    icon?: any;
    id?: number;
    invitation_id?: string;
    invite_email?: string;
    misc?: string;
    name: string;
    on_waiting_list?: boolean;
    seed?: number;
    tournament_id?: number;
    updated_at?: Date;
    challonge_username?: string;
    challonge_email_address_verified?: boolean;
    removable?: boolean;
    participatable_or_invitation_attached?: boolean;
    confirm_remove?: boolean;
    invitation_pending?: boolean;
    display_name_with_invitation_email_address?: string;
    email_hash?: string;
    username?: string;
    attached_participatable_portrait_url?: string;
    can_check_in?: boolean;
    checked_in?: boolean;
    reactivatable?: boolean;
}

export function ParticipantParamBuilder(participant: ParticipantObject): string {
    const valueArray = Object.keys(participant);
    const participantParams = valueArray.map((key) => `participant[${key}]=${participant[key as keyof ParticipantObject]}`).join("&");
    console.log(participantParams);
    return participantParams;
}