<script>
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { Icon, Trash } from 'svelte-hero-icons';
	import { Input, TextArea } from '$lib/components';
	import { getImageURL } from '$lib/utils';
	export let data;
	export let form;

	let lev = [1,2,3,4]

	let loading = false;

	const submitUpdateReport = () => {
		loading = true;
		return async ({ result, update }) => {
			switch (result.type) {
				case 'success':
					await invalidateAll();
					break;
				case 'error':
					break;
				default:
					await update();
			}

			loading = false;
		};
	};
</script>

<div class="flex flex-col w-full h-full p-2">

	<div class="w-full">
		<form
			method="POST"
			action="?/updateReport"
			class="flex flex-col space-y-2 w-full items-center"
			enctype="multipart/form-data"
			use:enhance={submitUpdateReport}
		>
			<h3 class="text-3xl font-bold">Case {data.report.report.caseId}</h3>

{#if data.report.report?.beforeImg}
<figure><img
				src={data.report.report?.beforeImg
					? getImageURL(data.report.report.collectionId, data.report.report.id, data.report.report.beforeImg)
					: ""}
				alt="project thumbnail"
				class="w-full max-w-lg mb-2"
			/></figure>

{/if}



			<TextArea
				id="suggestion"
				label="suggestion"
				value={form?.data?.sugguestion ?? data.report.report.suggestion}
				errors={form?.errors?.suggestion}
			/>
					<Input
				id="area"
				label="Area"
				value={form?.data?.area ?? data.report.report.area }
				errors={form?.errors?.area}
			/>
<div class="form-control w-full max-w-lg mb-2">
<label class="label font-medium pb-1">
		<span class="label-text">Owner</span>
	</label>
 <select name="owner" class="select select-bordered" value={form?.data?.owner ?? data.report.report.owner}>
 {#each data.listUsers as user}
<option value={user.id}>{user.username}</option>
  {/each}
 </select>

</div>


 <div class="form-control w-full max-w-lg mb-2">
<label class="label font-medium pb-1">
		<span class="label-text">Level</span>
	</label>

 <select name="level" class="select select-bordered" value={data.report.report.level}>


	{#each lev  as lv}
<option value={lv}>Level {lv}</option>

	{/each}

 </select>




			<div class="form-control w-full max-w-lg">
				<label for="thumbnail" class="label font-medium pb-1">
					<span class="label-text">Thumbnail</span>
				</label>
				{#if data.report.beforeImg}
					<label for="thumbnail" class="avatar w-20 hover:cursor-pointer">
						<label for="thumbnail" class="absolute -top-1.5 -right-1.5 hover:cursor-pointer">
							<button formaction="?/deleteThumbnail" class="btn btn-error btn-sm btn-circle">
								<Icon src={Trash} class="w-5 h-5 text-white" />
							</button>
						</label>
						<div class="w-20 rounded">
							<img
								src={getImageURL(
									data.report.collectionId,
									data.report.id,
									data.report.thumbnail,
									'80x80'
								)}
								alt="report thumbnail"
							/>
						</div>
					</label>
				{/if}
				<input
					type="file"
					name="beforeImg"
					id="beforeImg"
					class="file-input file-input-bordered w-full max-w-lg mt-2"
				/>
				{#if form?.errors?.beforeImg}
					{#each form?.errors?.beforeImg as error}
						<label for="thumbnail" class="label py-0 pt-1">
							<span class="label-text-alt text-error">
								{error}
							</span>
						</label>
					{/each}
				{/if}
			</div>
			<div class="w-full max-w-lg pt-3">
				<button type="submit" class="btn btn-primary w-full max-w-lg">Save Changes</button>
			</div>
		</form>
	</div>
</div>
