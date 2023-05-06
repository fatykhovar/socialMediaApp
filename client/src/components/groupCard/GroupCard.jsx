import "./groupCard.css";
import React  from 'react';
import { Link } from "react-router-dom";

const GroupCard = ({group}) => {

  return (
    <div className="groupCard">
      <div className="container">
        <div className="top">
          <div className="left">
            <img src={"/upload/" + group.groupprofilepic} alt="" />
            <Link
                to={`/group/${group.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
              {console.log("group: ", group)}
              <span className="name">{group.groupname}</span>
            </Link>
          </div>
           {/* <div className="right">
            <button
            //  onClick={handleClick}
             >Подписаться</button>
          </div> */}
        </div>
        <hr />
        <div className="bottom">
         
        </div>
      </div>
    </div>
  );
};

export default GroupCard;