import React, { Component } from 'react';
import { Media } from 'reactstrap';
import { Card, CardImg, CardDeck, CardImgOverlay, CardText, CardBody,
  CardTitle } from 'reactstrap';
import DishDetailComponent from './DishdetailComponent'
  class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: ""
        }
    }

    onDishSelect(dish) {
        this.setState({ selectedDish: dish});
    }

    renderDish(dish) {
        if (dish != null)
            return(
              <CardDeck>
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </Card>
                <Card>
                  <DishDetailComponent comment1 = {this.state.selectedDish.comments}/>
                </Card>
                </CardDeck>
            );
        else
            return(
                <div></div>
            );
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
              <div  className="col-12 col-md-5 m-1">
                <Card key={dish.id}
                  onClick={() => this.onDishSelect(dish)}>
                  <CardImg width="100%" src={dish.image} alt={dish.name} />
                  <CardImgOverlay>
                      <CardTitle>{dish.name}</CardTitle>
                  </CardImgOverlay>
                </Card>
              </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <div className="row">
                  <div  className="col-12 col-md-10 m-1">
                    {this.renderDish(this.state.selectedDish)}
                  </div>
                </div>
            </div>      
        );
    }
}

export default Menu;