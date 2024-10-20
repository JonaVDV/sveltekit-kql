<script lang="ts" generics="T extends Record<string, any>">
	interface Props {
		note: T;
		excerpt: boolean;
	}

	let { note, excerpt }: Props = $props();

	console.log(note.cover);

	function formatDateTimeShort(date: Date) {
		return new Intl.DateTimeFormat('en-US', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		}).format(date);
	}
</script>

<article class="note-excerpt">
	<a href="/{note.id}">
		<header>
			<figure class="img" style="--w: 16; --h: 9;">
				{#if note.cover}
					<img src={note.cover.url} alt="" />
				{:else}
					<img src={note.images[0].url} alt="" />
				{/if}
			</figure>

			<h2 class="note-excerpt-title">
				{note.title}
			</h2>
			{#if note.published}
				<time class="note-excerpt-date" datetime={note.published}>
					{formatDateTimeShort(new Date(note.published * 1000))}
				</time>
			{/if}

			{#if excerpt}
				<div class="note-excerpt-text">
					{note.text}
				</div>
			{/if}
		</header>
	</a>
</article>

<style>
	.note-excerpt {
		line-height: 1.5em;
	}
	.note-excerpt header {
		margin-bottom: 1.5rem;
	}
	.note-excerpt figure {
		margin-bottom: 0.5rem;
	}
	.note-excerpt-title {
		font-weight: 600;
	}
	.note-excerpt-date {
		color: var(--color-text-grey);
	}
</style>
