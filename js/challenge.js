document.addEventListener("DOMContentLoaded", () => {
    function copyArray(a) {
        // If a is an array of list items, make a copy of the array,
        // and return the copy
        if(Array.isArray(a)) {
            const c = [...a];
            return c;
        }
        // Make an array of list items from the HTMLCollection,
        // and return the array
        return Array.from(a)
    };

    let timer = function() {
        return setInterval(function() {
            const a = document.querySelector('#counter'),
                b = parseInt(a.innerHTML);
            a.innerHTML = b + 1;
        }, 1000);
    };

    let playing = true,
        // Let the counter begin
        interval = timer();

    const minus = document.querySelector('#minus'),
        plus = document.querySelector('#plus'),
        heart = document.querySelector('#heart'),
        pause = document.querySelector('#pause'),
        commentForm = document.querySelector('form');

    minus.addEventListener("click", function () {
        let a = document.querySelector('#counter'), b = parseInt(a.innerHTML);
        a.innerHTML = b - 1;
    });

    plus.addEventListener("click", function () {
        let a = document.querySelector('#counter'), b = parseInt(a.innerHTML);
        a.innerHTML = b + 1;
    });

    heart.addEventListener("click", function () {
        const a = document.querySelector('#counter'),
            b = parseInt(a.innerHTML), // b is the current count
            c = document.querySelector(".likes");  // c is the parent node of a list item, which is a count liked
        let d = undefined;  // d will be a child of the parent node c

        // Make an array of the counts liked, and check to see if the array includes the current count liked.
        // Then, incement the frequency by 1.
        if ([].concat(copyArray(c.children)).map(a => parseInt(a.dataset.num)).includes(b)) {
            d = document.querySelector('[data-num = "'+b+'"]');
            let e = parseInt(d.children[0].innerHTML);
            d.innerHTML = b + " has been liked <span> "+ (e + 1) + "</span> times"

        // Otherwise, create a list item, and make it a child of c
        } else {
            d = document.createElement("li");
            d.setAttribute("data-num", b);
            d.innerHTML= b + " has been liked <span>1</span> time";
            c.appendChild(d);
        }
    } );

    pause.addEventListener("click", function() {
        if (playing) {
            playing = false;
            clearInterval(interval); // Pause the counting
            this.innerHTML = "resume"; // 'this' is the pause button, so make it a resume butten
        } else {
            playing = true;
            interval = timer(); // Resume the counting
            this.innerHTML = "pause"; // 'this' is the resume butten, so make it a pause butten
        };

        // Make an array of all the buttons (-, +, heart, pause, and submit),
        // and set each disabled or enabled
        [].concat(copyArray(document.getElementsByTagName("button"))).forEach(a =>
            "pause" !== a.id&&(a.disabled = !playing))
    });

    commentForm.addEventListener("submit", function (a) {
        a.preventDefault();

        let b = this.children[0], // 'this' is commentForm
            c = b.value; // c is assigned the comment typed in
        
        // Set the comment area empty
        b.value = "";

        let d = document.querySelector(".comments"), // d is the parent node of e, which has the comment typed in
            e = document.createElement("p");
        e.innerHTML = c;
        d.appendChild(e);

    })
})
