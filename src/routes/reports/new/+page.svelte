<script>
	import { enhance } from '$app/forms';
	import { Input, TextArea } from '$lib/components';
	export let form;
	export let data;

</script>

<div class="flex flex-col w-full h-full p-2">
<ul class="steps mb-8">
  <li class="step step-primary">Submit</li>
  <li class="step">Safty Review and Assign Task</li>
  <li class="step">Task Owner Feedback</li>
  <li class="step">Safty Review and Close</li>
</ul>

	<div class="w-full">


		<form
			action="?/create"
			method="POST"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance
		>
			<h3 class="text-3xl font-bold">Tell us more about what you find</h3>
			<p class="mt-2 text-lg">แจ้งร้องเรียน เสนอแนะความไม่ปลอดภัย</p>

			<div class="form-control w-full max-w-lg mb-2">
  <label class="label">
    <span class="label-text">Your suggestion</span>

  </label>
  <textarea name="suggestion" value={form?.data?.suggestion??''} class="textarea textarea-bordered h-24" />
	{#if form?.errors?.suggestion}
		{#each form?.errors?.suggestion as error}
			<label class="label py-0 pt-1">
				<span class="label-text-alt text-error">
					{error}
				</span>
			</label>
		{/each}
	{/if}

</div>


			<!-- <Input id="suggestion" label="Suggestion" value={form?.data?.suggestion} /> -->
			<Input
				id="area"
				label="Area"
				value={form?.data?.area}
				errors={form?.errors?.area}
			/>


<div class="form-control w-full max-w-lg mb-2">
<label class="label font-medium pb-1">
		<span class="label-text">Owner</span>
	</label>
 <select name="owner" class="select select-bordered">
 {#each data.listUsers as user}
<option value={user.id}>{user.username}</option>
  {/each}
 </select>

</div>


<div class="form-control w-full max-w-lg mb-2">
<label class="label font-medium pb-1">
		<span class="label-text">Level</span>
	</label>

 	<select name="level" type=number class="select select-bordered">
		<option value=1>Level 1</option>
		<option value=2>Level 2</option>
		<option value=3>Level 3</option>
		<option value=4>Level 4</option>
	</select>
</div>










			<Input id="beforeImg" label="Picture" type="file" errors={form?.errors?.beforeImg} />
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Create Report</button>
			</div>



		</form>
	</div>
</div>
