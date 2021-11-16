import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';

class Buttons extends React.Component {

  handleSelect = (evt) => {
    console.log(evt)
    this.props.gridSize(evt);
  }

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
					<button className="btn btn-default" onClick={this.props.playButton}>
						Play
					</button>
					<button className="btn btn-default" onClick={this.props.pauseButton}>
					  Pause
					</button>
					<button className="btn btn-default" onClick={this.props.clear}>
					  Clear
					</button>
					<button className="btn btn-default" onClick={this.props.slow}>
					  Slow
					</button>
					<button className="btn btn-default" onClick={this.props.fast}>
					  Fast
					</button>
					<button className="btn btn-default" onClick={this.props.seed}>
					  Seed
					</button>
          {/* <DropdownButton id="dropdown-item-button" title="Dropdown button">
            <Dropdown.ItemText>Dropdown item text</Dropdown.ItemText>
            <Dropdown.Item as="button">Action</Dropdown.Item>
            <Dropdown.Item as="button">Another action</Dropdown.Item>
            <Dropdown.Item as="button">Something else</Dropdown.Item>
          </DropdownButton> */}
					{/* <Dropdown>
            <Dropdown.Toggle
						title="Grid Size"
						id="size-menu"
						onClick={this.handleSelect}
					>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item eventKey="1">20x10</Dropdown.Item>
              <Dropdown.Item eventKey="2">50x30</Dropdown.Item>
              <Dropdown.Item eventKey="3">70x50</Dropdown.Item>
            </Dropdown.Menu>
				  </Dropdown> */}

        </ButtonToolbar>
      </div>
    )
  }
}

export default Buttons;
