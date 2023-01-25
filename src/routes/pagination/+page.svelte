<script>
    import { goto } from '$app/navigation';
       import { Mycard } from '$lib/components';
       export let data;

      let search = ""
      let timer;

      const handleSearch = () => {

        clearTimeout(timer);
		timer = setTimeout(async () => {
            await goto(`pagination?page=1&search=${search}`, {
           keepFocus: true
         })

		}, 1000);


      }

       const handleClick = async (page) => {

           await goto(`pagination?page=${page}&search=${search}`, {
           keepFocus: true
         })
       };

   </script>


       <h1 class="text-xl font-bold">Paginated Projects</h1>

       <input type="text" on:input={handleSearch}    bind:value={search} placeholder="search" class="input input-bordered w-full max-w-xs" />


       <div class="md:grid md:grid-cols-3 gap-2">
       {#each data.myprojects.items as project}

        <Mycard project={project} />


      {/each}
    </div>

 {#if data.myprojects.totalPages > 1 }
 <div class="btn-group">
  <button class="btn" disabled={data.myprojects.page == 1 ? "disabled":""} on:click|preventDefault={() =>handleClick(data.myprojects.page - 1)}>«</button>
  {#each { length: data.myprojects.totalPages} as _, p}

  <button class={data.myprojects.page == p + 1 ? "btn btn-active": "btn"}
  on:click|preventDefault={() =>handleClick(p + 1)}
  >{p + 1}</button
>

  {/each}
<button class="btn" disabled={data.myprojects.page == data.myprojects.totalPages ? "disabled":""} on:click|preventDefault={() =>handleClick(data.myprojects.page + 1)}>»</button>

</div>

 {/if}


