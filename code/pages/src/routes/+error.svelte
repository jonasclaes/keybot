<script>
	import { page } from '$app/stores';

	function goBack() {
		history.back();
	}
</script>

<div class="hero min-h-screen bg-base-200">
	<div class="hero-content text-left w-full">
		<div class="max-w-2xl">
			<h1 class="text-5xl font-bold">{$page.status}</h1>
			<sub class="text-xl font-bold">{$page.error?.message}</sub>
			<p class="py-6">Oops, an error ocurred. Please try again later.</p>
			<button class="btn btn-primary" on:click={goBack}>Go back</button>
		</div>
	</div>
</div>
