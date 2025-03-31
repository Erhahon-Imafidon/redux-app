// types.ts
export interface PostSliceState {
    id: string;
    title: string;
    content: string;
    userId?: string;
    date: string;
    reactions?: {
        thumbsUp: number;
        wow: number;
        heart: number;
        rocket: number;
        coffee: number;
    };
}

export interface PostStateProps {
    posts: PostSliceState[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface ReactionPayload {
    postId: string;
    reaction: keyof PostSliceState['reactions'];
}

export interface APIPost {
    id: string;
    title: string;
    body: string;
    userId: string;
}

export interface AddNewPostProp {
    title: string;
    content: string;
    userId: string;
}
