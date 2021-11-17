import React from 'react';
import { ButtonToolbar } from 'react-bootstrap';

class LowButtons extends React.Component {

  render() {
    return (
      <div className="center">
        <ButtonToolbar>
					<button className="btn btn-default" onClick={this.props.gridSizeSmall}>
						Small Grid
					</button>
					<button className="btn btn-default" onClick={this.props.gridSizeMedium}>
					  Medium Grid
					</button>
					<button className="btn btn-default" onClick={this.props.gridSizeBig}>
					  Big Grid
					</button>
        </ButtonToolbar>
      </div>
    )
  }
}

export default LowButtons;
