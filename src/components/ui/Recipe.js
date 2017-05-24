import React, { Component } from 'react';
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
    this.renderRecipie = this.renderRecipie.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.render = this.render.bind(this);
  }

  toggle() {
    this.setState({open: !this.state.open});
  }

  update(newText, i) {
    //update text of


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
            <span className="btn btn-primary btn-xs glyphicon glyphicon-trash" onClick={this.destroy}></span>

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
            ref={"newTitle"+this.props.data.id}
            id={"title" + this.props.data.id} type="text"
            className="title-input"
            defaultValue={this.props.data.title}
          />
          <span className="btn btn-primary btn-xs glyphicon glyphicon-floppy-disk" onClick={this.update}></span>
          <span className="btn btn-primary btn-xs glyphicon glyphicon-plus" onClick={this.toggle}></span>
          <span className="btn btn-primary btn-xs glyphicon glyphicon-trash" onClick={this.destroy}></span>
        </div>
        <div className={"panel" + (this.state.open ? " show" : "")}>

          <textarea ref={"newIngs"+this.props.data.id} id={"ings" + this.props.data.id} type="text" className="ing-input" defaultValue={this.props.data.ingredients} />
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
