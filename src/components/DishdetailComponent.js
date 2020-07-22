import React, {Component} from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle} from 'reactstrap'

class DishDetail extends Component{
  constructor(props){
    super(props)
  }

    formatDate({ date }) {
        return new Date(date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric"
        });
      }
    
    renderDish(dish){
        if(dish != null){
            return (
              <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>     
            </div>
            );
        }
        else
        {
            return (
                <div></div>
            );
        }
    }

    renderComments(comments)
    {
        if (comments != null) {
            let list = comments.map((comments)=>{ 
                let date = comments.date
                return(
                    <li key={comments.id} >
                        <div>
                            <p>{comments.comment}</p>
                            <p>--{comments.author},{this.formatDate({date})}</p>
                        </div>
                    </li>
                )
            })
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {list}
                    </ul>
                </div>
            )
        }
        else{
            return (
                <div></div>
            );
        }
    }

    getComments(dish){
        if(dish!=null)
            return this.renderComments(dish.comments);
        else{
            return(
                <div></div>
            )
        }
    }
    
    render(){
        return (    
            <div className="container">
                <div className="row">
                    {this.renderDish(this.props.dish)}
                    {this.getComments(this.props.dish)}
                </div>     
            </div>
        );
    }
}

export default DishDetail