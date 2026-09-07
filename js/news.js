(() => {
  const players = new Set();

  document.querySelectorAll('.news-play').forEach(link => {
    link.addEventListener('click', event => {
      // Keep normal link behavior for new tabs and browsers without scripting.
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();

      const card = link.closest('.news-card');
      const status = card.querySelector('.news-status');
      const video = document.createElement('video');
      video.className = 'news-video';
      video.controls = true;
      video.playsInline = true;
      video.preload = 'none';
      video.poster = link.querySelector('img').src;
      video.setAttribute('aria-labelledby', card.getAttribute('aria-labelledby'));
      video.tabIndex = 0;

      function showFallback(message) {
        status.textContent = `${message} `;
        const fallback = document.createElement('a');
        fallback.href = link.href;
        fallback.textContent = 'Abrir o vídeo diretamente';
        status.append(fallback);
        status.hidden = false;
      }

      video.addEventListener('error', () => {
        showFallback('Não foi possível carregar a reportagem.');
      });
      video.addEventListener('play', () => {
        players.forEach(other => {
          if (other !== video) other.pause();
        });
        status.hidden = true;
      });

      // The MP4 URL is assigned only after the user chooses to watch.
      video.src = link.href;
      players.add(video);
      link.replaceWith(video);
      video.focus({ preventScroll: true });
      const playback = video.play();
      playback?.catch(() => {
        if (!video.error) {
          showFallback('Use o controle de reprodução para iniciar o vídeo.');
        }
      });
    });
  });
})();
