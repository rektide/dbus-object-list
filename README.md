# Dbus Object List

**Dbus Object List** is a helper library for a common Dbus pattern- properties which are (perhaps changing) **object path** lists.

Provides:

* Dbus Object List retrieves the initial list, and subscribes to New and Removed signals for the list to keep itself updated.
* When provided a Dbus `interface` string and `bus` generating-function, it builds objects for the object paths. Instead of being a list of paths, it serves as a mapping *object path => Promise<object>.*
* When provided a (bound) `emit` function, it emits events for add and remove, using the name, and providing *value, objectPath* event arguments.
