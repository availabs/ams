export const Config = (() => {
	let config = null;
	return function Configger(_config) {
		if (!arguments.length) {
			return config;
		}
		config = { ..._config };
		Object.assign(Configger, _config);
		return Configger;
	}
})();

export const postJson = (url, body, options = {}) =>
	fetch(url, {
		method: "POST",
    headers: {
      	Accept: 'application/json, text/plain',
        "Content-type": "application/json"
    },
    body: JSON.stringify(body),
		...options
	})
	.then(r => {
		if (r.ok) {
			return r.json();
		}
		throw new Error("There was a network problem.")
	});
