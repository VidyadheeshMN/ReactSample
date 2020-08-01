import React, { Component } from 'react'
import {Card, CardImg, CardText, CardBody, CardTitle, BreadcrumbItem, Breadcrumb, Button, Row, Col, Modal, ModalHeader, ModalBody, Label} from 'reactstrap'
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }

    toggleModal() {
        this.setState ({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        console.log("Current State is: " + JSON.stringify(values.message))
        alert("Current State is: " + JSON.stringify(values))
        this.setState ({
            isModalOpen: !this.state.isModalOpen
        });
    }

   render(){
    return(
        <>
            <Button className="bg-white text-dark" onClick={this.toggleModal}><i className="fa fa-pencil fa-lg"></i>{' '}Submit Comment</Button>
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>
                    Submit Comment
                </ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit = {(value) => this.handleSubmit(value)}>
                        <Row className="form-group">
                            <Label htmlFor="rating" md={4}>Rating</Label>
                            <Col md={12}>
                                <Control.select model=".rating" id="rating" name="rating"
                                className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={4}>Author</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Author"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />  
                            </Col>
                            
                        </Row>
                        <Row className = "form-group" >
                            <Label htmlFor="message" md={4}>Your Feedback</Label>
                            <Col md={12}>
                                <Control.textarea model=".message" id="message" name="message"
                                rows={6} 
                                className="form-control" />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Button type="submit" color="primary" >Submit</Button> 
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </>
    );
   }
}

    function RenderDish({dish}){
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
        else{
            return (
                <div></div>
            );
        }
    }

    const DishDetail = (props) =>{
        if(props.dish != null)
            return (    
                <div className="container">
                    <div className = "row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <RenderDish dish={props.dish}/>
                        <RenderComments comments={props.comments}/>
                    </div>     
                    
                </div>
            );
        else
            return <div></div>
    }

    function RenderComments({comments}){
        if (comments != null) {
            return (
            <div className="col-12 col-md-5 m-1">
                <h4>Comments</h4>
                <ul className = "list-unstyled">
		        {comments.map((comment) => {
                return(
                    <li key={comment.id} >
                        <p>{comment.comment}</p>
                        <p>-- {comment.author} ,{" "}
                        {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "2-digit"
                        }).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                    );
                })}
                </ul>
                <div className="row"><CommentForm/></div>
            </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
    }

export default DishDetail;