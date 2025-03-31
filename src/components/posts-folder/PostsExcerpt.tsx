import PostAuthor from './PostAuthor.tsx';
import TimeAgo from './TimeAgo.tsx';
import ReactionButtons from './ReactionButtons.tsx';
import { ReactionButtonsProps } from './ReactionButtons.tsx';

const PostsExcerpt = ({ post }: ReactionButtonsProps) => {
    return (
        <article className="border border-white rounded-lg p-4">
            <h2 className="text-3xl">{post.title}</h2>
            <p className="text-[1.2rem] my-2">
                {post.content.substring(0, 100)}
            </p>
            <p className="text-base">
                <PostAuthor userId={post.userId || ''} />
                <TimeAgo timestamp={post.date || ''} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};
export default PostsExcerpt;
