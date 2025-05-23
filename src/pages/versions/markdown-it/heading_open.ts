import md, { proxy } from "."

const defaultHeadingOpenRenderer = md.renderer.rules.heading_open || proxy
/**
 * <h#>
 * Convert h3 tags to time tags whenever there is \t after the h3 markup.
 * @param tokens List of all tokens being parsed
 * @param idx Number that corresponds to the key of the current token in tokens
 * @param options The options defined when creating the new markdown-it object ({} in our case)
 * @param self A reference to the renderer itself
 */
md.renderer.rules.heading_open = function(tokens, idx, options, env, self) {
	// Use https://markdown-it.github.io/

	// Only h3
	if (tokens[idx].tag === "h3" && tokens[idx + 1].content.startsWith("\\t")) {
		// Remove \t
		tokens[idx + 1].children![0].content = tokens[idx + 1].children![0].content.slice(2)

		// Change tag
		tokens[idx].tag = "time"

		// Add classes
		tokens[idx].attrJoin("datetime", tokens[idx + 1].children![0].content.split("/").reverse().join("-"))
		tokens[idx].attrJoin("class", "headerDate")
	}

	// Return the default settings
	return defaultHeadingOpenRenderer(tokens, idx, options, env, self)
}