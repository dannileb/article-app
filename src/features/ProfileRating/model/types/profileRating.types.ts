export interface ProfileRatingBase {
    profileId: string;
    rating: number;
    feedback: string;
}

export interface ProfileRating extends ProfileRatingBase {
    id: string;
    userId: string;
}
