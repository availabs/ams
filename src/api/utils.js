export const Config = (() => {
	let config = null;
	return function Configger(_config) {
		if (!arguments.length) {
			return config;
		}
		config = _config;
		Object.keys(_config).forEach(k => Configger[k] = _config[k]);
		return Configger;
	}
})();

export const postJson = (url, body) =>
	fetch(url, {
		method: "POST",
    headers: {
      	Accept: 'application/json, text/plain',
        "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
	})
	.then(r => r.json());
