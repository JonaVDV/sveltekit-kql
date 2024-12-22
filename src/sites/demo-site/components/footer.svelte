<script lang="ts">
	import { page } from '$app/state';
	import Heading from '$lib/site/components/heading.svelte';

	let pages = $derived(page.data.site.children);
</script>

<footer>
	<div class="wrapper">
		<section class="made-with">
			<Heading
				block={{
					content: {
						level: 'h2',
						text: 'Made with Kirby'
					},
					id: 'footer-heading',
					type: 'heading',
					isHidden: false
				}}
			/>
			<p>
				Kirby: the file-based CMS that adapts to any project, loved by developers and editors alike
			</p>
		</section>
		<div class="even-columns">
			<section class="pages">
				<Heading level="h2" id="test">
					{#snippet children()}
						Pages
					{/snippet}
				</Heading>
				<ul role="list">
					{#each pages as page}
						{#if page.isListed}
							<li>
								<a href="/{page.id}">
									{page.title}
								</a>
							</li>
						{/if}
					{/each}
				</ul>
			</section>

			<section class="kirby-socials">
				<Heading
					block={{
						content: {
							level: 'h2',
							text: 'Kirby'
						},
						id: 'footer-heading',
						type: 'heading',
						isHidden: false
					}}
				/>
				<ul role="list">
					<li><a href="https://getkirby.com">Website</a></li>
					<li><a href="https://getkirby.com/docs">Docs</a></li>
					<li><a href="https://forum.getkirby.com">Forum</a></li>
					<li><a href="https://chat.getkirby.com">Chat</a></li>
					<li><a href="https://github.com/getkirby">GitHub</a></li>
				</ul>
			</section>
		</div>
	</div>
</footer>

<style>
	.wrapper::before {
		background-color: var(--color-black);
		content: '';
		height: 2px;
		width: 1.5rem;
		top: 7rem;
		position: absolute;
	}
	footer .wrapper {
		display: grid;
		grid-template-columns: min(15rem, 100%) auto;
		gap: 3rem;
		justify-content: space-between;
	}

	footer {
		color: var(--color-text-grey);
		position: relative;
		padding-block: 9rem;
		line-height: 1.5rem;
	}

	.even-columns {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: min(100%, 9.375rem);
		gap: 3rem;
	}

	:global(footer h2) {
		color: var(--color-black);
	}

	footer a {
		color: currentColor;
		text-decoration: none;
	}

	footer a:is(:hover, :focus) {
		color: var(--color-black);
	}
</style>
