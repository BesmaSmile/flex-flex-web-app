import React from 'react';

type VideoPlayerProps = {
  title: string;
  id?: string;
  site?: string;
  play?: boolean;
};

function VideoPlayer({
  title, id = 'RqrXhwS33yc', site = 'YouTube', play,
}: VideoPlayerProps) {
  let url;
  switch (site) {
    case 'YouTube':
      url = `https://www.youtube.com/embed/${id}${play ? '?autoplay=1' : ''}`;
      break;
    default:
  }
  return (
    <div className="bg-[#1b3957] flex justify-center items-center m-[5px] rounded-lg">
      <iframe
        title={title}
        width="758"
        height="426"
        src={url}
        allow="autoplay"
      />
    </div>

  );
}

export default VideoPlayer;
