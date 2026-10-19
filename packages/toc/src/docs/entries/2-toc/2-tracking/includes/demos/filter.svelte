<script>
	import { Toc } from '@svelte-put/toc';

	const toc = new Toc({
		id: 1,
		index: {
			selector: '.to-index',
		},
		anchor: false,
		track: {
			enabled: ({ item }) => item.id !== 'table-of-contents',
		},
	});
</script>

<section class="h-100 overflow-auto overscroll-contain border border-current">
	<p class="sr-only">
		A visual demo showing a floating Table-of-Contents on the right an scrollable content on the
		left
	</p>
	<div
		class="tablet:grid-cols-[2fr_1fr] grid grid-cols-2 grid-rows-1 gap-4"
		aria-hidden="true"
		{...toc.enhance.scope()}
		{...toc.runtime.index()}
	>
		<div class="inset-bs-4 not-md sticky col-2 h-fit space-y-3 border-s border-s-current px-4">
			<p class="to-index text-xl font-bold">Table of Contents</p>
			<ol class="ms-4">
				{#each toc.items.values() as item (item.id)}
					<li>
						<a
							class="c-link-lazy leading-double block w-full overflow-hidden text-ellipsis whitespace-nowrap"
							{...toc.enhance.link(item)}
						>
							{item.text}
						</a>
					</li>
				{/each}
			</ol>
		</div>
		<div class="row-1 p-4">
			<p class="to-index text-xl font-bold">What is Lorem Ipsum?</p>
			<p>
				Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
				been the industry's standard dummy text ever since 1966, when designers at Letraset and
				James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero
				translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has
				survived not only many decades, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised thanks to these sheets and more recently with
				desktop publishing software like Aldus PageMaker and Microsoft Word including versions of
				Lorem Ipsum.
			</p>
			<p class="to-index text-xl font-bold">Why do we use it?</p>
			<p>
				It is a long established fact that a reader will be distracted by the readable content of a
				page when looking at its layout. The point of using Lorem Ipsum is that it has a
				more-or-less normal distribution of letters, as opposed to using 'Content here, content
				here', making it look like readable English. Many desktop publishing packages and web page
				editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will
				uncover many web sites still in their infancy. Various versions have evolved over the years,
				sometimes by accident, sometimes on purpose (injected humour and the like).
			</p>
			<p class="to-index" style:font-weight="700" style:font-size="1.5rem">
				Where does it come from?
			</p>
			<p>
				Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece
				of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock,
				a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
				Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the
				word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from
				sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
				Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very
				popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
				amet..", comes from a line in section 1.10.32. The standard chunk of Lorem Ipsum used since
				1966 is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus
				Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied
				by English versions from the 1914 translation by H. Rackham.
			</p>
			<p class="to-index" style:font-weight="700" style:font-size="1.5rem">Where can I get some?</p>
			<p>
				There are many variations of passages of Lorem Ipsum available, but the majority have
				suffered alteration in some form, by injected humour, or randomised words which don't look
				even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be
				sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum
				generators on the Internet tend to repeat predefined chunks as necessary, making this the
				first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined
				with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
				The generated Lorem Ipsum is therefore always free from repetition, injected humour, or
				non-characteristic words etc.
			</p>
		</div>
	</div>
</section>
