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
    r1: {
        image: 'r/r1.jpg',
        preview: 'r/r1p.jpg'
    },
    r2: {
        image: 'r/r2.jpg',
        preview: 'r/r2p.jpg'
    },
    r3: {
        image: 'r/r3.jpg',
        preview: 'r/r3p.jpg'
    },
    r4: {
        image: 'r/r4.jpg',
        preview: 'r/r4p.jpg'

    },
    r42: {
        image: 'r/r4-2.jpg',
        preview: 'r/r4p.jpg'
    },
    r4b: {
        image: 'r/r4b.jpg',
        preview: 'r/r4bp.jpg'
    },
    w: {
        image: 'r/w.jpg',
        preview: 'r/wp.jpg'
    },
    dining: {
        image: 'r/d.jpg',
        preview: 'r/d.jpg'
    },
    kitchen: {
        image: 'r/k.jpg',
        preview: 'r/k.jpg'
    },
    r1p: {
        image: 'r/r1t.jpg',
        preview: 'r/r1t.jpg'
    },
    wp: {
        image: 'r/r1w.jpg',
        preview: 'r/r1w.jpg'
    },
    r2p: {
        image: 'r/r2t.jpg',
        preview: 'r/r2t.jpg'
    },
    wp1: {
        image: 'r/wt.jpg',
        preview: 'r/wt.jpg'
    },
    fp1: {
        image: 'r/r23f.png',
        preview: 'r/r23f.png'
    },
    fp2: {
        image: 'r/r4f.png',
        preview: 'r/r4f.png'
    },


};

function toggle() {
    "use strict";
    var btnToggle = document.getElementById('btnToggle');
    if (btnToggle.class !== 'collapse') {
        btnToggle.class = 'collapse';
        btnToggle.style.backgroundImage = "url('r/ic_expand_less.png')";
    } else {
        btnToggle.style.backgroundImage = "url('r/ic_expand.png')";
        btnToggle.class = 'expand';
    }
}
/*global VRView:true*/

function onLoad() {
    "use strict";
    vrView = new VRView.Player('#vrview', {
        width: '80%',
        height: '700',
        image: 'r/r2.jpg',
        preview: 'r/r2p.jpg',
        is_stereo: false,
        is_autopan_off: true

    });
    document.getElementById('currently_viewing').innerHTML = '客房1';
    vrView.on('ready', onVRViewReady);
    vrView.on('modechange', onModeChange);
    vrView.on('getposition', onGetPosition);
    vrView.on('error', onVRViewError);
}

function loadScene(id) {
    "use strict";
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

function loadPlainScene(id) {
    "use strict";
    var plainDiv = document.getElementById("imageview");
    var img = document.createElement("img");
    img.src = scenes[id].image;
    if ((plainDiv.childNodes.length > 0)) {
        plainDiv.removeChild(plainDiv.childNodes[0]);
    }
    plainDiv.appendChild(img);


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
    "use strict";
    console.log('onVRViewReady');

    // Create the carousel links
    var carouselItems = document.querySelectorAll('ul.carousel li a');
    for (var i = 0; i < carouselItems.length; i++) {
        var item = carouselItems[i];
        item.disabled = false;

        item.addEventListener('click', function (event) {
            event.preventDefault();
            var parent = event.target.parentNode.parentNode.parentNode;
            var type = parent.getAttribute('id');
            var vrdiv = document.getElementById("vrview");
            var plainDiv = document.getElementById("imageview");
            //Plain image
            if (type === 'plain') {
                vrdiv.style.display = "none";
                plainDiv.style.display = "block";
                loadPlainScene(event.target.parentNode.getAttribute('href').substring(1));

                //360 Image    
            } else {
                if (vrdiv.style.display === "none") {
                    plainDiv.style.display = "none";
                    vrdiv.style.display = "block";
                }
                loadScene(event.target.parentNode.getAttribute('href').substring(1));



            }
            // scroll back to top of page vrView
            topFunction();
            // display currently viewing
            document.getElementById('currently_viewing').innerHTML = event.target.parentNode.childNodes[3].innerHTML;
        });
    }

    // scroll back to top of page vrView
    topFunction();
    loadScene('r2');
}

function onModeChange(e) {
    "use strict";
    console.log('onModeChange', e.mode);
}

function onVRViewError(e) {
    "use strict";
    console.log('Error! %s', e.message);
}

function onGetPosition(e) {
    "use strict";
    console.log(e);
}

function topFunction() {
    "use strict";
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

window.addEventListener('load', onLoad);
