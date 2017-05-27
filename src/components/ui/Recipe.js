import React, { Component } from 'react';
import Remarkable from 'remarkable';

class Recipe extends Component {
  //a recipe has a title and ingrediants

  constructor() {
    super()

    this.toggle = this.toggle.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
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

  componentDidUpdate(prevProp, prevState) {

    if(this.refs.ingsDisplay) {
      this.refs.ingsDisplay.innerHTML = this.parseIng()
    }
  }

  parseIng() {
    var md = new Remarkable();
    return md.render(this.props.data.ingredients.toString());
  }

  handleEdit(e) {

    this.setState({editing: true, open: true})
    e.stopPropagation();
  }

  update(e, recipieId) {
    const newRecipe = {
      title: this.state.title,
      ingredients: this.state.ingredients
    }
    this.props.updateRecipe(this.props.index, newRecipe)
    this.setState({editing: false})
  }

  destroy() {
    this.props.onRemove(this.props.index);
  }

  handleChange(event) {
    // handle changing state of fields
    const target = event.target;
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
              onClick={this.handleEdit}
            ></span>
            <span className="btn btn-primary btn-xs glyphicon glyphicon-plus" onClick={this.toggle}></span>
            <span className="btn btn-primary btn-xs glyphicon glyphicon-trash" onClick={() => {this.props.destroyRecipe(this.props.index)}}></span>

        </div>
        <div className={"panel" + (this.state.open ? " show" : "")}>
          <span contentEditable="true" ref="ingsDisplay" />
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
            ref={"ings"+this.props.index}
            id={"ings" + this.props.index}
            name="ingredients"
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
    if(this.state.editing){
      //editing the title
      return this.renderEdit();
    } else {
      return this.renderRecipie();
    }

  }

}

export default Recipe
