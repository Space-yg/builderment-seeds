import md, { proxy } from "."

const defaultHeadingCloseRenderer = md.renderer.rules.heading_close || proxy
/**
 * </h#>
 * Convert h3 tags to time tags whenever there is \t after the h3 markup.
 * @param tokens List of all tokens being parsed
 * @param idx Number that corresponds to the key of the current token in tokens
 * @param options The options defined when creating the new markdown-it object ({} in our case)
 * @param self A reference to the renderer itself
 */
md.renderer.rules.heading_close = function(tokens, idx, options, env, self) {
	// Only h3
	if (tokens[idx].tag === "h3" && tokens[idx - 1].content.startsWith("\\t")) tokens[idx].tag = "time"

	// Return the default settings
	return defaultHeadingCloseRenderer(tokens, idx, options, env, self)
}