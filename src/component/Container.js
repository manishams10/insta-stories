import React, { Component } from 'react';
import Story from './Story'
import ProgressHeader from './ProgressHeader'
import PropTypes from 'prop-types'

export default class Container extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentId: 0,
            pause: true,
            count: 0,
            storiesDone: 0,
            videoDuration: 5000
        }
        this.defaultInterval = 5000
        this.containerWidth = '30%'
        this.pictureWidth = '100%'
    }

    componentDidMount() {
        this.props.defaultInterval && (this.defaultInterval = this.props.defaultInterval)
       // this.wait(5000).then(()=>{});
       setInterval(() => {
          if (this.state.count < 1000 && !this.state.pause) {
                this.setState({ count: this.state.count + 1 })
              console.log(this.state);
            }
          if (this.state.count === 1000){
             this.next();
          } else{
                clearInterval()
            }
        }, 1);

    }



    pause = (action) => {
        this.setState({ pause: action === 'pause' })
    }

    previous = () => {
        if (this.state.currentId > 0) {
            this.setState({
                currentId: this.state.currentId - 1,
                count: 0
            })
        }
    }

    next = () => {
        if (this.state.currentId < this.props.stories.length - 1) {
            this.setState({
                currentId: this.state.currentId + 1,
                count: 0
            })
        }
    }

    debouncePause = (e) => {
        e.preventDefault()
        this.mousedownId = setTimeout(() => {
            this.pause('pause')
        }, 200)
    }

    mouseRelease = (e, type) => {
        e.preventDefault()
        this.mousedownId && clearTimeout(this.mousedownId)
        if (this.state.pause) {
            this.pause('play')
        } else {
            type === 'next' ? this.next() : this.previous()
        }
    }

    getVideoDuration = duration => {
        this.setState({ videoDuration: 5000 })
    }

    render() {

        return (

            <div style={{...styles.container, ...{width: this.containerWidth}}}>

                <ProgressHeader
                    next={this.next}
                    pause={this.state.pause}
                    videoDuration={this.state.videoDuration}
                    length={this.props.stories.map((s, i) => i)}
                    defaultInterval={this.defaultInterval}
                    currentStory={this.props.stories[this.state.currentId]}
                    progress={{id: this.state.currentId, completed: this.state.count / ((this.props.stories[this.state.currentId] && this.props.stories[this.state.currentId].duration) || this.defaultInterval)}}
                />
                <Story action={this.pause} playState={this.state.pause} width={this.pictureWidth} story={this.props.stories[this.state.currentId]}
                       loader={this.props.loader} header={this.props.header} getVideoDuration={this.getVideoDuration} />

                <div style={styles.overlay}>
                    <div style={{width: '100%', zIndex: 999}} onTouchStart={this.debouncePause} onTouchEnd={e => this.mouseRelease(e, 'previous')} onMouseDown={this.debouncePause} onMouseUp={(e) => this.mouseRelease(e, 'previous')} />
                    <div style={{width: '100%', zIndex: 999}} onTouchStart={this.debouncePause} onTouchEnd={e => this.mouseRelease(e, 'next')} onMouseDown={this.debouncePause} onMouseUp={(e) => this.mouseRelease(e, 'next')} />
                </div>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        background: '#111',
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '-webkit-fill-available'
    },
    overlay: {
        position: 'absolute',
        height: '-webkit-fill-available',
        width:  '-webkit-fill-available',
        display: 'flex'
    },
    left: {
    },
    right: {
    }
}

Container.propTypes = {
    stories: PropTypes.array,
    defaultInterval: PropTypes.number,
    loader: PropTypes.element,
    header: PropTypes.element
}
