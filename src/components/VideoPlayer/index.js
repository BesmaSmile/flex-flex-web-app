import React from 'react';
import './style.scss';

function VideoPlayer({
  title, id = 'RqrXhwS33yc', site = 'YouTube', play,
}) {
  let url;
  switch (site) {
    case 'YouTube':
      url = `https://www.youtube.com/embed/${id}${play ? '?autoplay=1' : ''}`;
      break;
    default:
  }
  return (
    <div className="video-player d-flex justify-content-center align-items-center">
      <iframe title={title} width="758" height="426" src={url} allow="autoplay" />
    </div>
  );
}

export default VideoPlayer;
