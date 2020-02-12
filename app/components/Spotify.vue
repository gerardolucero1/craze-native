<style type="text/css">
	.fade{
		width: 100%;
		height: 380;
		background: linear-gradient(to top, black, transparent);
	}

	.black-bar{
		width: 100%;
		height: 80;
		background-color: black;
	}

	.btn-play{
		width: 200;
		height: 50;
		border-radius: 25;
		background-color: green;
		color: white;
		font-weight: bold;
	}
</style>

<template>
	<Page actionBarHidden="true" @loaded="navigatingTo($event)" backgroundColor="black" color="white">
		<GridLayout rows="80, 300, *">
			<Image id="img" row="1" margin="-200 0 0 0" src="https://vignette.wikia.nocookie.net/drama/images/0/08/20277700.jpg/revision/latest?cb=20190919092540&path-prefix=es" />

			<ScrollView row="2" marginTop="-380" @scroll="onScroll($event)">
				<GridLayout rows="380, *">
					<Label row="0" class="fade" marginTop="-50" />

					<Label row="0" text="Saturday" fontSize="35" fontWeight="bold" marginTop="150" horizontalAlignment="center" color="white" />

					<Label row="0" text="9,875,760 MONTHLY LISTENERS" marginTop="220" fontSize="13" color="white" horizontalAlignment="center" />
					<Label row="1" :text="content" textWrap="true" fontSize="18" margin="20 20 20 30" />
				</GridLayout>
			</ScrollView>

			<Label row="0" id="blackBar" class="black-bar" marginTop="550" />

			<Button row="0" id="btnPlay" text="ALEATORIO" class="btn-play" marginTop="630" />

			<Label row="0" id="abTitle" text="WIFI" marginTop="68" />
		</GridLayout>
	</Page>
</template>

<script>
export default{
	data(){
		return{
			content: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.
					
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.

				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur harum aliquid officiis laboriosam ipsam eligendi, nulla sunt corporis mollitia sit adipisci totam. Ducimus voluptate nobis quis laboriosam voluptates, possimus voluptatibus.
				`
		}
	},

	methods: {
		navigatingTo(args){
			const page = args.object.page
			const blackBar = page.getViewById('blackBar')
			blackBar.opacity = 0
		},

		onScroll(args){
			const sv = args.object
			const page = sv.page

			const image = page.getViewById('img')
			const btnPlay = page.getViewById('btnPlay')
			const blackBar = page.getViewById('blackBar')

			console.log(args.scrollY)

			if(args.scrollY < 0){
				const scrollAmt = Math.abs(args.scrollY)
				const scale = (scrollAmt + 300) / 300

				image.scaleX = scale
				image.scaleY = scale
				image.translateY = scrollAmt / 2

				btnPlay.translateY = scrollAmt
				blackBar.translateX = scrollAmt
			}else{
				image.translateY = -1 * args.scrollY

				if(args.scrollY < 300){
					btnPlay.translateY = args.scrollY * -1
					blackBar.translateY = args.scrollY * -1

					if(args.scrollY > 100){
						const opacity = this.scaleFormula(args.scrollY, 200, 380, 0, 1)
						blackBar.opacity = opacity
					}
				}else{
					btnPlay.translateY = -300;
					blackBar.translateY = -300;
					blackBar.opacity = 1
				}
			}
		},

		scaleFormula(current, totalMin, totalMax, scaledMin, scaledMax){
			return (scaledMax - scaledMin) * (current - totalMin) / (totalMax -totalMin) + scaledMin
		}
	}
}
</script>





















