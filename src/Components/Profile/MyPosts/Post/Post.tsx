import React, {FC} from 'react';
import classes from './Post.module.css';

type PropsType = {
	message: string
	likesCount: number
	id: number
}

const Post: FC<PropsType> = (props) => {
	return (

		<div className={classes.item}>
			{/*<img src="https://cdn.pixabay.com/photo/2016/12/13/16/17/dancer-1904467_960_720.png" alt="user"/>*/}
			 {props.message}
			<div>
				<span>like</span>
				{` ${props.likesCount}`}
			</div>
		</div>
	);
};
export default Post;
