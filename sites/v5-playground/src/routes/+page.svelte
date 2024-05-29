<script>
	import { Toc } from '@svelte-put/toc';

	const toc = new Toc({
		ignore: '#special',
		selector: ':where(h2,h3,h4,h5,h6)',
		observe: {
			enabled: true,
			strategy: 'auto',
			link: {
				throttleOnClick: 500,
				activeAttribute: 'aria-current',
			},
		},
		anchor: {
			content: '???',
			properties: {
				'data-test': 'blue',
			},
		},
		scrollMarginTop: 100,
	});

	$inspect(toc.config);
</script>

<main use:toc.actions.root style:position="relative">
  <h1>Page Heading</h1>

  <section style:position="sticky" style:top="0">
    <h2>Table of Contents</h2>
    {#if toc.items.size}
      <ul>
        {#each toc.items.values() as tocItem}
          <li>
            <!-- svelte-ignore a11y_missing_content -->
            <!-- svelte-ignore a11y_missing_attribute -->
            <!-- eslint-disable-next-line svelte/valid-compile -->
            <a use:toc.actions.link={tocItem}></a>
          </li>
        {/each}
      </ul>
    {/if}
  </section>

  <section>
    <h2 id="special">Special</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque nostrum eligendi facilis tenetur blanditiis eveniet! Dolorem, accusamus sit error impedit ipsam amet aperiam nemo sint nostrum corrupti magnam, suscipit dolore nisi ea! Perspiciatis magnam deleniti officia, et non molestias, perferendis corporis commodi facere sequi reiciendis pariatur, fuga laudantium! Repellat itaque quia magnam, veritatis iste id voluptatem fugiat dignissimos sequi odio unde culpa assumenda dolore enim temporibus deserunt debitis doloremque adipisci. Veritatis tempora, voluptate amet architecto iure, eum voluptatem ab aut ullam ipsa rem fugiat repudiandae sit neque illum, hic non nisi iste. Enim, soluta temporibus quae consequuntur quia natus obcaecati tempora dolorem. Mollitia praesentium, ut soluta non omnis sequi, cum blanditiis quidem quam rerum sapiente vero veritatis, repellendus laboriosam optio tempora. Animi laborum facilis perspiciatis? Debitis qui neque rem odit placeat aliquid, cumque fugiat magnam culpa enim ea quod dolore deserunt. Aut porro libero veritatis earum dolores vitae magnam. Possimus in impedit eligendi vitae suscipit eos illo atque, voluptatum aliquid nesciunt mollitia, ab ex? Cum magnam eaque iusto aspernatur facilis, modi possimus soluta et reprehenderit aperiam illum debitis inventore quasi impedit temporibus deleniti voluptatibus repudiandae earum eveniet enim accusamus. Laudantium libero odit eaque quo tenetur voluptatibus temporibus enim, sint culpa.</p>

		<section>
			<h3 id="heading-3-1">Section Heading Level 3</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus odit corporis perspiciatis, laudantium magni reprehenderit, accusamus molestiae deserunt aperiam commodi id dolorem recusandae, obcaecati voluptate? Repellat et aut at inventore.
			</p>
		</section>
  </section>


  <section>
    <h2 id="heading-2-2" data-toc-strategy="self">Section Heading Level 2</h2>
    <p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut saepe impedit quibusdam minus repellat? Earum repellendus praesentium quis, officia, assumenda obcaecati laudantium nulla hic ratione consectetur, ipsum veniam blanditiis ad eum est alias! Ex suscipit ratione sapiente, minus sint minima placeat quaerat optio aliquid, doloribus quidem quis? Suscipit, quas, placeat minima debitis quasi molestiae nisi, corporis ab amet doloribus dolor sed quaerat nesciunt saepe omnis. Obcaecati deleniti quod nam ipsam, excepturi porro. Exercitationem amet qui aspernatur aut repellendus esse dolorem adipisci et nihil dignissimos blanditiis nemo non quibusdam, consectetur, porro pariatur, deserunt praesentium laudantium officia quidem autem ipsam dicta ex?
		</p>
		<section>
			<h3 id="heading-3-2">Section Heading Level 3</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus odit corporis perspiciatis, laudantium magni reprehenderit, accusamus molestiae deserunt aperiam commodi id dolorem recusandae, obcaecati voluptate? Repellat et aut at inventore.
			</p>
		</section>
		<section>
			<h3 id="heading-3-3">Section Heading Level 3</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus odit corporis perspiciatis, laudantium magni reprehenderit, accusamus molestiae deserunt aperiam commodi id dolorem recusandae, obcaecati voluptate? Repellat et aut at inventore.
			</p>
		</section>
		<section>
			<h3 id="heading-3-4">Section Heading Level 3</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus odit corporis perspiciatis, laudantium magni reprehenderit, accusamus molestiae deserunt aperiam commodi id dolorem recusandae, obcaecati voluptate? Repellat et aut at inventore.
			</p>
		</section>
		<section>
			<h3 id="heading-3-5">Section Heading Level 3</h3>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus odit corporis perspiciatis, laudantium magni reprehenderit, accusamus molestiae deserunt aperiam commodi id dolorem recusandae, obcaecati voluptate? Repellat et aut at inventore.
			</p>
		</section>
  </section>

  <section>
    <h2 id="heading-2-3">Section Heading Level 2</h2>
    <p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut saepe impedit quibusdam minus repellat? Earum repellendus praesentium quis, officia, assumenda obcaecati laudantium nulla hic ratione consectetur, ipsum veniam blanditiis ad eum est alias! Ex suscipit ratione sapiente, minus sint minima placeat quaerat optio aliquid, doloribus quidem quis? Suscipit, quas, placeat minima debitis quasi molestiae nisi, corporis ab amet doloribus dolor sed quaerat nesciunt saepe omnis. Obcaecati deleniti quod nam ipsam, excepturi porro. Exercitationem amet qui aspernatur aut repellendus esse dolorem adipisci et nihil dignissimos blanditiis nemo non quibusdam, consectetur, porro pariatur, deserunt praesentium laudantium officia quidem autem ipsam dicta ex?
		</p>
  </section>

  <section>
    <h2 id="heading-2-4">Section Heading Level 2</h2>
    <p>
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut saepe impedit quibusdam minus repellat? Earum repellendus praesentium quis, officia, assumenda obcaecati laudantium nulla hic ratione consectetur, ipsum veniam blanditiis ad eum est alias! Ex suscipit ratione sapiente, minus sint minima placeat quaerat optio aliquid, doloribus quidem quis? Suscipit, quas, placeat minima debitis quasi molestiae nisi, corporis ab amet doloribus dolor sed quaerat nesciunt saepe omnis. Obcaecati deleniti quod nam ipsam, excepturi porro. Exercitationem amet qui aspernatur aut repellendus esse dolorem adipisci et nihil dignissimos blanditiis nemo non quibusdam, consectetur, porro pariatur, deserunt praesentium laudantium officia quidem autem ipsam dicta ex?
		</p>
  </section>
</main>


<style>
	section {
		padding: 10rem 4rem;
	}

	a:global([aria-current]) {
		font-weight: bold;
		color: blue;
	}
</style>
