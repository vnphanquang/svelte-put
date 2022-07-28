<script lang="ts" context="module">
  import { toc } from '@svelte-put/toc';
  import type { TocEventDetails } from '@svelte-put/toc';
  import Toc from '@svelte-put/toc/Toc.svelte';
</script>

<script lang="ts">
  function onToc(e: CustomEvent<TocEventDetails>) {
    const { items } = e.detail;
  }
</script>

<main class="p-20 flex flex-col gap-y-10">
  <h1 class="text-center text-6xl">H1. Example Blog</h1>
  <p class="text-center italic">Some subtitle / summary / description</p>
  <h2>h2.1 Table of Contents</h2>
  <Toc on:toc={onToc} />
  <h2>h2.2 Lorem ipsum dolor sit, amet consectetur adipisicing elit</h2>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vel necessitatibus maxime, blanditiis
    impedit, facere quo rem autem soluta architecto voluptate ea optio nemo sit laborum culpa?
    Perspiciatis veritatis maiores earum.
  </p>
  <h3>h3. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odit, perferendis!</h3>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis culpa incidunt sit
    necessitatibus, error, dolorem est, optio tenetur veniam repudiandae ea soluta perspiciatis
    repellat quis voluptatum hic? Optio deserunt quis sapiente nisi sunt, explicabo totam, in
    consequatur quas perferendis corrupti ipsa saepe rerum voluptatibus ad reiciendis laborum cumque
    delectus voluptates nemo, atque magnam! Repellat debitis harum placeat tempore, quas ipsam
    dolore sit deleniti numquam. Officia officiis, ullam quae odit eligendi doloribus quasi esse
    dolorem voluptate eveniet quo recusandae harum mollitia. Sed fuga nihil natus nisi deserunt
    cumque, similique odit ut magnam perferendis doloribus ad magni quod ratione quisquam recusandae
    eaque enim quam, cupiditate excepturi. Molestiae cum, maiores dolor corrupti expedita aliquam!
    Dolor et fugit magnam maxime harum, numquam ipsum commodi. Placeat sunt modi vel recusandae
    minus provident optio consequatur nam fuga qui porro ea corrupti, ex voluptatem illum mollitia
    nemo. Accusantium dicta explicabo tenetur facilis nemo quis voluptates, iure necessitatibus et,
    nulla alias dolore ipsum error consequuntur optio quia assumenda aliquam id similique non unde,
    ea rerum. Quasi unde delectus accusantium? Ducimus saepe dolor voluptas odit dicta iusto, vel
    ipsum ratione facilis iste. Velit illo, nesciunt minima modi quae autem in quisquam suscipit.
    Dignissimos corrupti ad sint natus commodi quisquam?
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, numquam earum? Molestias nisi,
    recusandae tempora explicabo, distinctio error accusamus porro odit maiores mollitia dignissimos
    vel asperiores sapiente molestiae quam delectus amet qui ratione et voluptatum fugit adipisci
    sint possimus? Repellat similique asperiores odio vero. Voluptatibus alias sapiente sequi
    asperiores, libero numquam recusandae vero quibusdam assumenda commodi exercitationem fuga vel
    adipisci. Provident blanditiis dignissimos voluptatum vero odio eveniet, neque placeat libero
    deserunt dolorem quas veritatis facilis repellat vitae inventore distinctio quasi ea tenetur.
    Inventore, expedita, eum odit cupiditate earum cum reprehenderit mollitia eligendi eveniet autem
    vitae enim qui atque, nemo architecto.
  </p>
  <h3>h3 Lorem, ipsum dolor.</h3>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptates, quisquam
    perferendis dolorum debitis fuga suscipit dicta nisi fugit tempore officia aspernatur ut, eius a
    magnam architecto dolor laborum possimus aliquid culpa! Dolorum, possimus?
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, laboriosam molestiae
    voluptatibus porro temporibus repellendus cumque mollitia modi aliquid ab nulla? Eum, soluta
    perspiciatis? Tempora ipsa maxime molestiae minima temporibus deleniti animi? Nesciunt corrupti
    dolor dolorum consequatur consectetur amet alias in incidunt doloremque, tenetur, possimus
    reprehenderit itaque officiis eius molestias ut fuga, accusamus voluptate unde distinctio.
    Architecto, repudiandae. Deserunt aperiam alias accusantium, doloremque repellendus ratione hic
    expedita assumenda. Incidunt in laudantium quaerat dignissimos, perferendis accusantium est qui,
    libero consectetur necessitatibus asperiores provident! Sequi consequatur doloribus repellat
    natus tempora repudiandae eius asperiores blanditiis veniam! Cupiditate, architecto aperiam? Et
    ipsa quam autem.
  </p>
  <h4>
    h4. Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus amet soluta voluptatem
    quo eum, culpa vitae facilis modi ratione a.
  </h4>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ipsum deleniti corrupti. Ipsam,
    quas cum eligendi iure soluta modi tempora eius, vero vel sit quos distinctio dicta excepturi
    reprehenderit. Cumque dolorum modi nobis animi voluptas obcaecati consequuntur quo placeat
    nihil, temporibus ex provident, quibusdam quidem asperiores ut qui maiores eius commodi! Non
    velit impedit nihil eaque ad magni explicabo tempore fugit veniam qui vel optio architecto omnis
    doloribus asperiores odit iure at sunt, nulla voluptas expedita maiores dolorem enim. Libero
    atque tenetur vitae autem assumenda nisi enim rerum odit quo suscipit id incidunt sunt adipisci
    non, quibusdam quam inventore qui unde fuga, aliquid soluta nostrum natus nihil? Eaque porro
    dolorem eos libero dolorum doloribus officia eius magnam deserunt. Mollitia voluptatum, sapiente
    pariatur rerum dolorem nemo culpa cupiditate corporis ad? Eveniet non quasi fugiat iste
    consequuntur, ea, exercitationem repellendus alias itaque error eos vero molestiae, inventore
    earum? Sunt rem praesentium tenetur incidunt qui, atque ut pariatur debitis temporibus veritatis
    quisquam odit iure blanditiis, laborum sequi? Dignissimos exercitationem necessitatibus nostrum
    id veritatis dolore non suscipit quidem officiis facilis enim, fugiat nemo saepe assumenda?
    Excepturi, illo eius dolorum asperiores explicabo, labore nam, eligendi commodi suscipit numquam
    aliquam optio provident iusto. Cumque ipsa aliquid explicabo sapiente quod perspiciatis
    doloribus, consequatur veritatis corporis ratione, quaerat eaque ducimus temporibus? Nisi rerum
    quasi earum repudiandae illo vel quo quaerat beatae dolorem deleniti ipsum, amet tenetur
    temporibus voluptatibus ducimus cumque vitae? Dicta id minus iste impedit in harum vel
    voluptatem labore? Optio esse quisquam, eaque quis illum nobis fugit labore praesentium quaerat
    sit ducimus maxime ex repellendus voluptatibus, maiores inventore numquam. Expedita ducimus
    doloremque placeat eveniet dolore quos corporis autem quidem excepturi optio omnis architecto
    nihil ipsam laborum a dolorem maxime vel inventore laudantium assumenda ad, rerum esse! Cumque
    necessitatibus accusantium blanditiis eos suscipit eligendi eveniet voluptas et!
  </p>
  <h2>
    h2.3 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Facilis natus eum totam quo sed?
  </h2>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, eveniet?</p>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus itaque velit nemo
    nihil, totam praesentium architecto minima aperiam eligendi tenetur est atque asperiores nobis.
    Ullam est modi iusto libero, placeat quod amet quis, minus dicta voluptate expedita sit
    exercitationem fugit fuga unde. Et reiciendis iure, asperiores tenetur accusamus repellendus
    illum minus hic impedit ratione, accusantium quisquam tempora porro labore doloremque quae aut
    suscipit nisi est. Ut delectus temporibus deserunt quos sequi numquam vel itaque laborum facere,
    ullam doloribus ea, omnis soluta repellat veniam accusantium odio et magnam illum sed. Beatae
    explicabo repellat maxime nulla atque officiis odit deserunt fugiat iusto repudiandae
    aspernatur, eos, blanditiis at distinctio consequatur sed dolore ea. Enim adipisci qui, quos
    optio dolorum, voluptatibus iusto non soluta, neque sint ducimus! Placeat similique laudantium
    fuga magni mollitia porro minus. Amet eos dolorum deserunt atque ea obcaecati? Incidunt deleniti
    qui reprehenderit minima enim repellat magni modi in eius quas nisi deserunt pariatur, quod
    repudiandae delectus, temporibus reiciendis, animi inventore facere? Minima error, aut dolorum
    quisquam repellendus aliquid quas ad tempore id reiciendis nostrum necessitatibus illum fugit
    enim quae consequuntur maxime ipsum sint! Quos eius neque quisquam aliquid accusantium voluptas
    aspernatur reprehenderit blanditiis asperiores enim, consequatur laboriosam. Iste, maxime harum.
  </p>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, dolorum unde! Debitis ut,
    eveniet nesciunt id, omnis necessitatibus consequatur incidunt, ratione rem totam eligendi
    placeat sapiente at. In aperiam architecto repellat et numquam nesciunt soluta excepturi rerum
    aliquid molestias ipsum minima quidem unde suscipit nostrum ut dicta, necessitatibus eius vero
    voluptate quasi laboriosam? Possimus, perferendis.
  </p>
  <h2>h2.4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, explicabo.</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus sed aut molestias cum qui quasi
    error quos voluptas autem. Veniam quaerat ducimus necessitatibus deserunt, eum fugiat temporibus
    exercitationem quod porro odio earum nesciunt maiores amet debitis dolorem officiis in? Magni
    deserunt placeat, laboriosam est sapiente ex velit adipisci et similique eum atque cumque!
    Officia et neque doloremque nisi dicta perspiciatis sed sunt nostrum officiis molestias
    similique, quae numquam facilis nesciunt, error, tempore velit. Atque quos quo eaque nulla
    pariatur illum incidunt, exercitationem officiis expedita ex, molestiae rem! Blanditiis, ea!
    Molestias fuga molestiae ratione non tempora enim quisquam iure ad vitae?
  </p>
</main>

<style lang="postcss">
  h2 {
    @apply text-2xl;
  }
  h3 {
    @apply text-xl;
  }
  h4 {
    @apply text-lg;
  }
  h1,
  h2,
  h3,
  h4 {
    @apply font-bold;
  }

  :global(.toc-li:hover) {
    @apply text-primary underline;
  }
</style>
