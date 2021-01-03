const musicPlayer = document.getElementById('music-player'),
       button = document.querySelector('#button');

async function dataSong(a) {
    const response = await fetch(a);
    if(!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return await response.json();
    };
};

function getRandomNum(a) {
    return Math.floor(Math.random() * a);
}

function getForwardSiblings(elem) {
    // Setup siblings array and get the first sibling
    var siblings = [];
    var sibling = elem;

    // Loop through each sibling and push to the array
    while (sibling) {
           if (sibling.nodeType === 1 && sibling !== elem) {
                  siblings.push(sibling);
           }
           sibling = sibling.nextSibling
 }

 return siblings;
}


function insertSongData(a) {
    dataSong('../json/music-data.json')
    .then(data => {
        data.reverse();

        let empty = '';
        data.forEach(s => {
            if(s.Genre.includes(a) == true) {
                const playlistFill = `<a href="${s.Path}" class="link-song">
                                                    <div class="song row text-light">
                                                        <div class="song-description">
                                                                <div class="align-self-start"><h5 class="song-tittle">${s.Tittle}</h5></div>
                                                                <div class="align-self-end"><p><small>${s.Singer == "" || s.Singer == undefined ? 'Unknown' : s.Singer}</small></p></div>
                                                        </div>
                                                    </div>
                                            </a>`
                                    
                return empty += playlistFill;
            }
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
}

function buttonFill() {
        musicPlayer.onpause = function() {
               button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-play-fill play" viewBox="0 0 16 16">
                                           <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
                                    </svg>`;
        };
        
        musicPlayer.onplay = function() {
               button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="bi bi-pause-fill press" viewBox="0 0 16 16">
                                                                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/>
                                    </svg>`;
        }
 }


    // O
    // (|)
    // /\
