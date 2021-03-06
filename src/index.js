import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Grid from "./components/Grid";
import Buttons from "./components/Buttons";
import LowButtons from "./components/LowButtons";


class Main extends React.Component {
  constructor() {
    super();
    this.speed = 1000;
    this.rows = 10;
    this.cols = 30;

    this.state = {
      generation: 0,
      gridFull: Array(this.rows).fill().map(() => Array(this.cols).fill(false)),
      isFinished: false,
      isRunning: false,
    }
  }

  selectBox = (row, col) => {
    let gridCopy = arrayClone(this.state.gridFull);
    gridCopy[row][col] = !gridCopy[row][col];
    this.setState({
      gridFull: gridCopy
    })
  }

  seed = () => {
    clearInterval(this.intervalId)
		let gridCopy = arrayClone(this.state.gridFull);
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (Math.floor(Math.random() * 4) === 1) {
					gridCopy[i][j] = true;
				}
			}
		}
		this.setState({
			gridFull: gridCopy,
      generation: 0,
      isFinished: false,
		});
	}

  playButton = () => {
    clearInterval(this.intervalId)
    this.intervalId = setInterval(this.play, this.speed)
    this.setState({
      isRunning: true,
    })
  }

  pauseButton = () => {
    clearInterval(this.intervalId)
  }

  slow = () => {
    this.speed = 1000;
    this.playButton();
  }

  fast = () => {
    this.speed = 100;
    this.playButton();
  }

  clear = () => {
    clearInterval(this.intervalId)
    const grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    this.setState({
      gridFull: grid,
      generation: 0,
      isFinished: false,
      isRunning: false,
    })
  }

  gridSizeSmall = async () => {
    this.cols = 8;
    this.rows = 5;
    const grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    await this.setState ({
      gridFull: grid,
    })
    this.seed();
  }

  gridSizeMedium = async () => {
    this.cols = 30;
    this.rows = 10;
    const grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    await this.setState ({
      gridFull: grid,
    })
    this.seed();
  }

  gridSizeBig = async () => {
    this.cols = 40;
    this.rows = 20;
    const grid = Array(this.rows).fill().map(() => Array(this.cols).fill(false));
    await this.setState ({
      gridFull: grid,
    })
    this.seed();
  }

  play = () => {
    let g = this.state.gridFull;
    let g2 = arrayClone(this.state.gridFull);

    for (let i = 0; i < this.rows; i++) {
		  for (let j = 0; j < this.cols; j++) {
		    let count = 0;
		    if (i > 0) if (g[i - 1][j]) count++;
		    if (i > 0 && j > 0) if (g[i - 1][j - 1]) count++;
		    if (i > 0 && j < this.cols - 1) if (g[i - 1][j + 1]) count++;
		    if (j < this.cols - 1) if (g[i][j + 1]) count++;
		    if (j > 0) if (g[i][j - 1]) count++;
		    if (i < this.rows - 1) if (g[i + 1][j]) count++;
		    if (i < this.rows - 1 && j > 0) if (g[i + 1][j - 1]) count++;
		    if (i < this.rows - 1 && j < this.cols - 1) if (g[i + 1][j + 1]) count++;
		    if (g[i][j] && (count < 2 || count > 3)) g2[i][j] = false;
		    if (!g[i][j] && count === 3) g2[i][j] = true;
		  }
		}

    if (isArrayEqual(g, g2)) {

      clearInterval(this.intervalId)
      this.setState({isFinished: true})

    } else {
          this.setState({
            gridFull: g2,
            generation: this.state.generation + 1,
          });
        }
  }

  componentDidMount() {
    this.seed();
  }

  render() {
    return (
      <div>
        <h1>The game of Life</h1>
        <Buttons
          playButton={this.playButton}
          pauseButton={this.pauseButton}
          slow={this.slow}
          fast={this.fast}
          clear={this.clear}
          seed={this.seed}
        />
        <Grid
          gridFull={this.state.gridFull}
          rows={this.rows}
          cols={this.cols}
          selectBox={this.selectBox}
        />
        <LowButtons
          gridSizeSmall={this.gridSizeSmall}
          gridSizeMedium={this.gridSizeMedium}
          gridSizeBig={this.gridSizeBig}
        />
        { this.state.isFinished ? <h2>The Game is Over</h2> : <h2>Generations: {this.state.generation}</h2>}
      </div>
    );
  }
}



function  isArrayEqual(array1, array2) {
  return JSON.stringify(array1) === JSON.stringify(array2)
}

function arrayClone(arr) {
	return JSON.parse(JSON.stringify(arr));
}

ReactDOM.render(<Main />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
