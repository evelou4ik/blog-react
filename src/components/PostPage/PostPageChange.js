import React, {useState} from 'react';

const PostPageChange = ({post}) => {
    const [inputValueTitle, setInputValueTitle] = useState(post.title);
    const [inputValueBody, setInputValueBody] = useState(post.body);

    const updatePostHandler = (e) => {
        e.preventDefault();

    }

    const changePostInputValueHandler = () => {
        
    }

    return (
        <div>
            <form>
                <input className="form_input" type="text" defaultValue={post.title}/>
                <textarea defaultValue={post.body}></textarea>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default PostPageChange;