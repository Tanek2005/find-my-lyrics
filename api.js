function getLyrics() {
  const artist = document.getElementById('artist').value.trim();
  const title = document.getElementById('title').value.trim();
  const lyricsDiv = document.getElementById('lyrics');
  const ytLink = document.getElementById('yt-music');
  const spotifyLink = document.getElementById('spotify');
  const appleLink = document.getElementById('apple-music');

  if (!artist || !title) {
    lyricsDiv.textContent = 'Please enter both artist and song title.';
    return;
  }


  lyricsDiv.textContent = 'Fetching lyrics...';

  const songLinkDiv = document.querySelector('.song-link');
  songLinkDiv.classList.remove('hidden');

  setTimeout(() => {
    songLinkDiv.classList.add('show');
  }, 10);

  const query = encodeURIComponent(`${artist} ${title}`);
  ytLink.href = `https://music.youtube.com/search?q=${query}`;
  spotifyLink.href = `https://open.spotify.com/search/${query}`;
  appleLink.href = `https://music.apple.com/us/search?term=${query}`;

  fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(title)}`)
    .then(response => response.json())
    .then(data => {
      if (data.lyrics) {
        lyricsDiv.textContent = data.lyrics;
      } else {
        lyricsDiv.textContent = 'Lyrics not found.';
      }
    })
    .catch(error => {
      console.error('Error fetching lyrics:', error);
      lyricsDiv.textContent = 'An error occurred while fetching lyrics.';
    });
}
