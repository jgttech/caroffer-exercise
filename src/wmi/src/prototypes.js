/**
 * [ABOUT]
 * I keep the prototype modifications/additions
 * in a separate single file or folder of files
 * to prevent cross-polution of prototype mods
 * between randomly used custom prototype instances.
 * Generally, this should be imported above the
 * entire rest of the application for precedence
 * purposes.
 */
import { type, length as len } from "ramda";

/**
 * Allows me to use "string".title() to format a
 * "string" to "String"; to have a capital letter
 * for the first character.
 */
String.prototype.title = function() {
    return !this ? this.toString() : len(this) > 1 && type(this) === "String"
        ? `${this.charAt(0).toUpperCase()}${this.substring(1)}`
        : this.toUpperCase();
}