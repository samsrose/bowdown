import React from 'react'

import Title from './title'


class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {page: "main"};
    this.showControls = this.showControls.bind(this);
    this.showMobileControls = this.showMobileControls.bind(this);
    this.showDesktopControls = this.showDesktopControls.bind(this);
  }

  showControls() {
    this.setState({page: "controls"})
  }

  showMobileControls() {
    this.setState({page: "mobile-controls"})
  }

  showDesktopControls() {
    this.setState({page: "desktop-controls"})
  }

  render() {
    if (this.state.page == "main") {
      return (
        <div className="centered">
          <Title title='bowdown' />
          <div className="button" id="play">loading</div>
          <div className="button" onClick={this.showControls}>controls</div>
        </div>
      );
    } else if (this.state.page == "controls") {
      return (
        <div className="centered">
          <Title title='controls' />
          <div className="button" onClick={this.showMobileControls}>mobile</div>
          <div className="button" onClick={this.showDesktopControls}>mouse + keyboard</div>
        </div>
      )
    } else if (this.state.page == "mobile-controls") {
      return (
        <div id="controls">
          <p>Mobile controls:</p>
          <ul>
            <li>Move - Touch movement on left side of screen</li>
            <li>Move Camera - Touch movement on right side of screen</li>
            <li>Draw and Release Arrow - Target button (hold -> release)</li>
            <li>Draw and Release Grapple - Grapple button (hold -> release)</li>
            <li>Jump - Green bar on bottom-right of screen</li>
            <li>For the best experience, keep your phone in landscape mode, fullscreen (which doesn't work on iPhone, don't blame me! blame Apple)</li>
          </ul>
          <p>refresh this page to play :P</p>
        </div>
      )
    } else if (this.state.page == "desktop-controls") {
      return (
        <div id="controls">
          <p>Mouse + keyboard:</p>
          <ul>
            <li>Mouse - move camera</li>
            <li>Left click (hold -> release) - draw and release arrow</li>
            <li>Right click (hold -> release) - draw and release grapple</li>
            <li>WASD - move</li>
            <li>Space - jump</li>
            <li>Shift - sprint</li>
          </ul>
          <p>refresh this page to play :P</p>
        </div>
      )
    }
  }
}

export default Menu