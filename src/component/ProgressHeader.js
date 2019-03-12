import React from 'react'
import ProgressBar from './ProgressBar'
import PropTypes from 'prop-types'

export default class ProgressHeader extends React.Component {
  render() {
    console.log("ProgressBar Array");
    console.log(this.props);
    return (
      <div style={styles.progressArr}>
        {this.props.length.map((i, index) =>
          <ProgressBar
            width={1 / this.props.length.length}
            next={this.props.next}
            defaultInterval={this.props.defaultInterval}
            videoDuration={this.props.videoDuration}
            currentStory={this.props.currentStory}
            active={i === this.props.progress.id ? 1 : (i < this.props.progress.id ? 2 : 0)}
            pause={this.props.pause}
          />)}
      </div>
    )
  }
}

const styles = {
  progressArr: {
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '100%',
    flexWrap: 'row',
    position: 'absolute',
    width: '98%',
    padding: 5,
    alignSelf: 'center',
    zIndex: 99,
    filter: 'drop-shadow(0 1px 8px #000)'
  }
}

ProgressHeader.propTypes = {
  length: PropTypes.array,
  progress: PropTypes.object,
  pause: PropTypes.bool,
  next: PropTypes.func,
  currentStory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]),
  defaultInterval: PropTypes.number,
  videoDuration: PropTypes.number
}
