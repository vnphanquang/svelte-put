<script lang="ts" module>
	import { defineDocPageMetadata } from '@internals/docpage';
	import { markdown } from '@vnphanquang/markdown/svelte';
	import Avatar from '@svelte-put/avatar/Avatar.svelte';

	import DemoCustomStyling from './includes/examples/custom-styling.svelte';

	export const metadata = defineDocPageMetadata({
		title: 'Usage',
	});
</script>

{markdown`
In this text, the \`Avatar\` component is imported as:

~~~svelte
<script>
	import Avatar from '@svelte-put/avatar/Avatar.svelte';
</script>
~~~

## Resolution Strategies

\`@svelte-put/avatar\` provides several strategies for specifying image source, used in isolation or
together to form a chain that will resolve to the first available source.

> [!STEPLIST]
>
> 1. \`src\` prop - highest priority, most helpful when used in conjuction with others,
> 2. \`gravatar\` prop - [Gravatar],
> 3. \`uiAvatar\` prop - [UI Avatar],
> 4. \`fallback\` prop - custom fallback,
> 5. [internal fallback](https://www.gravatar.com/avatar?d=mp), last resort.

For example:

1. \`src\` - you have a dedicated api & database for avatar,
2. \`gravatar\` - you also want to automatically fetch avatar from [Gravatar] with user's email if
   they have not uploaded their own avatar to your server,
3. \`uiAvatar\` - you also want to fallback to an [UI Avatar] with user's initials if their gravatar
   is not available,
4. \`fallback\` - you provide your own custom fallback just in case [UI Avatar] is out of service
   all of the sudden.

## Direct URL
`}

<Avatar
	class="float-right my-0 ms-2"
	src="https://media.istockphoto.com/id/697946430/photo/pitbull-dog-portrait-with-human-expression.jpg?s=612x612&w=0&k=20&c=uWT9vBoCZPPyg9xkJ0cQI-HqWd5slf7_QsdiwYvazSY="
	size={50}
/>

{markdown`
Direct image source can be provided to the \`src\` prop. This is not much different than using a
plain \`img\`, thus more helpful when used in conjunction with one/more solutions listed in later
sections.

~~~svelte
<Avatar
	src="https://media.istockphoto.com/id/697946430/photo/pitbull-dog-portrait-with-human-expression.jpg?s=612x612&w=0&k=20&c=uWT9vBoCZPPyg9xkJ0cQI-HqWd5slf7_QsdiwYvazSY="
/>
~~~

## Gravatar
`}

<Avatar
	class="float-right my-0 ms-2"
	gravatar={{ email: 'maxmayfield@upside.down', rating: 'r', size: 50, default: 'monsterid' }}
	size={50}
/>

{markdown`
Support for [Gravatar] is available through either:

1. the \`Avatar\` component with the \`gravatar\` prop, which takes either an email string
   or a verbose config object, or
2. the \`gravatar\` helper, which generates a [Gravatar] URL and can be used either with
   the \`Avatar\` component or vanilla \`img\`.

> [!CODEGROUP]
>
> ~~~svelte #title="Minimal"
> <Avatar gravatar="maxmayfield@upside.down" size={50} />
> ~~~
>
> ~~~svelte #title="Verbose"
> <Avatar
> 	gravatar={{
> 		email: 'maxmayfield@upside.down',
> 		rating: 'r',
> 		size: 50,
> 		default: 'monsterid',
> 		// forcedefault: 'y',
> 	}}
> />
> ~~~
>
> ~~~svelte #typehint #title="Helper" src="fs:./includes/examples/gravatar-helper.svelte"
>
> ~~~

## UI Avatar
`}

<Avatar class="float-right my-0 ms-2" uiAvatar="Eddie+Munson" size={50} />

{markdown`
Similar to Gravatar, Suport for [UI Avatar] is available through either:

1. the \`Avatar\` component with the \`\` prop, which takes either an string of user name
   or a verbose config object, or
2. the \`gravatar\` helper, which generates a [UI Avatar] URL and can be used either with
   the \`Avatar\` component or vanilla \`img\`.

> [!CODEGROUP]
>
> ~~~svelte #title="Minimal"
> <Avatar uiAvatar="Eddie+Munson" size={50} />
> ~~~
>
> ~~~svelte #title="Verbose"
> <Avatar
> 	uiAvatar={{
> 		name: 'Eddie+Munson',
> 		background: '313131',
> 		color: 'FFFFFF',
> 		'font-size': 0.3,
> 		uppercase: true,
> 		rounded: false,
> 		length: 2,
> 		bold: true,
> 		size: 50,
> 		format: 'svg',
> 	}}
> />
> ~~~
>
> ~~~svelte #typehint #title="Helper" src="fs:./includes/examples/uiavatar-helper.svelte"
>
> ~~~

## Combining Sources
`}

<Avatar
	class="float-right my-0 ms-2"
	gravatar="steve.harrington@upside.down"
	uiAvatar="Steve+Harrington"
	size={50}
/>

{markdown`
Using only one of the strategy in previous sections is not that interesting. As mentioned in
[Resolution Strategies](#resolution-strategies), multiple sources can be provided to form a chain
that resolves to the first available source.

~~~svelte
<Avatar gravatar="steve.harrington@upside.down" uiAvatar="Steve+Harrington" size={50} />
~~~

## Customisation

### Markup
`}

<Avatar class="float-right my-0 ms-2" uiAvatar="Billy+Hargrove" size={50} />

{markdown`
The \`Avatar\` component provides a \`img\` snippet with all necessary values as parameters. You may
use this strategy to control how the avatar is rendered.

~~~svelte #typehint src="fs:./includes/examples/custom-markup.svelte"

~~~

### Styling
`}

<div class="not-md float-right p-10">
	<DemoCustomStyling />
</div>

{markdown`
The \`Avatar\` component provides minimal global styles with zero css specificity. Since [Svelte
style](https://svelte.dev/docs/svelte-components#style) are component-scoped by default,
customization generally requires global overrides and/or [CSS custom
properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). The code
example below shows a couple of ways to achieve this.

- The \`rounded-full\` class might come from a global styling system like [Tailwind CSS](https://tailwindcss.com/).
- The \`custom-avatar\` class is used with the \`:global\` modifier. See [Svelte docs](https://svelte.dev/docs/svelte-components#style) for more information.
- The \`--border-color\` CSS variable is set up to be used for \`color\` attribute, made possible with [Svelte --style-props](https://svelte.dev/docs/component-directives#style-props) sugar.

~~~svelte src="fs:./includes/examples/custom-styling.svelte"

~~~

[Gravatar]: https://docs.gravatar.com/
[UI Avatar]: https://ui-avatars.com/
`}
