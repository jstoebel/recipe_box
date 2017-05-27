import React, { Component, PropTypes } from 'react';
import DestroyRecipe from '../containers/DestroyRecipe'
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
    this.renderEdit = this.renderEdit.bind(this);
    this.render = this.render.bind(this);
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  componentWillMount() {

    this.setState({
      open: false,
      editing: false

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

    var textRef = "newTitle"+this.props.data.id
    var ingRef = "newIngs" + this.props.data.id
    this.props.onChange(
      this.refs[textRef].getDOMNode().value,
      this.refs[ingRef].getDOMNode().value,
      this.props.index);
    this.setState({editing: false});

  }

  destroy() {
    this.props.onRemove(this.props.index);
  }

  parseIng() {
    var md = new Remarkable();
    var markup = md.render(this.props.data.ingredients.toString());
    return { __html: markup};

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

    // no need for a DestroyRecipe component..i think
    return (

      <div className="accordion-wrapper">
        <div
          className="accordion">
          <textarea
            ref={"newTitle"+this.props.data.id}
            id={"title" + this.props.data.id} type="text"
            className="title-input"
            defaultValue={this.props.data.title}
          />
          <span className="btn btn-primary btn-xs glyphicon glyphicon-floppy-disk" onClick={this.update}></span>
          <span className="btn btn-primary btn-xs glyphicon glyphicon-plus" onClick={this.toggle}></span>
          <span className="btn btn-primary btn-xs glyphicon glyphicon-trash" onClick={() => {this.props.destroyRecipe(this.props.index)}}></span>
        </div>
        <div className={"panel" + (this.state.open ? " show" : "")}>

          <textarea ref={"newIngs"+this.props.data.id} id={"ings" + this.props.data.id} type="text" className="ing-input" defaultValue={this.props.data.ingredients} />
        </div>
      </div>
    )

  }

  render() {
    console.log(this.props.destroyRecipe);
    if(this.state.editing){
      //editing the title
      return this.renderEdit();
    } else {
      return this.renderRecipie();
    }

  }

}

DestroyRecipe.propTypes = {
    onRemoveRecipe: PropTypes.func
}

export default Recipe
