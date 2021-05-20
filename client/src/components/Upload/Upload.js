import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'

// ...or load this specific CSS file using a <link> tag in your document
import 'react-fine-uploader/gallery/gallery.css'

const uploader = (id)=>new FineUploaderTraditional({
    options: {
        withCredentials: true,
        chunking: {
            enabled: true
        },cors: {
            //all requests are expected to be cross-domain requests
            expected: true,
    
            //if you want cookies to be sent along with the request
            sendCredentials: true
        }, 
        deleteFile: {
            enabled: true,
            endpoint: 'http://localhost:4000/api/v1/uploads/'+id
        },
        request: {
            endpoint: 'http://localhost:4000/api/v1/uploads/'+id
        },
        retry: {
            enableAuto: true
        }
    }
})

class UploadComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             movieId : props.movieId,
             uploader : uploader(props.movieId)
        }
    }
    
    render() {
        return (
            <Gallery uploader={ this.state.uploader } />
        )
    }
}
UploadComponent.propTypes = {
    movieId: PropTypes.string.isRequired
}

export default UploadComponent;
