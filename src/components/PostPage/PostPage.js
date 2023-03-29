import React, {useState} from 'react';
import PostPageChange from "./PostPageChange";

const PostPage = ({onClose, post}) => {

    const [isChange, setIsChange] = useState(false)

    const changePostHandler = () => {
        isChange ? setIsChange(false) : setIsChange(true);
    }

    if(isChange) {
        return <PostPageChange post={post} />
    } else {
        return (
            <div>
                <span>{post.title}</span>
                <p>{post.body}</p>
                <button onClick={changePostHandler}>Change</button>
                <button onClick={onClose}>Back</button>
            </div>
        );
    }

};

export default PostPage;