function getLyrics() {
    const artist = document.getElementById('artist').value.trim();
    const title = document.getElementById('title').value.trim();
    const lyricsDiv = document.getElementById('lyrics');

    if (!artist || !title) {
      lyricsDiv.textContent = 'Please enter both artist and song title.';
      return;
    }

    lyricsDiv.textContent = 'Fetching lyrics...';

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