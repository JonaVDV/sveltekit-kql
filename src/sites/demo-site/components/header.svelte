<script lang="ts">
	import { page } from '$app/state';

	const currentRoute = page.route.id;

	let site = page.data.site;

	let listedChildren = $derived.by(() => {
		const routes = page.data.site.children;
		return routes.filter((route) => route.isListed);
	});
</script>

<div class="wrapper">
	<header class="primary-header | flex-group space-between">
		<a href="/demo" class="logo">
			{site.title}
		</a>

		<nav class="primary-navigation | flex-group">
			<ul role="list" class="flex-group">
				{#each listedChildren as child}
					<li>
						<a
							href="/demo/{child.id}"
							class:active={`/demo/${child.id}` === currentRoute}
							aria-current={currentRoute && currentRoute.startsWith(`/demo/${child.id}`)
								? 'page'
								: null}
						>
							{child.title}
						</a>
					</li>
				{/each}
			</ul>

			<ul class="social | flex-group">
				<a href="https://twitter.com/getkirby" aria-label="Kirby cms twitter"
					><img
						alt=""
						src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%3e%3cg%20class='nc-icon-wrapper'%20fill='%23111111'%3e%3cpath%20fill='%23111111'%20d='M16,3c-0.6,0.3-1.2,0.4-1.9,0.5c0.7-0.4,1.2-1,1.4-1.8c-0.6,0.4-1.3,0.6-2.1,0.8c-0.6-0.6-1.5-1-2.4-1%20C9.3,1.5,7.8,3,7.8,4.8c0,0.3,0,0.5,0.1,0.7C5.2,5.4,2.7,4.1,1.1,2.1c-0.3,0.5-0.4,1-0.4,1.7c0,1.1,0.6,2.1,1.5,2.7%20c-0.5,0-1-0.2-1.5-0.4c0,0,0,0,0,0c0,1.6,1.1,2.9,2.6,3.2C3,9.4,2.7,9.4,2.4,9.4c-0.2,0-0.4,0-0.6-0.1c0.4,1.3,1.6,2.3,3.1,2.3%20c-1.1,0.9-2.5,1.4-4.1,1.4c-0.3,0-0.5,0-0.8,0c1.5,0.9,3.2,1.5,5,1.5c6,0,9.3-5,9.3-9.3c0-0.1,0-0.3,0-0.4C15,4.3,15.6,3.7,16,3z'/%3e%3c/g%3e%3c/svg%3e"
					/></a
				><a href="https://chat.getkirby.com" aria-label="Kirby cms discord"
					><img
						alt=""
						src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20class='icon%20icon-discord'%20viewBox='0%200%2016%2016'%3e%3cpath%20d='M6.552,6.712a.891.891,0,0,0,0,1.776A.852.852,0,0,0,7.368,7.6.847.847,0,0,0,6.552,6.712Zm2.92,0a.891.891,0,1,0,.816.888A.852.852,0,0,0,9.472,6.712Z'%3e%3c/path%3e%3cpath%20d='M13.36,0H2.64A1.644,1.644,0,0,0,1,1.648V12.464a1.644,1.644,0,0,0,1.64,1.648h9.072l-.424-1.48,1.024.952.968.9L15,16V1.648A1.644,1.644,0,0,0,13.36,0ZM10.272,10.448S9.984,10.1,9.744,9.8a2.524,2.524,0,0,0,1.448-.952,4.578,4.578,0,0,1-.92.472,5.265,5.265,0,0,1-1.16.344A5.6,5.6,0,0,1,7.04,9.656a6.716,6.716,0,0,1-1.176-.344,4.683,4.683,0,0,1-.912-.472,2.488,2.488,0,0,0,1.4.944c-.24.3-.536.664-.536.664a2.9,2.9,0,0,1-2.44-1.216A10.713,10.713,0,0,1,4.528,4.568a3.956,3.956,0,0,1,2.248-.84l.08.1a5.4,5.4,0,0,0-2.1,1.048s.176-.1.472-.232a6.008,6.008,0,0,1,1.816-.5.788.788,0,0,1,.136-.016A6.769,6.769,0,0,1,8.792,4.1a6.521,6.521,0,0,1,2.408.768A5.324,5.324,0,0,0,9.208,3.856l.112-.128a3.956,3.956,0,0,1,2.248.84A10.713,10.713,0,0,1,12.72,9.232,2.924,2.924,0,0,1,10.272,10.448Z'%20/%3e%3c/svg%3e"
					/></a
				><a aria-label="Kirby cms instagram" href="https://instagram.com/getkirby"
					><img
						alt=""
						src="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='16'%20height='16'%20viewBox='0%200%2016%2016'%3e%3cg%20class='nc-icon-wrapper'%20fill='%23111111'%3e%3ccircle%20fill='%23111111'%20cx='12.145'%20cy='3.892'%20r='0.96'/%3e%3cpath%20data-color='color-2'%20d='M8,12c-2.206,0-4-1.794-4-4s1.794-4,4-4s4,1.794,4,4S10.206,12,8,12z%20M8,6C6.897,6,6,6.897,6,8%20s0.897,2,2,2s2-0.897,2-2S9.103,6,8,6z'/%3e%3cpath%20fill='%23111111'%20d='M12,16H4c-2.056,0-4-1.944-4-4V4c0-2.056,1.944-4,4-4h8c2.056,0,4,1.944,4,4v8C16,14.056,14.056,16,12,16z%20M4,2C3.065,2,2,3.065,2,4v8c0,0.953,1.047,2,2,2h8c0.935,0,2-1.065,2-2V4c0-0.935-1.065-2-2-2H4z'/%3e%3c/g%3e%3c/svg%3e"
					/>
				</a>
			</ul>
		</nav>
	</header>
</div>

<style>
	a {
		text-decoration: none;
		color: inherit;
	}

	.logo {
		font-weight: 600;
		padding: 1rem;
	}

	.primary-navigation a[aria-current='page'] {
		text-decoration: underline;
	}

	li {
		padding: 1rem;
	}
</style>
