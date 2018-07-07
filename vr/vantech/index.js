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
        preview: 'r/preload_1.jpg'
    },
    r2: {
        image: 'r/r2.jpg',
        preview: 'r/preload_10.jpg'
    },

    r21: {
        image: 'r/r2_1.jpg',
        preview: 'r/preload_10.jpg'
    },

    r3: {
        image: 'r/r3.jpg',
        preview: 'r/preload_11.jpg'
    },
    r4: {
        image: 'r/r4.jpg',
        preview: 'r/preload_12.jpg'

    },
    r5: {
        image: 'r/r5.jpg',
        preview: 'r/preload_13.jpg'
    },
    r6: {
        image: 'r/r6.jpg',
        preview: 'r/preload_14.jpg'
    },
    r7: {
        image: 'r/r7.jpg',
        preview: 'r/preload_15.jpg'
    },
    r71: {
        image: 'r/r7_1.jpg',
        preview: 'r/preload_16.jpg'
    },
    r8: {
        image: 'r/r8.jpg',
        preview: 'r/preload_17.jpg'
    },
    r9: {
        image: 'r/r9.jpg',
        preview: 'r/preload_18.jpg'
    },
    r10: {
        image: 'r/r10.jpg',
        preview: 'r/preload_2.jpg'
    },
    r11: {
        image: 'r/r11.jpg',
        preview: 'r/preload_3.jpg'
    },
    r12: {
        image: 'r/r12.jpg',
        preview: 'r/preload_4.jpg'
    },
    r13: {
        image: 'r/r13.jpg',
        preview: 'r/preload_5.jpg'
    },
    r14: {
        image: 'r/r14.jpg',
        preview: 'r/preload_6.jpg'
    },
    r15: {
        image: 'r/r15.jpg',
        preview: 'r/preload_7.jpg'
    },
    r16: {
        image: 'r/r16.jpg',
        preview: 'r/preload_8.jpg'
    },

    p1: {
        image: 'r/plain_1.jpg',
        preview: 'r/plain_1.jpg'
    },
    p2: {
        image: 'r/plain_2.jpg',
        preview: 'r/plain_2.jpg'
    },
    p3: {
        image: 'r/plain_3.jpg',
        preview: 'r/plain_3.jpg'
    },
    p4: {
        image: 'r/plain_4.jpg',
        preview: 'r/plain_4.jpg'
    },
    p5: {
        image: 'r/plain_5.jpg',
        preview: 'r/plain_5.jpg'
    },
    p6: {
        image: 'r/plain_6.jpg',
        preview: 'r/plain_6.jgp'
    },
    p7: {
        image: 'r/plain_7.jpg',
        preview: 'r/plain_7.jpg'
    },
    p8: {
        image: 'r/plain_8.jpg',
        preview: 'r/plain_8.jpg'
    },
    p9: {
        image: 'r/plain_9.jpg',
        preview: 'r/plain_9.jpg'
    },
    p10: {
        image: 'r/plain_10.jpg',
        preview: 'r/plain_10.jpg'
    },
    p11: {
        image: 'r/plain_11.jpg',
        preview: 'r/plain_11.jpg'
    },
    p12: {
        image: 'r/plain_12.jpg',
        preview: 'r/plain_12.jgp'
    },
    p13: {
        image: 'r/plain_13.jpg',
        preview: 'r/plain_13.jpg'
    },
    p14: {
        image: 'r/plain_14.jpg',
        preview: 'r/plain_14.jpg'
    },
    p15: {
        image: 'r/plain_15.jpg',
        preview: 'r/plain_15.jpg'
    },
    p16: {
        image: 'r/plain_16.jpg',
        preview: 'r/plain_16.jgp'
    },
    p17: {
        image: 'r/plain_17.jpg',
        preview: 'r/plain_17.jpg'
    },
    p18: {
        image: 'r/plain_18.jpg',
        preview: 'r/plain_18.jpg'
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
        image: 'r/r1.jpg',
        preview: 'r/preload_1.jpg',
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
    loadScene('r1');
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
