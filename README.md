#Storm Toggler

Progressive enhancement-lead, accessible state toggling. Toggles classes for CSS-based UI state manipulation.

    - Toggle documentElement classes based on target, style agnostic so you can apply your own styles and transitions based on page states
    - Or toggle parent element class to change localised UI states, or sub-states
    - Uses id/href-based targeting, so falls back to a fragment identifier link
    - Adds and toggles ARIA attributes
    - Built-in transition delays and animating-out class to hook transitions on to avoid unwanted animations on load/resize
    - Based on standard HTML5 markup

##Use cases

    - off-canvas elements, including hamburger or kebab navigation
    - modals (excluding gallery modals)
    - dropdown toggles
    - show/hide
    - any basic UI animation involving an element trigger
    - localised UI sub-state toggling would apply to child or nested elements, such as submenu item children