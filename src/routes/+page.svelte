<script>
import { goto } from '$app/navigation';
	import { getImageURL } from '$lib/utils';
    export let data;

      let search = ""
      let timer;

      const handleSearch = () => {

        clearTimeout(timer);
		timer = setTimeout(async () => {
            await goto(`?page=1&search=${search}`, {
           keepFocus: true
         })

		}, 1000);
	  }

</script>

<div class="flex justify-between align-middle">

	<h3 class="md:text-2xl">Dashboard</h3>
	<div class="tooltip" data-tip="New case">
<button class="btn btn-circle">
<a href="/reports/new" >
 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-8 h-8">
  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
</svg>
</a>


</button>
	</div>


</div>


<div class="grid grid-cols-2 ">

	<div class="stat place-items-center">
		<div class="stat-title">Close Cases</div>
		<div class="stat-value text-accent">25.6K</div>

	  </div>
	  <div class="stat place-items-center">
		<div class="stat-title">Pending Cases</div>
		<div class="stat-value text-secondary">2.6M</div>

	  </div>




</div>
<div class="overflow-x-auto w-full">
	<div class="stats mb-3">

	  </div>

	   <input type="text" on:input={handleSearch}    bind:value={search} placeholder="type to search" class="input input-ghost w-full max-w-xs my-3" />
	<table class="table w-full">
	  <!-- head -->
	  <thead>
		<tr>

		  <th>id</th>
		  <th>Sugguestion</th>

		  <th>Status</th>
		  <th>Level</th>
		    <th>Owner</th>
		   <th>Requestor</th>
		</tr>
	  </thead>
	  <tbody>
	   {#each data.reports.items as report}
	<tr>

		  <td>
			<div class="flex items-center">

			  <div>
				<div class="font-bold">{report.caseId}</div>
			  </div>
			</div>
		  </td>
		  <td>
		  <a href={`/reports/${report.id}/edit`}>{report.suggestion} </a>

			<br/>
			<span class="badge badge-ghost badge-sm">{report.area}</span>
		  </td>
		  <td><div class="badge badge-accent">{report.status}</div></td>
		  <th>
			<div class="badge badge-warning gap-2">{report.level}</div>
		  </th>
		    <td>
			<div>{report.expand.owner.username}</div>
			<span class="badge badge-ghost badge-sm">{report.expand.owner.role}</span>
		  </td>
		    <td>
				<div>{report.expand.requestor.username}</div>
				<span class="badge badge-ghost badge-sm">{report.expand.requestor.role}</span>
		  </td>
		</tr>


		{/each}

	  </tbody>
	  <!-- foot -->
	  <tfoot>
		<tr>

		  <th>id</th>
		  <th>Sugguestion</th>

		  <th>Status</th>
		  <th>Level</th>
		     <th>Owner</th>
		   <th>Requestor</th>
		</tr>
	  </tfoot>

	</table>
  </div>