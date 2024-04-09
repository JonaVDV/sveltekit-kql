<script lang="ts">
	import type { KQLData } from './$kql';
	import { KirbyLayouts } from '$lib';
	export let data: KQLData;

	$: layouts = data['page("/about")'].result.layouts;

	$: aboutPage = data['page("/about")'].result;
</script>

<KirbyLayouts --grid-gap="3rem" {layouts} />

<aside class="contact">
	<h2 class="h1">Get in contact</h2>
	<div class="grid" style="--gutter: 1.5rem">
		<section class="column text" style="--columns: 4">
			<h3>Address</h3>
			<div>
        {@html aboutPage.address}
      </div>
		</section>

		<section class="column text" style="--columns: 4">
			<h3>Email</h3>
      <p>
        {@html aboutPage.email}
      </p>
			<h3>Phone</h3>
			<p>
				{@html aboutPage.phone}
			</p>
		</section>

		<section class="column text" style="--columns: 4">
			<h3>On the web</h3>
			<ul>
        {#each aboutPage.social as item, index}
          <li>
            <a href={item.url}>
              {item.platform}
            </a>
          </li>
        {/each}
			</ul>
		</section>
	</div>
</aside>
