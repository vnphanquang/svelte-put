<main class="space-y-10 p-10">
	<h1 class="text-primary text-5xl">svelte-put :3 Tailwind 4</h1>
	<p>Trying my best over here</p>

	<p>
		.c-link: <a class="c-link" href="https://example.com">www.example.com</a>
	</p>
	<p>
		.c-link-preserved: <a class="c-link-preserved" href="https://example.com">www.example.com</a>
	</p>
	<p>
		c-link-lazy: <a class="c-link-lazy" href="https://example.com">www.example.com</a>
	</p>
	<p>
		c-link-icon:
		<a class="c-link-icon" href="https://github.com/vnphanquang">
			<span class="sr-only">vnphanquang's Github</span>
			<svg class="inline-block h-6 w-6" width="24" height="24" inline-src="simpleicon/github"></svg>
		</a>
	</p>

	<div>
		<p>.c-link-image</p>
		<a href="https://example.com" class="c-link-image">
			<img src="/images/github-social-preview.svg" width="800" height="400" alt="test" />
		</a>
	</div>

	<p>
		Plain input .c-text-input:
		<input class="c-text-input" type="email" placeholder="user@example.com" />
	</p>

	<section>
		<p>Input with icon .c-text-input:</p>
		<div class="c-text-input">
			<svg class="h-6 w-6" width="24" height="24" inline-src="phosphor/magnifying-glass"></svg>
			<input type="email" placeholder="user@example.com" />
		</div>
	</section>

	<section>
		<p>Input with icon .c-text-input but disabled:</p>
		<div class="c-text-input">
			<svg class="h-6 w-6" width="24" height="24" inline-src="phosphor/magnifying-glass"></svg>
			<input type="email" placeholder="user@example.com" required disabled />
		</div>
	</section>

	<section>
		<p>
			.c-checkbox
			<input class="c-checkbox" type="checkbox" />
		</p>
	</section>

	<section>
		<p>
			.c-checkbox but disabled:
			<input class="c-checkbox" type="checkbox" disabled />
		</p>
	</section>

	<section>
		<p>
			.c-radio
			<input class="c-radio" type="radio" name="test" />
			<input class="c-radio" type="radio" name="test" />
		</p>
	</section>

	<section>
		<p>
			.c-radio but disabled:
			<input class="c-radio" type="radio" disabled />
		</p>
	</section>
</main>
