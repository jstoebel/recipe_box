import React, { Component, PropTypes } from 'react';
import Remarkable from 'remarkable';

class Recipe extends Component {
  //a recipe has a title and ingrediants

  constructor() {
    super()

    this.toggle = this.toggle.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
    this.parseIng = this.parseIng.bind(this);
    this.componentWillMount = this.componentWillMount.bind(this);
    this.onRemove = this.onRemove.bind(this);
    this.renderRecipie = this.renderRecipie.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.render = this.render.bind(this);
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  componentWillMount() {

    this.setState({
      open: false,
      editing: false,
      title: this.props.data.title,
      ingredients: this.props.data.ingredients
    })

  }

  editTitle(e) {

    this.setState({editing: true, open: true})
    e.stopPropagation();
  }

  handleChange(event) {
    // handle changing state of fields

    const target = event.target;
    const value = target.value;
    const name = target.name
    this.setState({[name]: value})
  }

  update(e, recipieId) {
    console.log("running update");
    console.log(this.state);
    const newRecipe = {
      title: this.state.title,
      ingredients: this.state.ingredients
    }
    this.props.updateRecipe(this.props.index, newRecipe)
  }

  destroy() {
    this.props.onRemove(this.props.index);
  }

  parseIng() {
    console.log("parse ing");
    console.log(this.props);
    var md = new Remarkable();
    var markup = md.render(this.props.data.ingredients.toString());
    return { __html: markup};

  }

  handleChange(event) {
    // handle changing state of fields
    const target = event.target;
    console.log(target.name);
    const value = target.value;
    const name = target.name
    this.setState({[name]: value})

  }

  onRemove() {
    this.props.destroyRecipe(this.props.index)
  }

  renderRecipie() {
    //not editing the title
    return (

      <div className="accordion-wrapper">
        <div
          className="accordion">

            <span
              className="title-span">
              {this.props.data.title}
            </span>
            <span className="btn btn-primary btn-xs glyphicon glyphicon-pencil"
              onClick={this.editTitle}
            ></span>
            <span className="btn btn-primary btn-xs glyphicon glyphicon-plus" onClick={this.toggle}></span>
            <span className="btn btn-primary btn-xs glyphicon glyphicon-trash" onClick={() => {this.props.destroyRecipe(this.props.index)}}></span>

        </div>
        <div className={"panel" + (this.state.open ? " show" : "")}>
           <span dangerouslySetInnerHTML={this.parseIng()} />
        </div>
      </div>
    )
  }

  renderEdit() {
    return (

      <div className="accordion-wrapper">
        <div
          className="accordion">
          <textarea
            ref={"newTitle"+this.props.index}
            id={"title" + this.props.index}
            name="title"
            type="text"
            className="title-input"
            defaultValue={this.props.data.title}
            onChange={this.handleChange}
          />
          <span className="btn btn-primary btn-xs glyphicon glyphicon-floppy-disk" onClick={this.update}></span>
          <span className="btn btn-primary btn-xs glyphicon glyphicon-plus" onClick={this.toggle}></span>
          <span className="btn btn-primary btn-xs glyphicon glyphicon-trash" onClick={() => {this.props.destroyRecipe(this.props.index)}}></span>
        </div>
        <div className={"panel" + (this.state.open ? " show" : "")}>

          <textarea
            ref={"ings"+this.props.data.index}
            id={"ings" + this.props.data.index}
            name="ings"
            type="text"
            className="ing-input"
            defaultValue={this.props.data.ingredients}
            onChange={this.handleChange}
          />
        </div>
      </div>
    )

  }

  render() {
    console.log(this.state);
    if(this.state.editing){
      //editing the title
      return this.renderEdit();
    } else {
      return this.renderRecipie();
    }

  }

}

export default Recipe
