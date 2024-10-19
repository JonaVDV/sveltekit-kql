<script lang="ts">
	type ImageResolverCollection = Record<string, any> &
		{
			url: string | null | undefined;
			uuid: string;
		}[];
	interface Props {
		uuid: string;
		collection: ImageResolverCollection;
		children?: import('svelte').Snippet<[any]>;
	}

	let { uuid, collection, children }: Props = $props();

	if (!uuid) {
		throw new TypeError('Uuid must be provided');
	}

	if (!Array.isArray(collection)) {
		throw new TypeError('Collection must be an array');
	}

	const image = collection.find((image) => image.uuid === uuid);
	if (!image) {
		throw new Error(`Image with uuid ${uuid} not found`);
	}
</script>

<!-- 
  @component ImageResolver
  @description
    This component resolves an image from a collection of images by its uuid.
  @props
    - uuid: string
      The uuid of the image to resolve.
    - collection: ImageResolverCollection
      The collection of images to search in.
  @slots
    - image: Record<string, any>
      The resolved image.
  @example 
    <ImageResolver let:image uuid="123" collection={images}>
      <img src={image.url} alt={image.alt} />
    </ImageResolver>

 -->

{#if image}
	{@render children?.({ image })}
{/if}
