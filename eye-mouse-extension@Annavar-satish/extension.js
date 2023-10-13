// extension.js
const { St, Clutter, Main } = imports.ui;
const Mainloop = imports.mainloop;

let circle, line;

// Function to enable the extension
function enable() {
    // Create the circle
    circle = new St.DrawingArea({
        style_class: 'circle'
    });
    circle.connect('repaint', () => {
        let ctx = circle.get_context();
        ctx.set_source(new Clutter.Color({ red: 255, green: 255, blue: 0 }));
        ctx.arc(circle.width / 2, circle.height / 2, 50, 0, Math.PI * 2);
        ctx.fill();
    });

    // Create the line
    line = new St.Bin({
        style_class: 'line',
        reactive: false,
        can_focus: false,
        width: 1,
        height: 20
    });

    // Add the circle and line to the UI
    Main.uiGroup.add_actor(circle);
    Main.uiGroup.add_actor(line);

    // Connect the motion event to update the line position
    Mainloop.idle_add(updateLinePosition);
}

// Function to update the line position based on mouse position
function updateLinePosition() {
    let [x, y, mods] = global.get_pointer();
    line.set_position(x, y);
    return true; // Keep the loop running
}

// Function to disable the extension
function disable() {
    circle.destroy();
    line.destroy();
}

// Run the enable function when the extension is initialized
enable();
