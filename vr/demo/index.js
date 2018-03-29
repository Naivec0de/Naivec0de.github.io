/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
    o: {
        image: 'r/o.jpg',
        preview: 'r/op.jpg'
    },
    o1: {
        image: 'r/o1.jpg',
        preview: 'r/o1p.jpg'
    },
    b1: {
        image: 'r/b1.jpg',
        preview: 'r/b1p.jpg'
    },
    b2: {
        image: 'r/b2.jpg',
        preview: 'r/b2p.jpg'
    },
    b3: {
        image: 'r/b3.jpg',
        preview: 'r/b3p.jpg'
    },
    b4: {
        image: 'r/b4.jpg',
        preview: 'r/b4p.jpg'
    },
    b5: {
        image: 'r/b5.jpg',
        preview: 'r/b5p.jpg'
    },
    f1: {
        image: 'r/f1.jpg',
        preview: 'r/f1prev.jpg'
    },
    f2: {
        image: 'r/f2.jpg',
        preview: 'r/f2prev.jpg'
    },
    f3: {
        image: 'r/f3.jpg',
        preview: 'r/f3prev.jpg'
    },
    f4: {
        image: 'r/f4.jpg',
        preview: 'r/f4prev.jpg'
    },
    f5: {
        image: 'r/f5.jpg',
        preview: 'r/f5prev.jpg'
    },
    f6: {
        image: 'r/f6.jpg',
        preview: 'r/f6p.jpg'
    },
    f7: {
        image: 'r/f7.jpg',
        preview: 'r/f7p.jpg'
    },
    s1: {
        image: 'r/s1.jpg',
        preview: 'r/s1p.jpg'
    },
    s2: {
        image: 'r/s2.jpg',
        preview: 'r/s2p.jpg'
    },
    s3: {
        image: 'r/s3.jpg',
        preview: 'r/s3p.jpg'
    },
    s4: {
        image: 'r/s4.jpg',
        preview: 'r/s4p.jpg'
    },
    s5: {
        image: 'r/s5.jpg',
        preview: 'r/s5p.jpg'
    },
    s6: {
        image: 'r/s6.jpg',
        preview: 'r/s6p.jpg'
    },
    s7: {
        image: 'r/s7.jpg',
        preview: 'r/s7p.jpg'
    },
    s8: {
        image: 'r/s8.jpg',
        preview: 'r/s8p.jpg'
    },
    s9: {
        image: 'r/s9.jpg',
        preview: 'r/s9p.jpg'
    },


};


function toggle() {
    var btnToggle = document.getElementById('btnToggle');
    if (btnToggle.class !== 'collapse') {
        btnToggle.class = 'collapse';
        btnToggle.style.backgroundImage = "url('r/ic_expand_less.png')";
    } else {
        btnToggle.style.backgroundImage = "url('r/ic_expand.png')";
        btnToggle.class = 'expand';
    }
}

function onLoad() {
    vrView = new VRView.Player('#vrview', {
        width: '80%',
        height: '700',
        image: 'r/o1.jpg',
        preview: 'r/o1p.jpg',
        is_stereo: false,
        is_autopan_off: true

    });
    document.getElementById('currently_viewing').innerHTML = 'Entrance';
    vrView.on('ready', onVRViewReady);
    vrView.on('modechange', onModeChange);
    vrView.on('getposition', onGetPosition);
    vrView.on('error', onVRViewError);
}

function loadScene(id) {
    console.log('loadScene', id);

    // Set the image
    vrView.setContent({
        image: scenes[id].image,
        preview: scenes[id].preview,
        is_autopan_off: true,
        is_stereo: false
    });

    // Unhighlight carousel items
    var carouselLinks = document.querySelectorAll('ul.carousel li a');
    for (var i = 0; i < carouselLinks.length; i++) {
        carouselLinks[i].classList.remove('current');
    }
    // vrView.getPosition();
    // Highlight current carousel item
    document.querySelector('ul.carousel li a[href="#' + id + '"]')
        .classList.add('current');
}

function onVRViewReady(e) {
    console.log('onVRViewReady');

    // Create the carousel links
    var carouselItems = document.querySelectorAll('ul.carousel li a');
    for (var i = 0; i < carouselItems.length; i++) {
        var item = carouselItems[i];
        item.disabled = false;

        item.addEventListener('click', function (event) {
            event.preventDefault();
            loadScene(event.target.parentNode.getAttribute('href').substring(1));
            // scroll back to top of page vrView
            topFunction();
            // display currently viewing
            document.getElementById('currently_viewing').innerHTML = event.target.parentNode.childNodes[3].innerHTML;
        });
    }

    loadScene('o1');
}

function onModeChange(e) {
    console.log('onModeChange', e.mode);
}

function onVRViewError(e) {
    console.log('Error! %s', e.message);
}

function onGetPosition(e) {
    console.log(e)
}

function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

window.addEventListener('load', onLoad);
