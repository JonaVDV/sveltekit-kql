<script lang="ts">
	import Intro from '$lib/components/intro.svelte';
	import type { PageData } from './$types';

	let { data } = $props();

	let cmsData = $derived(data.kqlData);
</script>

<article>
	<Intro />

	<div class="grid">
		<div class="column" style="--columns: 4">
			<div class="text">
				{@html cmsData.text}
			</div>
		</div>

		<div class="column" style="--columns: 8">
			<ul class="album-gallery">
				<li v-for="(image, index) in page?.gallery ?? []" :key="index">
					<figure
						class="img"
						:style="`
                  --w: ${image.width};
                  --h: ${image.height};
                `"
					>
						<ElementMediumZoom
							:src="image.resized.url"
							:data-zoom-src="image.url"
							:alt="image.alt"
						/>
					</figure>
				</li>
			</ul>
		</div>
	</div>
</article>
