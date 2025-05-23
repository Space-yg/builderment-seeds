import md, { proxy } from "."

const defaultLinkOpenRenderer = md.renderer.rules.link_open || proxy
/**
 * <a>
 * Add target="_blank" attribute whenever there is ~ after the link.
 * @param tokens List of all tokens being parsed
 * @param idx Number that corresponds to the key of the current token in tokens
 * @param options The options defined when creating the new markdown-it object ({} in our case)
 * @param self A reference to the renderer itself
 */
md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
	for (let i = 1; i < tokens.length - idx - 1; i++) {
		if (tokens[idx + i].type === "link_close") {
			// if there is ~ after the link tag
			if (tokens[idx + i + 1].content[0] === "~") {
				// Add target="_blank"
				tokens[idx].attrJoin("target", "_blank")

				// Remove ~
				tokens[idx + i + 1].content = tokens[idx + i + 1].content.slice(1)
			}
			break
		}
	}

	// Return the default settings
	return defaultLinkOpenRenderer(tokens, idx, options, env, self)
}