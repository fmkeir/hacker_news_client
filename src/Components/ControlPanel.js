import React, {Component} from 'react';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newItemsPerPage: 10
        }

        this.handleItemsPerPageChange = this.handleItemsPerPageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }
  
  handleNext() {
    this.props.onPageChange(1);
  }

  handlePrevious() {
      this.props.onPageChange(-1);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onItemPerPageChange(this.state.newItemsPerPage);
  }

  handleItemsPerPageChange(event){
      this.setState({
          newItemsPerPage: parseInt(event.target.value)
      })
  }

  render() {
    return (
        <>
            <form onSubmit={this.handleSubmit}>
            <input
            type="number"
            value={this.state.newItemsPerPage}
            onChange={this.handleItemsPerPageChange}
            />
            <button type="submit">Go</button>
            </form>

            <button onClick={this.handlePrevious}>
                Previous Page
            </button>   
            <button onClick={this.handleNext}>
                Next Page
            </button>
        </>
    )
  };
}

export default ControlPanel;