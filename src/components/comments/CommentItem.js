import { useState } from "react";

import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const [showMore, setShowMore] = useState(props.text.length > 150);

  return (
    <li className={classes.item}>
      {showMore ? props.text.substr(0, 150) + "..." : props.text}
      {props.text.length > 150 && (
        <button onClick={() => setShowMore(!showMore)} className={classes.see}>
          see {showMore ? "more" : "less"}
        </button>
      )}
    </li>
  );
};

export default CommentItem;
