const demo = {
    watchID: null,
    counter: 0,

    getCounter: () => demo.counter++,

    getValue: (value) => value ? value : '&nbsp;',

    watchPosition: () => {
        demo.$watchButton.classList.toggle('none');
        demo.$stopButton.classList.toggle('none');

        demo.$positions.innerHTML += '<div class="has-text-right"><span class="tag">Starting position watch...</span></div>';
        
        demo.watchID = navigator.geolocation.watchPosition(
            position => {
                const el = demo.$template.cloneNode(true);
                el.id = `position-${demo.getCounter()}`;
                el.querySelector('.accuracy').innerHTML = demo.getValue(position.coords.accuracy);
                el.querySelector('.altitude').innerHTML = demo.getValue(position.coords.altitude);
                el.querySelector('.altitudeAccuracy').innerHTML = demo.getValue(position.coords.altitudeAccuracy);
                el.querySelector('.heading').innerHTML = demo.getValue(position.coords.heading);
                el.querySelector('.latitude').innerHTML = demo.getValue(position.coords.latitude);
                el.querySelector('.longitude').innerHTML = demo.getValue(position.coords.longitude);
                el.querySelector('.speed').innerHTML = demo.getValue(position.coords.speed);
                el.querySelector('.timestamp').innerHTML = demo.getValue(position.timestamp);
                el.classList.remove('none');
                el.classList.add('position');
                demo.$positions.appendChild(el);
            },
            error => {
                document.querySelector('.location-services').toggle('none');
            });
    },

    stop: () => {
        demo.$watchButton.classList.toggle('none');
        demo.$stopButton.classList.toggle('none');

        navigator.geolocation.clearWatch(demo.watchID);
        demo.$positions.innerHTML += '<div class="has-text-right"><span class="tag">End position watch</span></div>';
    },

    showMap: () => {
        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                const url = `http://maps.google.com/maps?q=${lat},${long}`;

                var map = window.open(url);

                if (map == null || typeof(map)=='undefined') { 	
                    document.querySelector('.pop-window').toggle('none');
                } 
            },
            error => {
                alert('Error\n\nCheck console for details.');
                console.log(error);
            });
    },

    load: () => {
        demo.$template = document.querySelector('.position-template');
        demo.$positions = document.querySelector('#positions');
        demo.$watchButton = document.querySelector('.watch-button');
        demo.$stopButton = document.querySelector('.stop-button');
    }
};

window.addEventListener('DOMContentLoaded', demo.load);