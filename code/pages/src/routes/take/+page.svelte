<script>
	import { goto } from '$app/navigation';

	let loading = false;
	let lastError = '';
	let name = '';

	/**
	 * Do take.
	 * @param event {SubmitEvent}
	 */
	async function doTake(event) {
		event.preventDefault();
		loading = true;

		try {
			if (!name) throw new Error('Name is missing');

			const res = await fetch(`/api/take`, {
				method: 'POST',
				body: JSON.stringify({
					name
				}),
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json'
				}
			});

			if (res.status != 201) {
				throw new Error('Status code not equal to 201');
			}

			const data = await res.json();

			goto('/');
		} catch (err) {
			if (err instanceof Error) {
				lastError = err.message;
			}
		} finally {
			loading = false;
		}
	}
</script>

<div class="p-4 text-primary-content">
	<div class="flex flex-col gap-4 max-w-2xl mx-auto rounded-box bg-base-200 p-4 text-base-content">
		<div>
			<h1 class="text-5xl font-bold">Take key</h1>
			<sub class="text-lg italic">The key, you can take.</sub>
		</div>
		<div class="flex flex-col gap-2">
			{#if lastError}
				<div class="alert alert-error shadow-lg">
					<div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="stroke-current flex-shrink-0 h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
							/></svg
						>
						<span>{lastError}</span>
					</div>
				</div>
			{/if}
			<form class="flex flex-col gap-2" on:submit={doTake}>
				<div class="form-control w-full">
					<label class="label" for="name">
						<span class="label-text">What is your first name?</span>
					</label>
					<input
						type="text"
						id="name"
						placeholder="Type here"
						class="input input-bordered w-full"
						required
						bind:value={name}
					/>
					<label class="label" for="name">
						<span class="label-text-alt"
							>Enter your first name so that the next person knows who took the key.</span
						>
					</label>
				</div>
				<button type="submit" class="btn btn-primary btn-block disabled:loading" disabled={loading}
					>Take the key</button
				>
			</form>
		</div>
	</div>
</div>
