import { useState } from "react";

import classes from "./CommentItem.module.css";

const CommentItem = (props) => {
  const [showMore, setShowMore] = useState(props.text.length > 150);

  return (
    <li className={classes.item}>
      <p>
        {showMore ? props.text.substr(0, 150) + "..." : props.text}
        {props.text.length > 150 && (
          <button
            onClick={() => (showMore ? setShowMore(false) : setShowMore(true))}
            className={classes.see}
          >
            see {showMore ? "more" : "less"}
          </button>
        )}
      </p>
    </li>
  );
};

export default CommentItem;
