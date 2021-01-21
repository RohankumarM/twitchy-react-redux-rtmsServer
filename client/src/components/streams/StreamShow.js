import React, { useEffect, useRef } from 'react';
import flv from 'flv.js';
import { connect } from 'react-redux';
import { fetchStream } from '../../actions';

const StreamShow = (props) => {

  let player;
  const videoRef = useRef();

  useEffect(() => {
    props.fetchStream(props.match.params.id);
    buildPlayer();
  }, []);

  useEffect(() => {
    buildPlayer();
  });

  useEffect(() => {
    return () => {
      player.destroy();
    }
  }, []);

  function buildPlayer() {
    if (player || !props.stream) {
      return;
    }
    player = flv.createPlayer({
      type: 'flv',
      url: `http://localhost:8000/live/${props.match.params.id}.flv`
    });
    player.attachMediaElement(videoRef.current);
    player.load();
  }

  if (!props.stream) {
    return <div>Loading...</div>
  }

  return <div>
    <video ref={videoRef} style={{ width: '100%' }} controls />
    <h1>{props.stream.title}</h1>
    <h5>{props.stream.description}</h5>
  </div>
};

const mapStateToProps = (state, ownProps) => {
  return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);