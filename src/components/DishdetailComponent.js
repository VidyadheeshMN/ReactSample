import React, { Component } from 'react';
import { Card, CardText, CardBody,
  CardTitle, 
  ListGroupItemText} from 'reactstrap';

  function RenderComments({ comments }) {
    if (comments != null) {
      return (
        <div className="col-12 col-md-10 m-1">
          <h4>Comments</h4>
          <div>
            {comments.map(comment => {
              return (
                <div>
                <div className = "card border-0">
                    <li className = "list-unstyled">
                      <p>{comment.comment} </p>
                      <p>{"-- " + comment.author} -{new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "2-digit"}).format(new Date(Date.parse(comment.date)))}
                    </p>
                    </li>
                </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    } else return <div />;
  }

  const DishDetailComponent = props => {
    return (
      <div className="container">
        <div className="row">
          <div>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderComments comments={props.comment1} />
        </div>
      </div>
    );
  };


export default DishDetailComponent;