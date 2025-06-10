import { Link } from 'react-router';
import React from 'react';
import PostAuthor from './PostAuthor.tsx';
import TimeAgo from './TimeAgo.tsx';
import ReactionButtons from './ReactionButtons.tsx';
import { ReactionButtonsProps } from './ReactionButtons.tsx';

const PostsExcerpt = ({ post }: ReactionButtonsProps) => {
    return (
        <article className="border border-black rounded-lg p-4">
            <h2 className="text-3xl">{post.title}</h2>
            <p className="text-[1.2rem] my-2 italic">
                {post.content.substring(0, 75)}...
            </p>
            <p className="text-base">
                <Link
                    to={`post/${post.id}`}
                    className="mr-1 underline hover:opacity-75 focus:opacity-75 visited:text-green-300"
                >
                    View Post
                </Link>
                <PostAuthor userId={post.userId || ''} />
                <TimeAgo timestamp={post.date || ''} />
            </p>
            <ReactionButtons post={post} />
        </article>
    );
};

export default React.memo(PostsExcerpt);
