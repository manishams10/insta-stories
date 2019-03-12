import React from 'react'
import PropTypes from 'prop-types'
import style from './../styles.css'

export default class ProgressBar extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      duration: this.props.defaultInterval
    }
  }

  componentDidMount() {
    if (this.inner) {
      this.inner.addEventListener('webkitAnimationEnd', this.next, false)
      this.inner.addEventListener('animationend', this.next, false)
      this.inner.addEventListener('onanimationend', this.next, false)
    }
  }

  static getDerivedStateFromProps(props, state) {
    let current = props.currentStory
    if (typeof current === 'object') {
      if (current.type && props.videoDuration) return { duration: props.videoDuration * 500}
      if (current.duration) return { duration: current.duration }
    } else {
      return { duration: props.defaultInterval }
    }
    return state;
  }

  next = () => {
    this.props.next()
  }

  render() {

    let innerStyle
    switch (this.props.active) {
      case 2:
        innerStyle = { width: '100%' }
        break
      case 1:
        innerStyle = { animation: `1000ms linear 2ms ${style.slidein}`, animationPlayState: this.props.pause ? 'paused' : 'running' }
        break
      case 0:
        innerStyle = { width: 0 }
        break
      default:
        innerStyle = { width: 0 }
        break
    }
    return (
      <div style={{...styles.progress, ...{width: `${this.props.width * 1000}%`}}}>
        <div ref={r => { this.inner = r }} className={style.inner} style={innerStyle} />
      </div>
    )
  }
}

const styles = {
  progress: {
    height: 2,
    maxWidth: '100%',
    background: 'grey',
    margin: 2
  }
}

ProgressBar.propTypes = {
  width: PropTypes.number,
  defaultInterval: PropTypes.number,
  pause: PropTypes.bool,
  next: PropTypes.func,
  active: PropTypes.number,
  currentStory:  PropTypes.object,
  videoDuration: PropTypes.number
}
