/**
 * @fileoverview Defines and initializes the colors module.
 *
 * Binds click functionality to each color tile:
 *   - Toggles between a random color and white.
 *
 * Binds click functionality to a clear button:
 *   - Resets all tiles to white.
 *
 * Binds click functionality on a save button:
 *    - Saves the current grid into local storage so the last state persists after save.
 */

/**
 * Colors module.
 */
window.colors = (function() {

    // Private
    var util = {
        getRandomColor: function() {
            var chars = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += chars[Math.floor(Math.random() * 16)];
            }
            return color;
        },
        getTiles: function() {
            return Array.prototype.slice.call(document.querySelectorAll('.tile'));
        },
        hasClass: function(element, value) {
            return element.className.indexOf(' ' + value) + 1;
        },
        addClass: function(element, value) {
            element.className += ' ' + value;
        },
        removeClass: function(element, value) {
            element.className = element.className.replace(' ' + value, '');
        }
    };

    // Public
    return {
        init: function() {

            var tiles = util.getTiles();
            var toggleClass = 'on';
            var localStorageKey = 'colors';

            // Bind color toggle.
            tiles.forEach(function(tile, index, tiles) {
                tile.addEventListener('click', function(event) {
                    if (util.hasClass(tile, toggleClass)) {
                        util.removeClass(tile, toggleClass);
                        tile.style.background = '';
                    } else {
                        util.addClass(tile, toggleClass);
                        tile.style.background = util.getRandomColor();
                    }
                });
            });

            // Bind clear color.
            var clear = document.getElementById('clear');
            clear.addEventListener('click', function(event) {
                tiles.forEach(function(tile, index, tiles) {
                    util.removeClass(tile, toggleClass);
                    tile.style.background = '';
                });
            });

            // Bind save to local storage.
            var save = document.getElementById('save');
            save.addEventListener('click', function(event) {
                var data = [];
                tiles.forEach(function(tile, index, title) {
                    data.push(tile.style.background);
                });
                window.localStorage.setItem(localStorageKey, window.JSON.stringify(data));
            });

            // Load last saved from local storage.
            var saved = window.JSON.parse(window.localStorage.getItem(localStorageKey));
            if (saved) {
                tiles.forEach(function(tile, index, tiles) {
                    var color = saved[index];
                    if (color) {
                        tile.style.background = color;
                        util.addClass(tile, toggleClass);
                    }
                });
            }
        }
    };
}());

// Initialize on load.
window.addEventListener('load', function() {
    window.colors.init();
});
