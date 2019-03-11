import React, { Component } from 'react'
import Container from './component/Container'
import PropTypes from 'prop-types'
import axios from 'axios';

export class App extends Component {
  state = {
      stories: []
  }

    componentDidMount() {

        axios.get('https://api.giphy.com/v1/gifs/trending?api_key=QiidCosXIDRAGim3GDaXAAVGWJFVsKBE&limit=5&rating=G')
            .then(res=>{
                let data = res.data.data;
               let storiesarr = data.map(obj=>{
                    return {
                        url: obj.images.original.url,
                        header: { heading: obj.user.display_name,
                            subheading: 'Posted 1h ago',
                            profileImage: obj.user.avatar_url }
                    }
                })

                this.setState({stories: storiesarr});
            })


    }

    render() {

        return (
            <div>
                <Container
                   stories={this.state.stories}
                    defaultInterval={this.props.defaultInterval}
                    loader={this.props.loader}
                    header={this.props.header}
                />
            </div>
        )
    }
}




App.propTypes = {
    defaultInterval: PropTypes.number,
    loader: PropTypes.element,
    header: PropTypes.element
}




export default App;
