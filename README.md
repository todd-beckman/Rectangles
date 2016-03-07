Rectangles
----------

At the present, it is a simple JavaScript program that will render
some particles (rectangles) and have them bounce around the canvas.
The number of particles and target framerate can be changed at runtime
and the program will update to track the data as necessary.

I could possibly add collision detection and make a personal project to preserve framerate with ridiculous numbers of triangles.

Currently there is an odd spiking behavior where the target framerate is 
perfectly maintained for a few seconds, and then well-timed lag spikes ruin
everything since the delta in the update function does not seem to recognize
these spikes. I suspect though that the spikes are caused by the system, not
the code. Currently the framerate it can handle is 60fps with 5600 rectangles.