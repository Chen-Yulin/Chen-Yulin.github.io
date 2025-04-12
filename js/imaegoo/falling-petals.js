/**
 * Falling Blue Petals Effect
 * Inspired by universe.js by lvfan
 */

(function drawPetals() {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

    // Constants
    const petalDensity = 0.04; // Adjust for more or fewer petals
    const speedCoeff = 1.5;
    const canva = document.getElementById('flower');

    // Variables
    let width, height, petalCount, ctx;
    let petals = [];

    windowResizeHandler();
    window.addEventListener('resize', windowResizeHandler, false);

    function windowResizeHandler() {
        width = window.innerWidth;
        height = window.innerHeight;
        petalCount = Math.floor(width * petalDensity);

        if (canva) {
            canva.setAttribute('width', width);
            canva.setAttribute('height', height);
        }
    }

    function createPetals() {
        if (!canva) return;

        ctx = canva.getContext('2d');
        for (let i = 0; i < petalCount; i++) {
            petals[i] = new Petal();
            petals[i].reset();
        }

        draw();
    }

    function draw() {
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);

        // Draw petals
        const petalsLength = petals.length;
        for (let i = 0; i < petalsLength; i++) {
            console.log('drawing petals');
            const petal = petals[i];
            petal.update();
            petal.draw();
        }
    }

    function Petal() {
        this.reset = function() {
            // Random position at the top
            this.x = Math.random() * width;
            this.y = -20;

            // Random size between 5 and 15
            this.size = 5 + Math.random() * 10;

            // Random falling speed
            this.speed = speedCoeff * (1 + Math.random() * 2);

            // Random horizontal movement
            this.vx = Math.random() * 2 - 1;

            // Random rotation
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() * 0.02) - 0.01;

            // Random opacity
            this.opacity = 0.6 + Math.random() * 0.4;

            // Blue color variations
            const blueShade = Math.floor(150 + Math.random() * 105); // 150-255 range for blue
            this.color = 'rgba(100, 150, ' + blueShade + ', ' + this.opacity + ')';
        };

        this.update = function() {
            // Move petal down
            this.y += this.speed;

            // Add slight horizontal movement with a gentle swaying effect
            this.x += this.vx + Math.sin(this.y * 0.01) * 0.5;

            // Add rotation
            this.rotation += this.rotationSpeed;

            // Reset if out of screen
            if (this.y > height + 20 || this.x < -20 || this.x > width + 20) {
                this.reset();
            }
        };

        this.draw = function() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);

            // Draw petal shape
            ctx.beginPath();
            ctx.fillStyle = this.color;

            // Draw a petal shape (heart-like)
            const size = this.size;
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(
                size * 0.5, -size * 0.7,
                size * 1.5, -size * 0.4,
                0, size
            );
            ctx.bezierCurveTo(
                -size * 1.5, -size * 0.4,
                -size * 0.5, -size * 0.7,
                0, 0
            );
            ctx.fill();

            ctx.restore();
        };
    }

    /* ---------------------------------
     *     DRAW IN LIGHT MODE
     * --------------------------------- */
    function checkLightMode() {
        return document.body.classList.contains('light') ||
               (window.matchMedia &&
                window.matchMedia('(prefers-color-scheme: light)').matches &&
                !document.body.classList.contains('night'));
    }

    function animate() {
        draw();
        window.requestAnimationFrame(animate);
    }

    // Initialize on load
    createPetals();
    // animate();

    /* ---------------------------------
     *        www.imaegoo.com
     *     NO DRAW IN LIGHT MODE
     * --------------------------------- */
    (function imaegoo() {
        if (!document.body.classList.contains('night')) {
            console.log('Drawing petals in light mode');
            draw();
        } else {
            console.log('Not drawing petals in night mode');
        }
        window.requestAnimationFrame(imaegoo);
    })();
}());
