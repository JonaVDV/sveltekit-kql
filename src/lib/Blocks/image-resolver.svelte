<script lang='ts'>
  type ImageResolverCollection = (Record<string, any>) & {
	  url: string | null | undefined;uuid: string
}[]
  export let uuid: string;
  export let collection: ImageResolverCollection

  if (!uuid) {
    throw new TypeError('Uuid must be provided')
  }

  if (!Array.isArray(collection)) {
    throw new TypeError('Collection must be an array')
  }

  const image = collection.find((image) => image.uuid === uuid)
  if (!image) {
    throw new Error(`Image with uuid ${uuid} not found`)
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
  <slot {image} />
{/if}