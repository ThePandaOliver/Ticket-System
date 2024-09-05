export const apiUrl = "http://localhost:8080/api"

export async function getHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "GET", body);
}

export async function postHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "POST", body);
}

export async function putHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "PUT", body);
}

export async function delHttpRequest(path: RequestInfo | URL, body?: {[key: string]: any}): Promise<Response> {
	return httpRequest(path, "DELETE", body);
}

async function httpRequest(path: RequestInfo | URL, method: string, body?: {[key: string]: any}): Promise<Response> {
	const response = await fetch(path, {
		method: method,
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(body),
	});

	if (!response.ok)
		throw new Error(response.statusText);

	return response;
}