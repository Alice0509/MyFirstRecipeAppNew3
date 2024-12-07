// app/lib/getYouTubeThumbnail.js
/*
export const getYouTubeThumbnail = (youtubeUrl) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = youtubeUrl.match(regex);
    return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
  };
  */

  // app/lib/getYouTubeThumbnail.js

export const getYouTubeThumbnail = (url) => {
  let videoId = null;
  const embedRegex = /embed\/([a-zA-Z0-9_-]{11})/;
  const watchRegex = /watch\?v=([a-zA-Z0-9_-]{11})/;
  const shortRegex = /youtu\.be\/([a-zA-Z0-9_-]{11})/;

  let match = url.match(embedRegex);
  if (match && match[1]) {
    videoId = match[1];
  } else {
    match = url.match(watchRegex);
    if (match && match[1]) {
      videoId = match[1];
    } else {
      match = url.match(shortRegex);
      if (match && match[1]) {
        videoId = match[1];
      }
    }
  }

  console.log(`YouTube URL: ${url}`);
  console.log(`Extracted Video ID: ${videoId}`);

  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
};
