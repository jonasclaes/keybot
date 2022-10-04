export async function onRequestPost(context: EventContext<any, string, any>) {
	const requestData = await context.request.json<{ name: string }>();

	if (!requestData.name) {
		return new Response(JSON.stringify({ error: 'Missing parameter', parameter: 'name' }), {
			status: 400,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	const data = {
		content: 'Bleep bloop!',
		embeds: [
			{
				title: 'Someone returned the key',
				description: 'Someone returned the key and registered this on the website.',
				color: 1528766,
				fields: [
					{
						name: 'Person',
						value: requestData.name
					}
				],
				footer: {
					text: 'Kind regards,\nYour key bot'
				}
			}
		],
		attachments: []
	};

	const res = await fetch(context.env.WEBHOOK_URL, {
		method: 'POST',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		}
	});

    console.log(res.status)

	if (res.status != 204) {
		return new Response(JSON.stringify({ error: 'Internal server error' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	return new Response(JSON.stringify({ message: 'OK' }), {
		status: 201,
		headers: {
			'Content-Type': 'application/json'
		}
	});
}
