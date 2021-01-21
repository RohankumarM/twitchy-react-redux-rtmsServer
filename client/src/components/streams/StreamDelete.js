import React, { useEffect } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';
import { Link } from 'react-router-dom';

const StreamDelete = (props) => {

  useEffect(() => {
    props.fetchStream(props.match.params.id);
  }, []);


  const actions = (
    <React.Fragment>
      <button className="ui button negative" onClick={() => props.deleteStream(props.match.params.id)}>Delete</button>
      <Link to="/" className="ui button">Cancel</Link>
    </React.Fragment>
  );

  function renderContent(){
    if(!props.stream){
      return 'Are you sure you want to delete the stream?'
    }

    return `Are you sure you want to delete the stream with title ${props.stream.title}`;
  }

  return (
      <Modal title="Delete Stream"
        content={renderContent()}
        actions={actions}
        onDismiss={() => history.push('/')} />
  );
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] }
};

export default connect(mapStateToProps, { fetchStream, deleteStream })(StreamDelete);