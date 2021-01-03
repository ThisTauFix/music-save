musicPlayer.back;
button.back;

dataSong('../json/music-data.json')
.then(data => {
       data.reverse();

       let empty = '';
       data.forEach(s => {
         const playlistFill = `<a href="${s.Path}" class="link-song">
                                          <div class="song row text-light">
                                                 <div class="song-description">
                                                        <div class="align-self-start"><h5 class="song-tittle">${s.Tittle}</h5></div>
                                                        <div class="align-self-end"><p><small>${s.Singer == "" || s.Singer == undefined ? 'Unknown' : s.Singer}</small></p></div>
                                                 </div>
                                          </div>
                                   </a>`;
                             
         return empty += playlistFill;
       });
       document.getElementById('insert-song').innerHTML = empty;
       
       const linkSong = document.body.querySelectorAll('a.link-song'),
        songPlay = document.getElementById('song-play');

       function audioPlay() {
              musicPlayer.src = linkSong[0];
              let nextSong = [],
                     num;
       
              linkSong.forEach((s,i) => {
                     s.addEventListener('click', function(ev) {
                            ev.preventDefault();
                            musicPlayer.src = this;
                            musicPlayer.play();
                            songPlay.classList.remove('none');
                            songPlay.querySelector('h5').innerText = document.body.getElementsByClassName('song-tittle')[i].innerText;
                            
                            nextSong.push(getForwardSiblings(this));
                            num = 0;
                     });
              });
              // when forward button press, play next sibling song
              document.getElementById('forward').addEventListener('click', function() {
                     var playlistForward = nextSong[nextSong.length - 1];
                     if(num < playlistForward.length) {
                            musicPlayer.src = playlistForward[num];
                            musicPlayer.play();
                            songPlay.querySelector('h5').innerText = playlistForward[num].getElementsByClassName('song-tittle')[0].innerText;
                            num++;
                     }
              });

              // when song end, pick random song except last song
              musicPlayer.onended = function() {
                     var randomIndexNum = getRandomNum(linkSong.length);
                     songPlay.querySelector('h5').innerText = document.body.getElementsByClassName('song-tittle')[randomIndexNum].innerText;
                     musicPlayer.src = linkSong[randomIndexNum];
                     musicPlayer.play();
              }
       };
       
       audioPlay();

       window.setInterval(() => {
              if(musicPlayer.duration > 0 && !musicPlayer.paused) {
                     button.addEventListener('click', function() {
                            musicPlayer.pause();
                     });
              } else {
                     button.addEventListener('click', function() {
                            musicPlayer.play();
                     })
              }
       },100);
});

buttonFill();