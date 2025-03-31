import { useAppDispatch } from '../../app/hooks.ts';
import { reactionAdded } from '../../features/posts/postSlice.ts';
import { PostSliceState } from '../../types.ts';

export interface ReactionButtonsProps {
    post: PostSliceState;
}

const reactionsEmojis = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
};

const ReactionButtons = ({ post }: ReactionButtonsProps) => {
    const dispatch = useAppDispatch();

    const reactionButtons = Object.entries(reactionsEmojis).map(
        ([name, emoji]) => {
            return (
                <button
                    key={name}
                    onClick={() =>
                        dispatch(
                            reactionAdded({
                                postId: post.id,
                                reaction:
                                    name as keyof PostSliceState['reactions'],
                            })
                        )
                    }
                    className="text-base text-white"
                >
                    {emoji}
                    {post.reactions?.[
                        name as keyof PostSliceState['reactions']
                    ] || 0}
                </button>
            );
        }
    );

    return <div className="flex gap-x-2">{reactionButtons}</div>;
};
export default ReactionButtons;
